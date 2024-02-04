// services/Product.js

export async function GetAllCategory() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}category`, {
      cache: "no-cache",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch category data");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error;
  }
}
