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

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${userSession.accessToken}`,
    },
  });
}

export async function UpdatePhotoProfile(userSlug, image_url) {
  try {
    const update = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_HOST_NAME}user/v2/user/${userSlug}`,
      {
        method: "put",
        user_image: image_url,
      }
    );

    if (update === 200) {
      return { error: false, data: update?.data?.data };
    }
    return { error: true, message: "" };
  } catch (err) {
    return { error: true, message: err.message };
  }
}
