"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  TextField,
  Box,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { useBoolean } from "@/hooks/use-boolean";

// import { countries } from "src/assets/data";

import Iconify from "@/components/partials/Iconify";

// ----------------------------------------------------------------------

export default function AccountPersonal() {
  const passwordShow = useBoolean();

  return (
    <form>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Personal
      </Typography>

      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      >
        <TextField name="firstName" label="First Name" />

        <TextField name="lastName" label="Last Name" />

        <TextField name="emailAddress" label="Email Address" />

        <TextField name="phoneNumber" label="Phone Number" />

        <TextField name="streetAddress" label="Street Address" />
        {/* 
        <RHFAutocomplete
          name="country"
          label="Country"
          options={countries.map((country) => country.label)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => {
            const { code, label, phone } = countries.filter(
              (country) => country.label === option
            )[0];

            if (!label) {
              return null;
            }

            return (
              <li {...props} key={label}>
                <Iconify
                  key={label}
                  icon={`circle-flags:${code.toLowerCase()}`}
                  width={28}
                  sx={{ mr: 1 }}
                />
                {label} ({code}) +{phone}
              </li>
            );
          }}
        /> */}
      </Box>

      <Stack spacing={3} sx={{ my: 5 }}>
        <Typography variant="h5"> Change Password </Typography>

        <Stack spacing={2.5}>
          <TextField
            name="oldPassword"
            label="Old Password"
            type={passwordShow.value ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={passwordShow.onToggle} edge="end">
                    <Iconify
                      icon={
                        passwordShow.value ? "carbon:view" : "carbon:view-off"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="newPassword"
            label="New Password"
            type={passwordShow.value ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={passwordShow.onToggle} edge="end">
                    <Iconify
                      icon={
                        passwordShow.value ? "carbon:view" : "carbon:view-off"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="confirmNewPassword"
            label="Confirm New Password"
            type={passwordShow.value ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={passwordShow.onToggle} edge="end">
                    <Iconify
                      icon={
                        passwordShow.value ? "carbon:view" : "carbon:view-off"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      <LoadingButton
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
      >
        Save Changes
      </LoadingButton>
    </form>
  );
}
