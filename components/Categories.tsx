"use client";

import React from "react";
import { categoryFilters } from "@/constant";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleTags = (item: string) => {
    router.push(`${pathName}?category=${item}`);
  };
  return (
    <div className="w-full">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleTags(filter)}
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
