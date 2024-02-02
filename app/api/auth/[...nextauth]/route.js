import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// async function refreshAccessToken(token) {
//   try {
//     const payload = {
//       refresh: token.refreshToken,
//     };
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_HOST_NAME}user/v2/login/refresh`,
//       {
//         method: "POST",
//         body: JSON.stringify(payload),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.tokens.access,
//       accessTokenExpires: new Date(refreshedTokens.tokens.access_exp).getTime(),
//       refreshToken: refreshedTokens.tokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "food-halal-premium",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        authType: { type: "text" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_NAME}user/${credentials.authType}`,
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
          throw new Error(
            JSON.stringify({ errors: user.message, status: false })
          );
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
    error: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { stsTokenManager, ...withoutTokens } = user.message;

        token.accessToken = user.message.stsTokenManager.accessToken;
        token.accessTokenExpires = user.message.stsTokenManager.expirationTime;
        token.refreshToken = user.message.stsTokenManager.refreshToken;
        token.user = withoutTokens;
      }
      // if (account && user) {
      //   var accessExp = new Date(
      //     user.message.stsTokenManager.expirationTime
      //   ).getTime();
      //   const { stsTokenManager, ...withoutTokens } = user.message;

      //   return {
      //     accessToken: user.message.stsTokenManager.accessToken,
      //     accessTokenExpires: accessExp,
      //     refreshToken: user.message.stsTokenManager.refreshToken,
      //     user: withoutTokens,
      //   };
      // }

      let currentDate = new Date().getTime();
      if (currentDate > token.accessTokenExpires) {
        throw Error("Expired token");
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
