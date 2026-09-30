"use client";

import { useState } from "react";
import Image from "next/image";
type ContentCardProps = {
  title: string;
  description: string;
  category: string;
  image: string;
  link?: string;
};

export default function ContentCard({
  title,
  description,
  category,
  image,
  link,
}: ContentCardProps) {
  const [favorite, setFavorite] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
         src={image}
          alt={title}
          fill
           className="object-cover"
           />

        <button
          onClick={() => setFavorite((current) => !current)}
          className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-2 text-sm shadow-sm backdrop-blur"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {category}
        </span>

        <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm font-medium text-gray-900 underline underline-offset-4"
          >
            Read more
          </a>
        )}
      </div>
    </article>
  );
}