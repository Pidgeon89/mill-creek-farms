import { addressInputSchema, type AddressInput, type MatchedAddress } from "./order-schema";

type CensusMatch = {
  matchedAddress?: string;
  addressComponents?: {
    city?: string;
    state?: string;
    zip?: string;
  };
};

function titleStreet(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function parseCensusLine(line: string, fallback: AddressInput): MatchedAddress {
  const parts = line.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 4) {
    return {
      street: titleStreet(parts[0]!),
      city: titleStreet(parts[1]!),
      state: parts[2]!.toUpperCase(),
      zip: parts[3]!.replace(/\D/g, "").slice(0, 5),
      formatted: "",
    };
  }
  return {
    street: titleStreet(fallback.street),
    city: titleStreet(fallback.city),
    state: fallback.state.toUpperCase(),
    zip: fallback.zip.slice(0, 5),
    formatted: "",
  };
}

async function zipMatchesCityState(zip: string, city: string, state: string) {
  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return false;
    const json = (await res.json()) as {
      places?: { "place name": string; "state abbreviation": string }[];
    };
    const needle = city.trim().toLowerCase();
    return (json.places ?? []).some(
      (p) =>
        p["state abbreviation"]?.toUpperCase() === state.toUpperCase() &&
        p["place name"]?.toLowerCase() === needle,
    );
  } catch {
    return false;
  }
}

export async function verifyUsAddress(input: AddressInput): Promise<
  { ok: true; matched: MatchedAddress } | { ok: false; error: string }
> {
  const parsed = addressInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Address is incomplete." };
  }
  const a = parsed.data;

  const census = new URL("https://geocoding.geo.census.gov/geocoder/locations/address");
  census.searchParams.set("street", a.street);
  census.searchParams.set("city", a.city);
  census.searchParams.set("state", a.state);
  census.searchParams.set("zip", a.zip.slice(0, 5));
  census.searchParams.set("benchmark", "Public_AR_Current");
  census.searchParams.set("format", "json");

  try {
    const res = await fetch(census, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const json = (await res.json()) as { result?: { addressMatches?: CensusMatch[] } };
      const hit = json.result?.addressMatches?.[0];
      if (hit?.matchedAddress || hit?.addressComponents) {
        const parsedMatch = parseCensusLine(hit.matchedAddress ?? "", a);
        const c = hit.addressComponents;
        const matched: MatchedAddress = {
          street: parsedMatch.street,
          city: parsedMatch.city || titleStreet(c?.city || a.city),
          state: parsedMatch.state || (c?.state || a.state).toUpperCase(),
          zip: parsedMatch.zip || c?.zip || a.zip.slice(0, 5),
          formatted: "",
        };
        matched.formatted = `${matched.street}, ${matched.city}, ${matched.state} ${matched.zip}`;
        return { ok: true, matched };
      }
    }
  } catch {
    // Fall through.
  }

  const zipOk = await zipMatchesCityState(a.zip.slice(0, 5), a.city, a.state);
  if (!zipOk) {
    return {
      ok: false,
      error: "We could not find that street. Check the house number, city, state, and ZIP.",
    };
  }
  return {
    ok: false,
    error: "That ZIP is real, but we could not match the street. Check the number and spelling.",
  };
}

export const PICKUP_ADDRESS: MatchedAddress = {
  street: "1892 Mill Creek Rd",
  city: "Statesboro",
  state: "GA",
  zip: "30461",
  formatted: "Farm pickup · 1892 Mill Creek Rd, Statesboro, GA 30461",
};

export function newOrderId() {
  const n = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MCF-${n}-${r}`;
}
