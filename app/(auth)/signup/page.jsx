"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const session = await getSession();

      if (session) {
        router.replace("/");
      }
    };

    checkAuthStatus();
  }, [router]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(e.currentTarget);
    let email = data.get("email");
    let password = data.get("password");

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (res) {
        const loginExternalAPI = await signIn("credentials", {
          redirect: false,
          firebaseToken: res.user.accessToken,
          callbackUrl: `${window.location.origin}`,
        });
        if (loginExternalAPI) router.push("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5" color="text.primary">
        Sign Up
      </Typography>

      {error !== "" ? (
        <Typography variant="body2" color="error.main">
          {error}
        </Typography>
      ) : null}

      <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleOnSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          disabled={loading ? true : false}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signin" variant="body2">
              {"Don't have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Page;
