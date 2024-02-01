"use server";

export async function GetEntityInfo() {
  try {
    const res = await fetch(
      `https://shop-pcfpjwad6a-uc.a.run.app/entity/qcaTz5BI0BkByjGW2gtI`,
      {
        cache: "no-cache",
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
