/* eslint-disable unused-imports/no-unused-vars */
import PropTypes from "prop-types";

import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import Iconify from "@/components/partials/Iconify";

export default function FilterTime({ date, onChangeDate, sx }) {
  return (
    <MobileDatePicker
      value={date}
      onChange={onChangeDate}
      slots={{
        textField: ({
          inputProps,
          InputProps,
          inputRef,
          error,
          ...inputOther
        }) => (
          <InputBase
            id="filter-time"
            fullWidth
            {...InputProps}
            ref={InputProps?.ref}
            inputRef={inputRef}
            inputProps={{
              ...inputProps,
              ...inputOther,
              placeholder: "Receive Date",
            }}
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  width={24}
                  icon="carbon:calendar"
                  sx={{ color: "text.disabled", mr: 1 }}
                />
              </InputAdornment>
            }
            sx={{
              height: 44,
              typography: "subtitle1",
              color: "inherit",
              ...sx,
            }}
          />
        ),
      }}
      {...sx}
    />
  );
}

FilterTime.propTypes = {
  sx: PropTypes.object,
  onChangeDate: PropTypes.func,
  date: PropTypes.instanceOf(Date),
};
