export const dynamic = "force-dynamic";

import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

// PAGINATION CONFIG
const PRODUCTS_PER_PAGE = 8;

async function getData(page: number) {
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;

  const query = `*[_type == 'product'] | order(_createdAt desc) [${start}...${end}] {
    _id,
    price,
    name,
    "slug": slug.current,
    "catagoryName": category->name,
    "imageUrl": images[0].asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function AllProducts({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1");
  const data: simplifiedProduct[] = await getData(currentPage);

  if (!data.length && currentPage !== 1) notFound();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 underline decoration-4 underline-offset-8">
            All Products
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt="Product image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.catagoryName}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-12 gap-4">
          {currentPage > 1 && (
            <Link
              href={`?page=${currentPage - 1}`}
              className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
            >
              Previous
            </Link>
          )}
          {data.length === PRODUCTS_PER_PAGE && (
            <Link
              href={`?page=${currentPage + 1}`}
              className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
