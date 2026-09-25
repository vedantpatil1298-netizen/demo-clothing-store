export type Product = {
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  category: 'bottom-wear' | 'upper-wear' | 'accessories';
  subcategory: string;
  sizes: string[];
  description: string;
  images: string[];
};

export const categories = [
  {
    slug: 'bottom-wear',
    label: 'Bottom Wear',
    subcategories: ['Cargo Pants', 'Denim', 'Trousers', 'Shorts'],
    heroImage: 'https://picsum.photos/id/1005/1600/2000',
    order: 1
  },
  {
    slug: 'upper-wear',
    label: 'Upper Wear',
    subcategories: ['T-Shirts', 'Overshirts', 'Hoodies', 'Jackets'],
    heroImage: 'https://picsum.photos/id/1011/1600/2000',
    order: 2
  },
  {
    slug: 'accessories',
    label: 'Accessories',
    subcategories: ['Bags', 'Caps', 'Belts', 'Jewelry'],
    heroImage: 'https://picsum.photos/id/1025/1600/2000',
    order: 3
  }
] as const;

function makeProduct(
  category: Product['category'],
  subcategory: string,
  index: number,
  imgSeed: number
): Product {
  const nameMap: Record<string, string[]> = {
    'Cargo Pants': ['Field Cargo', 'Utility Cargo', 'Wide Cargo'],
    Denim: ['Straight Denim', 'Washed Denim', 'Selvedge Denim'],
    Trousers: ['Tapered Trouser', 'Pleated Trouser', 'Wool Trouser'],
    Shorts: ['Deck Short', 'Cargo Short', 'Twill Short'],
    'T-Shirts': ['Heavyweight Tee', 'Boxy Tee', 'Ribbed Tee'],
    Overshirts: ['Canvas Overshirt', 'Flannel Overshirt', 'Twill Overshirt'],
    Hoodies: ['Fleece Hoodie', 'Cropped Hoodie', 'Panel Hoodie'],
    Jackets: ['Shell Jacket', 'Wool Jacket', 'Liner Jacket'],
    Bags: ['Field Tote', 'Sling Bag', 'Duffel'],
    Caps: ['Twill Cap', 'Wool Cap', 'Mesh Cap'],
    Belts: ['Leather Belt', 'Webbing Belt', 'Canvas Belt'],
    Jewelry: ['Chain Necklace', 'Signet Ring', 'Cuff Bracelet']
  };
  const name = nameMap[subcategory][index % 3];
  const slug = `${category}-${subcategory.toLowerCase().replace(/\s+/g, '-')}-${index}`;
  const basePrice = 1800 + ((index * 137 + imgSeed) % 4200);
  const onSale = index % 4 === 0;
  return {
    slug,
    name,
    price: basePrice,
    salePrice: onSale ? Math.round(basePrice * 0.75) : undefined,
    category,
    subcategory,
    sizes: category === 'accessories' ? ['One Size'] : ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Constructed from heavyweight, garment-dyed fabric and cut for a considered, slightly relaxed fit. Made to wear in, not just wear once.',
    images: [
      `https://picsum.photos/seed/${slug}-a/1000/1250`,
      `https://picsum.photos/seed/${slug}-b/1000/1250`
    ]
  };
}

export const products: Product[] = categories.flatMap((cat, ci) =>
  cat.subcategories.flatMap((sub, si) =>
    Array.from({ length: 3 }, (_, i) => makeProduct(cat.slug, sub, si * 3 + i, ci * 100))
  )
);

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.category === categorySlug);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
