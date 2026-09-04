export type CostLine = {
  label: string;
  perAcre: number;
  note: string;
};

/** Modeled annual cash cost for a small irrigated Georgia pecan orchard.
 *  Numbers are working estimates from University Extension ranges
 *  (UGA / Southeast), typical Bulloch County land charges, and
 *  a family packing kitchen — not a CPA audit of private books.
 */
export const orchardLines: CostLine[] = [
  {
    label: "Land (cash-rent equivalent)",
    perAcre: 250,
    note: "What that acre could earn in rent. We own it, but the land still has a cost.",
  },
  {
    label: "Property tax (ag-use)",
    perAcre: 28,
    note: "Georgia agricultural valuation keeps this low. It is not zero.",
  },
  {
    label: "Liability & crop insurance",
    perAcre: 65,
    note: "A storm year like Helene is why this line exists.",
  },
  {
    label: "Irrigation power & well upkeep",
    perAcre: 140,
    note: "Groundwater, not city water. Electricity to the pump, plus repairs.",
  },
  {
    label: "Fertilizer, lime & zinc",
    perAcre: 185,
    note: "Pecans are hungry. UGA programs call for split nitrogen and foliar zinc.",
  },
  {
    label: "Fungicide (pecan scab)",
    perAcre: 320,
    note: "Humid Georgia. Skip sprays and you skip a crop.",
  },
  {
    label: "Insect & mite control",
    perAcre: 140,
    note: "Hickory shuckworm, aphids, and the rest of the porch committee.",
  },
  {
    label: "Mowing, weeds, herbicide strip",
    perAcre: 95,
    note: "Keep the orchard walkable and the harvest equipment honest.",
  },
  {
    label: "Fuel, pruning, small equipment",
    perAcre: 110,
    note: "Tractors drink. Saws break. Trees do not prune themselves.",
  },
  {
    label: "Harvest labor & custom shake",
    perAcre: 280,
    note: "Shake, sweep, clean. The week the year is won or lost.",
  },
  {
    label: "Equipment wear (depreciation)",
    perAcre: 220,
    note: "Shakers and harvesters are not cheap, and they do not last forever.",
  },
  {
    label: "Grower assessment",
    perAcre: 10,
    note: "Georgia Pecan Commission: about a penny a pound.",
  },
];

export const orchardTotalPerAcre = orchardLines.reduce((s, l) => s + l.perAcre, 0);
export const yieldInShellLbs = 1050;
export const shellout = 0.46;
export const inShellCostPerLb = orchardTotalPerAcre / yieldInShellLbs;
export const shelledLbsPerAcre = yieldInShellLbs * shellout;
export const orchardCostPerShelledLb = orchardTotalPerAcre / shelledLbsPerAcre;

export type PostHarvest = {
  label: string;
  raw: number;
  flavored: number;
  honey1: number;
};

export const postHarvest: PostHarvest[] = [
  { label: "Orchard / hive cost inside the bag", raw: 3.82, flavored: 1.91, honey1: 3.1 },
  { label: "Crack, shell, sort, inspect", raw: 1.25, flavored: 0.62, honey1: 0 },
  { label: "Kitchen (roast, candy, chocolate)", raw: 0, flavored: 1.4, honey1: 0 },
  { label: "Extract, strain, jar (honey)", raw: 0, flavored: 0, honey1: 1.35 },
  { label: "Cold storage", raw: 0.18, flavored: 0.09, honey1: 0.12 },
  { label: "Bag, label, case", raw: 0.55, flavored: 0.48, honey1: 0.72 },
  { label: "Card fees & merchant (retail only)", raw: 0.4, flavored: 0.32, honey1: 0.4 },
  { label: "Veteran pack-out wage", raw: 1.85, flavored: 0.73, honey1: 1.71 },
];

export function sumPost(key: keyof Omit<PostHarvest, "label">) {
  return postHarvest.reduce((s, l) => s + l[key], 0);
}

export const honestLiving = {
  targetHousehold: 52000,
  acresInProduction: 40,
  bagsNeededAtRetail: 3467,
  note: "A $52,000 household draw is a sergeant's idea of enough — mortgage, groceries, kids, a truck that starts. It is not a million-dollar exit. At $15 a pound on raw halves, after true cost, that living takes thousands of honest bags, not a lucky year.",
};

export const priceWalkRaw1lb = [
  { label: "True cost to put 1 lb of halves in a bag", amount: 8.05 },
  { label: "Farm wholesale (stores & partners)", amount: 10 },
  { label: "Direct-to-you retail on this site", amount: 15 },
  { label: "Typical grocery 'fancy pecan' after it has traveled", amount: 18 },
];
