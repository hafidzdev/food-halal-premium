"use client";

import MainLayout from "@/layouts/main";
import HomeHero from "./HomeHero";
import HomeProducts from "./HomeProducts";
import { dataEntity } from "@/__mocks__/entity";

export default function HomeLanding() {
  return (
    <MainLayout>
      <HomeHero entity={dataEntity} />
      <HomeProducts />
    </MainLayout>
  );
}
