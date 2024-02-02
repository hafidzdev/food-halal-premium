"use server";

// export async function GetProductData(category, limit, page) {
//   const fixURL = category
//     ? `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/product-entity?entity=${process.env.NEXT_PUBLIC_ENTITY_NAME}&category=${category}&has_image=true&etype=vendor&outstock=false&limit=${limit}&page=${page}`
//     : `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/product-entity?entity=${process.env.NEXT_PUBLIC_ENTITY_NAME}&has_image=true&etype=vendor&outstock=false&limit=${limit}&page=${page}`;

//   const res = await fetch(fixURL, {
//     cache: "force-cache",
//     // cache: "no-store",
//   });

//   const data = await res.json();
//   return data;
// }

export async function GetAllProducts(category, limit, page) {
  const fixURL = category
    ? `${process.env.NEXT_PUBLIC_HOST_NAME}product?category=${category}&limit=${limit}&page=${page}`
    : `${process.env.NEXT_PUBLIC_HOST_NAME}product?limit=${limit}&page=${page}`;

  try {
    const res = await fetch(fixURL);

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch product data");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
}

export async function GetProductDetail(productId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/${productId}`
    );

    const data = await res.json();
    if (!res.ok) {
      return false;
    }

    return data.data;
  } catch (error) {
    return false;
  }
}
