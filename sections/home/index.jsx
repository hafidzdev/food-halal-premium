"use client";

import MainLayout from "@/layouts/main";
import HomeHero from "./HomeHero";
import HomeCarousel from "./HomeCarousel";
import HomeCategories from "./HomeCategories";

export default function HomeLanding() {
  return (
    <MainLayout>
      <HomeHero />
      <HomeCarousel />
      <HomeCategories />
    </MainLayout>
  );
}
