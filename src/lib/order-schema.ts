import { z } from "zod";

export const FARM_INBOX = "1volsfan89@gmail.com";

export const PAY_METHODS = [
  { id: "zelle", label: "Zelle" },
  { id: "cashapp", label: "Cash App" },
  { id: "venmo", label: "Venmo" },
] as const;

export type PayMethod = (typeof PAY_METHODS)[number]["id"];

export function payMethodLabel(id: string) {
  return PAY_METHODS.find((m) => m.id === id)?.label ?? "Zelle";
}

export const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
] as const;

const stateCodes = US_STATES.map((s) => s.code) as [string, ...string[]];

export const addressInputSchema = z.object({
  street: z
    .string()
    .trim()
    .min(5, "Need a full street — number and name.")
    .max(120)
    .refine((v) => /\d/.test(v), "Street needs a house number."),
  apt: z.string().trim().max(40).optional().or(z.literal("")),
  city: z.string().trim().min(2, "City is required.").max(60),
  state: z.enum(stateCodes, { error: "Pick a U.S. state." }),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, "ZIP has to be 5 digits."),
});

export const orderInputSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(80),
  email: z.string().trim().toLowerCase().check(z.email()),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || v.replace(/\D/g, "").length >= 10,
      "Phone needs 10 digits if you add one.",
    ),
  fulfillment: z.enum(["ship", "pickup"]),
  payBy: z.enum(["zelle", "cashapp", "venmo"]).default("zelle"),
  notes: z.string().trim().max(400).optional().or(z.literal("")),
  website: z.string().max(80).optional().or(z.literal("")),
  lines: z
    .array(
      z.object({
        slug: z.string().min(1),
        qty: z.number().int().min(1).max(40),
      }),
    )
    .min(1)
    .max(20),
  street: addressInputSchema.shape.street.optional().or(z.literal("")),
  apt: addressInputSchema.shape.apt,
  city: addressInputSchema.shape.city.optional().or(z.literal("")),
  state: z.string().trim().optional().or(z.literal("")),
  zip: z.string().trim().optional().or(z.literal("")),
});

export type AddressInput = z.infer<typeof addressInputSchema>;
export type OrderInput = z.infer<typeof orderInputSchema>;

export type MatchedAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
  formatted: string;
};

export type OrderLine = {
  slug: string;
  name: string;
  weight: string;
  qty: number;
  unit: number;
  lineTotal: number;
};

export type BuiltOrder = {
  id: string;
  name: string;
  email: string;
  phone: string;
  fulfillment: "ship" | "pickup";
  payBy: PayMethod;
  notes: string;
  address: MatchedAddress;
  lines: OrderLine[];
  total: number;
  createdAt: string;
};
