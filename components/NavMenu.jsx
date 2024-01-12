"use client";
import { Box } from "@mui/material";
// import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
// import { usePathname } from "next/navigation";

function AuthButton() {
  const { data: session } = useSession();
  console.log("oo: ", session);
  if (session) {
    return (
      <>
        {session?.user?.first_name} {session?.user?.last_name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

function NavMenu() {
  return (
    <Box sx={{ py: 2, my: 2, border: 1, borderColor: "orange" }}>
      <AuthButton />
    </Box>
  );
}

export default NavMenu;
