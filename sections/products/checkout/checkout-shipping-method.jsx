import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel, {
  formControlLabelClasses,
} from "@mui/material/FormControlLabel";

import Iconify from "@/components/partials/Iconify";

// ----------------------------------------------------------------------

export default function CheckoutShippingMethod({
  deliveryList,
  purchase,
  setPurchase,
}) {
  return (
    <>
      <RadioGroup
        // {...field}
        sx={{
          rowGap: 2.5,
          columnGap: 2,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
        }}
      >
        {Array.isArray(deliveryList) &&
          deliveryList.map((item) => (
            <OptionItem
              key={item?.id}
              option={item}
              selected={
                purchase.purchaseShipDelivery === item.id ? true : false
              }
              setPurchase={setPurchase}
            />
          ))}
      </RadioGroup>
    </>
  );
}

CheckoutShippingMethod.propTypes = {
  deliveryList: PropTypes.array,
  purchase: PropTypes.object,
  setPurchase: PropTypes.func,
};

// ----------------------------------------------------------------------

function OptionItem({ option, selected, setPurchase }) {
  const { id, name, delivery_entity_name, price_per_km, description } = option;

  const handlePurchaseShippingUpdate = (deliveryId) => {
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      purchaseShipDelivery: deliveryId,
    }));
  };

  const renderLabel = (
    <Stack flexGrow={1} spacing={1} sx={{ width: 1 }}>
      <Stack direction="row" alignItems="center">
        <Iconify icon={"carbon:bicycle"} width={26} />

        <Box
          component="span"
          sx={{ typography: "subtitle1", flexGrow: 1, ml: 1 }}
        >
          {name}
        </Box>

        <Box component="span" sx={{ typography: "subtitle2" }}>
          Price /Km: {`${price_per_km}`}
        </Box>
      </Stack>

      <Stack direction="row" alignItems="center">
        <Box component="span" sx={{ typography: "body2", flexGrow: 1 }}>
          {delivery_entity_name}
        </Box>
      </Stack>

      <Box
        component="span"
        sx={{ typography: "body2", color: "text.secondary" }}
      >
        {description}
      </Box>
    </Stack>
  );

  return (
    <FormControlLabel
      value={name}
      control={
        <Radio
          disableRipple
          checkedIcon={<Iconify icon="carbon:checkmark-outline" />}
          sx={{ mx: 1, mt: -7 }}
        />
      }
      label={renderLabel}
      onClick={() => handlePurchaseShippingUpdate(id)}
      sx={{
        m: 0,
        py: 3,
        pr: 2,
        borderRadius: 1,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        }),
        [`& .${formControlLabelClasses.label}`]: {
          width: 1,
        },
      }}
    />
  );
}

OptionItem.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string,
    delivery_entity_name: PropTypes.string,
    price_per_km: PropTypes.number,
    description: PropTypes.string,
  }),
  selected: PropTypes.bool,
  setPurchase: PropTypes.func,
};
