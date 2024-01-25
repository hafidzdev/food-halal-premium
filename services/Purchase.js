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
const userSession = await getSession();

// ************
// 		CART
// ************
export async function GetCart() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/cart?shared=false`,
      {
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();
    const cartItems = data?.response.flatMap((cart) => cart.cart_item);

    if (!res.ok || !userSession?.accessToken) {
      return [];
    }

    return cartItems;
  } catch (error) {
    console.error("Error finding cart:", error.message);
  }
}

export async function AddToCart(productId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/cart`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return { status: res.status, message: data.detail[0].msg };
    }

    return { status: res.status, message: data.response };
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
}

export async function UpdateCart(cartId, quantity) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/cart/${cartId}`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/cart/${cartId}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/shipping-address`,
      {
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !userSession?.accessToken) {
      return [];
    }

    return data.response;
  } catch (error) {
    console.error("Error finding cart:", error.message);
  }
}

export async function UpdateMainAddress(addressId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/shipping-address/set-main/${addressId}`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
        },
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}delivery/v1/entity/shipment-methods?limit=15&page=1`,
      {
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
          slug: process.env.NEXT_PUBLIC_ENTITY_NAME,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !userSession?.accessToken) {
      return [];
    }

    return data.response;
  } catch (error) {
    console.error("Error finding cart:", error.message);
  }
}

export async function GetPaymentList() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}payment/v1/entity/payment_method?entity=${process.env.NEXT_PUBLIC_ENTITY_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${userSession?.accessToken}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !userSession?.accessToken) {
      return [];
    }

    return data.response;
  } catch (error) {
    console.error("Error finding cart:", error.message);
  }
}
