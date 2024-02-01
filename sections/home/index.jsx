"use client";

import MainLayout from "@/layouts/main";
import HomeHero from "./HomeHero";
import HomeProducts from "./HomeProducts";

export default function HomeLanding() {
  return (
    <MainLayout>
      <HomeHero />
      <HomeProducts />
    </MainLayout>
  );
}
