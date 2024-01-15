export async function GetProductData(category, limit, page) {
  const fixURL = category
    ? `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/product-entity?entity=${process.env.NEXT_PUBLIC_ENTITY_NAME}&category=${category}&has_image=true&etype=vendor&outstock=false&limit=${limit}&page=${page}`
    : `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/product-entity?entity=${process.env.NEXT_PUBLIC_ENTITY_NAME}&has_image=true&etype=vendor&outstock=false&limit=${limit}&page=${page}`;

  const res = await fetch(fixURL, {
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}
