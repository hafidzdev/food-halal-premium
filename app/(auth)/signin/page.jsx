/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Iconify from "@/components/partials/Iconify";
import LoadingButton from "@mui/lab/LoadingButton";

function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      const res = await signInWithEmailAndPassword(auth, email, password);

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
      <Stack
        spacing={4}
        sx={{
          p: 4,
          textAlign: { xs: "center", md: "left" },
          borderRadius: 2,
          // background: (theme) => theme?.palette?.alternate?.dark,
          // boxShadow: (theme) => theme?.customShadows?.z24,
        }}
      >
        <div>
          <Typography variant="h3" paragraph sx={{ color: "text.primary" }}>
            Login
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", display: "inline" }}
          >
            Don't have an account?{" "}
          </Typography>
          <Link href={"#"} passHref legacyBehavior>
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ display: "inline", cursor: "pointer" }}
            >
              Get started
            </Typography>
          </Link>
        </div>
        {error !== "" ? (
          <Typography variant="body2" color="error.main">
            {error}
          </Typography>
        ) : null}

        <Box component="form" noValidate onSubmit={handleOnSubmit}>
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
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={
                        showPassword
                          ? "carbon:view-filled"
                          : "carbon:view-off-filled"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div
            style={{ marginTop: "10px", marginBottom: "10px", float: "right" }}
          >
            <Link href="#" passHref legacyBehavior>
              <Typography
                variant="body3"
                color="text.secondary"
                sx={{ cursor: "pointer" }}
              >
                Forgot password?
              </Typography>
            </Link>
          </div>

          <LoadingButton
            loading={loading ? true : false}
            loadingPosition="start"
            startIcon={<Iconify icon="carbon:login" />}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            <span>{loading ? "Loading..." : "Sign In"}</span>
          </LoadingButton>
        </Box>
      </Stack>
    </>
  );
}

export default Page;
