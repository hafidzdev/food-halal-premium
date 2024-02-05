"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getSession = async () => {
  try {
    const tes = await getServerSession(authOptions);
    return tes;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};

async function fetchWithToken(url, options = {}) {
  const userSession = await getSession();
  console.log(userSession.accessToken);
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `${userSession.accessToken}`,
    },
  });
}

// ************
// 		CART
// ************
export async function GetAllCart() {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_HOST_NAME}cart?page=1&limit=20`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();
    const cartItems = Array.isArray(data?.data) ? data?.data : [];
    console.log(data);
    if (!res.ok) {
      return [];
    }

    return cartItems;
  } catch (error) {
    // console.error("Error finding cart:", error.message);
    return [];
  }
}

export async function AddProductToCart(cartId, productId, amount) {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_HOST_NAME}cart-product/${cartId}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          amount,
        }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return { status: res.status, message: data.data };
    }

    return { status: res.status, data: data.data };
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
}

export async function CreateShopCart(allData) {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_HOST_NAME}cart`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...allData }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return { status: res.status, message: data.message };
    }

    return { status: res.status, data: data.data };
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
}

export async function UpdateCart(cartId, quantity) {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/cart/${cartId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: cartId,
          quantity,
        }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return { status: res.status, message: data.detail };
    }

    return { status: res.status, message: data.response };
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
}

export async function DeleteCart(cartId) {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/cart/${cartId}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return { status: res.status, message: data };
    }

    return { status: res.status, message: data.response };
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
}

// ************
// 	 ADDRESS
// ************
export async function GetAddress() {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/shipping-address`
    );

    const data = await res.json();

    if (!res.ok) {
      return [];
    }

    return data.response;
  } catch (error) {
    console.error("Error finding cart:", error.message);
  }
}

// export async function CreateAddress(productId) {
//   try {
//     const res = await fetchWithToken(
//       `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/shipping-address`,
//       {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           product_id: productId,
//           quantity: 1,
//         }),
//       }
//     );
//     const data = await res.json();

//     if (!res.ok) {
//       return { status: res.status, message: data.detail[0].msg };
//     }

//     return { status: res.status, message: data.response };
//   } catch (error) {
//     console.error("Error adding to cart:", error.message);
//   }
// }

export async function UpdateMainAddress(addressId) {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/shipping-address/set-main/${addressId}`,
      {
        method: "put",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return { status: res.status, message: data.detail };
    }

    return {
      status: res.status,
      message: data.meta.message,
      response: data.response,
    };
  } catch (error) {
    console.error("Error finding cart:", error.message);
  }
}

// ************
// 	 Shipping
// ************
export async function GetDeliveryList() {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_HOST_NAME}delivery/v1/entity/shipment-methods?limit=15&page=1`,
      {
        headers: {
          slug: process.env.NEXT_PUBLIC_ENTITY_NAME,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return [];
    }

    return data.response;
  } catch (error) {
    console.error("Error finding cart:", error.message);
  }
}

export async function GetPaymentList() {
  try {
    const res = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_HOST_NAME}payment/v1/entity/payment_method?entity=${process.env.NEXT_PUBLIC_ENTITY_NAME}`
    );

    const data = await res.json();

    if (!res.ok) {
      return [];
    }

    return data.response;
  } catch (error) {
    console.error("Error finding cart:", error.message);
  }
}
