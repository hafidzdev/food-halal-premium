import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token) {
  try {
    const payload = {
      refresh: token.refreshToken,
    };
    const response = await fetch(
      `${process.env.hostName}user/v2/login/refresh`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.tokens.access,
      accessTokenExpires: new Date(refreshedTokens.tokens.access_exp).getTime(),
      refreshToken: refreshedTokens.tokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "food-halal-premium",
      credentials: {
        firebaseToken: { type: "text" },
      },
      async authorize(credentials, req) {
        const payload = {
          token: credentials.firebaseToken,
          project_id: "hararu-web-react",
        };

        const res = await fetch(
          `${process.env.hostName}user/v2/multifirebase`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (account && user) {
        var accessExp = new Date(user.tokens.access_exp).getTime();
        const { tokens, ...withoutTokens } = user;
        const { user_entities, ...withoutEntities } = withoutTokens.user;

        return {
          accessToken: user.tokens.access,
          accessTokenExpires: accessExp,
          refreshToken: user.tokens.refresh,
          user: withoutEntities,
        };
      }

      // When update session do this
      if (trigger === "update") {
        if (session?.first_name) token.user.first_name = session?.first_name;
        if (session?.last_name) token.user.last_name = session?.last_name;
        if (session?.country) token.user.country = session?.country;
        if (session?.address) token.user.address = session?.address;
        if (session?.mobile_phone)
          token.user.mobile_phone = session?.mobile_phone;
        if (session?.currency) token.user.currency = session?.currency;
        if (session?.image_url) token.user.image_url = session?.image_url;

        return token;
      }

      // Return previous token if the access token has not expired yet
      let currentDate = new Date();
      if (currentDate.getTime() < token.accessTokenExpires) {
        return token;
      }
      console.log("tokenku: ", token);
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
