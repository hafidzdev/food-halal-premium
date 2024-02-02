"use server";

export async function GetEntityInfo() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}entity/qcaTz5BI0BkByjGW2gtI`
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
