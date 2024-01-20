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
