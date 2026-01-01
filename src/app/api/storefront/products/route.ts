import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const colorHexMap: Record<string, string> = {
  Black: "#0B0B0C",
  White: "#FFFFFF",
  Charcoal: "#121214",
  Olive: "#4A4A3A",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const resolveColorHex = (color: string) =>
  colorHexMap[color] ?? "#121214";

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ products: [], categories: [] });
  }

  const products = await prisma.product.findMany({
    where: { status: "ACTIVE", deletedAt: null },
    include: {
      images: true,
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const mappedProducts = products.map((product) => {
    const images = [...product.images]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((image) => image.url);

    const sizeSet = new Set(product.variants.map((variant) => variant.size));
    const colorsMap = new Map<string, string>();
    product.variants.forEach((variant) => {
      colorsMap.set(variant.color, resolveColorHex(variant.color));
    });

    const isSale =
      product.compareAtPrice !== null &&
      product.compareAtPrice !== undefined &&
      product.compareAtPrice > product.basePrice;
    const badge = product.tags.includes("sale")
      ? "sale"
      : product.tags.includes("new")
      ? "new"
      : isSale
      ? "sale"
      : undefined;

    return {
      id: product.id,
      name: product.title,
      slug: product.slug,
      category: product.category,
      price: product.basePrice,
      originalPrice: product.compareAtPrice ?? undefined,
      description: product.description,
      details: product.details,
      materials: product.materials,
      fit: product.fit,
      care: product.care,
      images,
      sizes: Array.from(sizeSet),
      colors: Array.from(colorsMap.entries()).map(([name, hex]) => ({
        name,
        hex,
      })),
      badge,
      inStock: product.variants.some((variant) => variant.stockQty > 0),
    };
  });

  const categoryMap = new Map<string, string>();
  products.forEach((product) => {
    if (product.category) {
      categoryMap.set(product.category, slugify(product.category));
    }
  });

  const categories = Array.from(categoryMap.entries())
    .map(([name, slug]) => ({ name, slug }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json({ products: mappedProducts, categories });
}
