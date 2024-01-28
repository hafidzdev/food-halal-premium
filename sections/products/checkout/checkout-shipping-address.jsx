import { memo, useState } from "react";

import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Typography,
  Divider,
  CardContent,
  Card,
  Grid,
  Chip,
} from "@mui/material";

import { useResponsive } from "@/hooks/use-responsive";
import Iconify from "@/components/partials/Iconify";
import ConfirmDialog from "@/components/partials/modal/confirm-dialog";
import { UpdateMainAddress } from "@/services/Purchase";
import { CreateAddressDialog } from "@/components/partials/modal";

// ----------------------------------------------------------------------

const CheckoutShippingAddress = memo(
  ({ addressList, purchase, setPurchase }) => {
    const [addresses, setAddresses] = useState(addressList || []);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openAddressMainModal, setOpenAddressMainModal] = useState({
      open: false,
      addressId: "",
      addressName: "",
    });
    const mdUp = useResponsive("up", "md");
    console.log("addreses: ", addressList);

    const handleClickOpen = () => setOpenAddressModal(true);
    const handleCloseModal = () => setOpenAddressModal(false);
    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => setOpenCreateModal(false);
    const handleOpenSetMain = (id, name) =>
      setOpenAddressMainModal({ open: true, addressId: id, addressName: name });
    const handleCloseSetMain = () =>
      setOpenAddressMainModal({ open: false, addressId: "", addressName: "" });

    const handleUpdateMainAddress = async () => {
      if (openAddressMainModal.addressId !== "") {
        const res = await UpdateMainAddress(openAddressMainModal.addressId);
        if (res.status === 200) {
          console.log("main: ", res);
        }
      }
    };

    const handleSelectAddress = (chooseAddress) => {
      setPurchase((prevPurchase) => ({
        ...prevPurchase,
        purchaseShipAddress: chooseAddress,
      }));
      handleCloseModal();
    };

    const orderedAddresses = [...addresses].sort((a, b) => {
      console.log("Urutan alamat lagi...");
      if (a.id === purchase.purchaseShipAddress?.id) return -1;
      if (b.id === purchase.purchaseShipAddress?.id) return 1;
      return 0;
    });

    if (addresses.length === 0) {
      return (
        <>
          <Button variant="contained" onClick={handleOpenCreateModal}>
            Create Shipping Adress First
          </Button>
          <CreateAddressDialog
            open={openCreateModal}
            onClose={handleCloseCreateModal}
          />
        </>
      );
    }

    return (
      <>
        <Typography variant="subtitle1">
          <Iconify
            icon={"carbon:location-filled"}
            width={18}
            sx={{ color: "primary.main" }}
          />{" "}
          {purchase.purchaseShipAddress?.name} •{" "}
          {purchase.purchaseShipAddress?.recipient_name}
        </Typography>
        <Typography variant="body2" sx={{ pt: 1, pl: 0.5 }}>
          {purchase.purchaseShipAddress?.address},{" "}
          {purchase.purchaseShipAddress?.phone}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1, float: "right" }}
          onClick={handleClickOpen}
        >
          Ganti Alamat
        </Button>

        <Dialog open={openAddressModal} fullWidth={true} maxWidth="sm">
          <IconButton
            size="large"
            onClick={handleCloseModal}
            sx={{
              top: 10,
              right: mdUp ? 5 : 25,
              zIndex: 9,
              position: "absolute",
              color: (theme) => alpha(theme.palette.text.primary, 0.72),
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.text.primary, 0.16),
              },
            }}
          >
            <Iconify icon="carbon:close-filled" width={24} />
          </IconButton>
          <DialogTitle>
            <Typography color="textPrimary" gutterBottom>
              List Address
            </Typography>
          </DialogTitle>
          <Divider />

          <DialogContent dividers sx={{ p: 5 }}>
            {orderedAddresses.map((item) => {
              return (
                <Card
                  key={item.id}
                  variant="outlined"
                  sx={{
                    bgcolor:
                      item.id === purchase.purchaseShipAddress?.id
                        ? "background.neutral"
                        : "background.paper",
                    mb: 2,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "16px",
                      left: "0px",
                      width: "6px",
                      height: "34px",
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                      backgroundColor: "success.main",
                    },
                  }}
                >
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12} sm={10}>
                        <Typography
                          variant="h5"
                          color="text.secondary"
                          gutterBottom
                        >
                          <Iconify
                            icon="carbon:location-filled"
                            width={16}
                            sx={{ color: "primary.main" }}
                          />{" "}
                          {item.name}{" "}
                          {item.is_main ? (
                            <Chip
                              size="small"
                              label="Main Address"
                              sx={{
                                bgcolor: "background.default",
                                color: "text.secondary",
                              }}
                            />
                          ) : null}
                        </Typography>
                        <Typography variant="h5" component="div">
                          {item.recipient_name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {item.phone}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {item.address} - {item.zipcode}
                        </Typography>

                        <Stack
                          direction="row"
                          divider={<Divider orientation="vertical" flexItem />}
                          spacing={2}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "primary.main",
                              cursor: "pointer",
                              ":hover": { color: "primary.light" },
                            }}
                          >
                            Update
                          </Typography>
                          {!item.is_main ? (
                            <Typography
                              variant="body2"
                              sx={{
                                color: "primary.main",
                                cursor: "pointer",
                                ":hover": { color: "primary.light" },
                              }}
                              onClick={() =>
                                handleOpenSetMain(item.id, item.name)
                              }
                            >
                              Jadikan Alamat Utama{" "}
                              {item.id === purchase.purchaseShipAddress?.id
                                ? ""
                                : "& Pilih"}
                            </Typography>
                          ) : null}
                          {!item.is_main ? (
                            <Typography
                              variant="body2"
                              sx={{
                                color: "primary.main",
                                cursor: "pointer",
                                ":hover": { color: "primary.light" },
                              }}
                            >
                              Delete
                            </Typography>
                          ) : null}
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={2}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {item.id === purchase.purchaseShipAddress?.id ? (
                          <Iconify
                            icon="carbon:checkmark"
                            width={30}
                            sx={{ color: "success.light" }}
                          />
                        ) : (
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleSelectAddress(item)}
                          >
                            Select
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={openAddressMainModal.open}
          onClose={handleCloseSetMain}
          onAgree={handleUpdateMainAddress}
          title="Jadikan Alamat Utama"
          description={`Apakah Anda yakin ingin menjadikan "${openAddressMainModal.addressName}" sebagai alamat utama? Anda hanya dapat memilih satu alamat utama.`}
        />
      </>
    );
  }
);

CheckoutShippingAddress.propTypes = {
  address: PropTypes.array,
};

export default CheckoutShippingAddress;
