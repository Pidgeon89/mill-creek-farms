export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  category: "pecans" | "honey" | "gifts";
  weight: string;
  image: string;
  retail: number;
  wholesale: number;
  farmCost: number;
  featured?: boolean;
  ingredients: string;
  origin: string;
};

export const products: Product[] = [
  {
    slug: "raw-pecans-1lb",
    name: "Raw Georgia Pecan Halves",
    short: "Fresh-shelled, nothing added.",
    description:
      "Stuart, Cape Fear, Creek, and Gloria Grande halves, cracked and sorted on the farm in Statesboro. No oil. No salt. Just the nut. These are the pecans grocery stores wish they could put in a bag — heavier, sweeter, and still tasting like the orchard.",
    category: "pecans",
    weight: "1 lb",
    image: "/images/raw-pecans.jpg",
    retail: 15,
    wholesale: 10,
    farmCost: 8.05,
    featured: true,
    ingredients: "Raw pecan halves.",
    origin: "Mill Creek Farms, Statesboro, Georgia",
  },
  {
    slug: "raw-pecans-8oz",
    name: "Raw Georgia Pecan Halves",
    short: "The everyday bag.",
    description:
      "Same farm-shelled halves as the pound, in an 8-ounce bag that fits a week of salads, oatmeal, and late-night handfuls. A fair first bag if you have not tasted Georgia pecans this close to the tree.",
    category: "pecans",
    weight: "8 oz",
    image: "/images/inshell.jpg",
    retail: 8,
    wholesale: 5,
    farmCost: 4.15,
    ingredients: "Raw pecan halves.",
    origin: "Mill Creek Farms, Statesboro, Georgia",
  },
  {
    slug: "roasted-salted-pecans",
    name: "Roasted & Salted Pecans",
    short: "Skillet-roasted. Light salt.",
    description:
      "Our halves, roasted in small batches and finished with sea salt. The nut stays the star. Made in the farm kitchen under Georgia cottage-food rules — the same table that packs the raw bags.",
    category: "pecans",
    weight: "8 oz",
    image: "/images/roasted.jpg",
    retail: 12,
    wholesale: 7,
    farmCost: 5.55,
    featured: true,
    ingredients: "Pecan halves, sea salt.",
    origin: "Roasted on the farm, Statesboro, Georgia",
  },
  {
    slug: "candied-pecans",
    name: "Candied Cinnamon Pecans",
    short: "Cinnamon sugar, still crunchy.",
    description:
      "A light cinnamon-sugar coat that crackles, not a candy shell that hides the pecan. Holiday bags, porch sitting, and the bowl that never lasts through a ballgame.",
    category: "pecans",
    weight: "8 oz",
    image: "/images/candied.jpg",
    retail: 12,
    wholesale: 7,
    farmCost: 5.7,
    featured: true,
    ingredients: "Pecan halves, cane sugar, cinnamon, a pinch of salt.",
    origin: "Kitchen on the farm, Statesboro, Georgia",
  },
  {
    slug: "white-chocolate-pecans",
    name: "White Chocolate Pecans",
    short: "Salty, sweet, and crunchy.",
    description:
      "Farm halves dipped in white chocolate. The house favorite at farmers markets and the bag people order again before they finish the first. Sweet enough for a gift. Honest enough for Tuesday.",
    category: "pecans",
    weight: "8 oz",
    image: "/images/white-chocolate.jpg",
    retail: 12,
    wholesale: 7,
    farmCost: 6.05,
    featured: true,
    ingredients: "Pecan halves, white chocolate (sugar, cocoa butter, milk).",
    origin: "Kitchen on the farm, Statesboro, Georgia",
  },
  {
    slug: "sweet-spicy-pecans",
    name: "Sweet & Spicy Pecans",
    short: "Heat after the honey.",
    description:
      "Brown sugar glaze with a cayenne finish. Not a dare. Just enough warmth to make a beer and a ballgame better. Packed the same week we roast.",
    category: "pecans",
    weight: "8 oz",
    image: "/images/sweet-spicy.jpg",
    retail: 12,
    wholesale: 7,
    farmCost: 5.75,
    ingredients: "Pecan halves, brown sugar, cayenne, smoked paprika, salt.",
    origin: "Kitchen on the farm, Statesboro, Georgia",
  },
  {
    slug: "wildflower-honey-1lb",
    name: "Raw Wildflower Honey",
    short: "Unfiltered. Georgia bloom.",
    description:
      "Raw wildflower honey from hives that work the same Coastal Empire bloom as the orchard — gallberry, clover, and whatever the bees find between Mill Creek and the pines. Never heated past the comb. Crystallizes because it is real.",
    category: "honey",
    weight: "1 lb",
    image: "/images/honey.jpg",
    retail: 15,
    wholesale: 9,
    farmCost: 7.4,
    featured: true,
    ingredients: "Raw wildflower honey.",
    origin: "Hives on and around Mill Creek Farms, Statesboro, Georgia",
  },
  {
    slug: "wildflower-honey-3lb",
    name: "Raw Wildflower Honey",
    short: "The family jar.",
    description:
      "Three pounds of the same raw wildflower honey. The jar that lives on the counter. Better value per pound, same bees, same bloom.",
    category: "honey",
    weight: "3 lb",
    image: "/images/honey.jpg",
    retail: 35,
    wholesale: 21,
    farmCost: 20.1,
    ingredients: "Raw wildflower honey.",
    origin: "Hives on and around Mill Creek Farms, Statesboro, Georgia",
  },
  {
    slug: "lemon-honey",
    name: "Lemon Honey",
    short: "Wildflower, finished with lemon.",
    description:
      "The same raw wildflower honey, steeped with real lemon. Bright enough for tea and a biscuit. Two dollars more than the plain jar — the lemon is the only extra.",
    category: "honey",
    weight: "1 lb",
    image: "/images/lemon-honey.jpg",
    retail: 17,
    wholesale: 11,
    farmCost: 8.5,
    featured: true,
    ingredients: "Raw wildflower honey, lemon.",
    origin: "Kitchen on the farm, Statesboro, Georgia",
  },
  {
    slug: "lavender-honey",
    name: "Lavender Honey",
    short: "Floral. Quiet. For toast and tea.",
    description:
      "Raw wildflower honey finished with lavender. Soft, not soapy. A Sunday jar. Two dollars more than the plain pound.",
    category: "honey",
    weight: "1 lb",
    image: "/images/lavender-honey.jpg",
    retail: 17,
    wholesale: 11,
    farmCost: 8.5,
    ingredients: "Raw wildflower honey, lavender.",
    origin: "Kitchen on the farm, Statesboro, Georgia",
  },
  {
    slug: "jalapeno-honey",
    name: "Jalapeño Honey",
    short: "Heat after the bloom.",
    description:
      "Raw wildflower honey with sliced jalapeño. Sweet first, then a little fire. For fried chicken, cornbread, and a cheese board. Two dollars more than the plain jar.",
    category: "honey",
    weight: "1 lb",
    image: "/images/jalapeno-honey.jpg",
    retail: 17,
    wholesale: 11,
    farmCost: 8.55,
    ingredients: "Raw wildflower honey, jalapeño.",
    origin: "Kitchen on the farm, Statesboro, Georgia",
  },
  {
    slug: "ginger-honey",
    name: "Ginger Honey",
    short: "Warm. Good in a mug.",
    description:
      "Raw wildflower honey steeped with ginger. The jar you reach for when the weather turns. Two dollars more than the plain pound.",
    category: "honey",
    weight: "1 lb",
    image: "/images/ginger-honey.jpg",
    retail: 17,
    wholesale: 11,
    farmCost: 8.5,
    ingredients: "Raw wildflower honey, ginger.",
    origin: "Kitchen on the farm, Statesboro, Georgia",
  },
  {
    slug: "garlic-honey",
    name: "Garlic Honey",
    short: "For the savory table.",
    description:
      "Raw wildflower honey finished with garlic. Drizzle on biscuits, roasted vegetables, or a pork chop. Two dollars more than the plain jar.",
    category: "honey",
    weight: "1 lb",
    image: "/images/garlic-honey.jpg",
    retail: 17,
    wholesale: 11,
    farmCost: 8.55,
    ingredients: "Raw wildflower honey, garlic.",
    origin: "Kitchen on the farm, Statesboro, Georgia",
  },
  {
    slug: "georgia-grove-crate",
    name: "Georgia Grove Gift Crate",
    short: "The porch gift. Packed by veterans.",
    description:
      "One pound of raw halves, an 8-ounce bag of roasted & salted, an 8-ounce bag of candied, and a 1-pound jar of wildflower honey. Tied with a card that names the farm and the veteran who packed it. This is the box we send to people we love.",
    category: "gifts",
    weight: "Gift crate",
    image: "/images/farm-porch.jpg",
    retail: 48,
    wholesale: 32,
    farmCost: 28.4,
    featured: true,
    ingredients: "See included bags and jar.",
    origin: "Packed at Mill Creek Farms, Statesboro, Georgia",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function byCategory(category: Product["category"]) {
  return products.filter((p) => p.category === category);
}
