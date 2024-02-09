import { forwardRef, useState, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Link,
  Grid,
  useTheme,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  DialogContent,
} from "@mui/material";
import Iconify from "@/components/partials/Iconify";
import { RouterLink } from "@/routes/components";
import { useRouter } from "next/navigation";
import { useBoolean } from "@/hooks/use-boolean";
import BarcodeScanner from "@/components/partials/barcodeScanner";
import Quagga from "quagga";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavBottom = () => {
  const theme = useTheme();
  const router = useRouter();

  const [hideNav, setHideNav] = useState(0); // toggle scroll hide effect
  const openScanModal = useBoolean();

  const [scannedBarcode, setScannedBarcode] = useState(null);
  console.log(scannedBarcode);

  const handleScan = (result) => {
    setScannedBarcode(result ? result.codeResult.code : "");
    // Do something with the scanned barcode, like sending it to an API or updating state
  };

  const handleCloseScanModal = () => {
    openScanModal.onFalse();
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
  };

  useEffect(() => {
    // Trigger toggle nav hide with position
    let oldValue = 0;
    let newValue = 0;

    window.addEventListener("scroll", function (e) {
      newValue = window.pageYOffset;

      if (oldValue - newValue < 0) {
        setHideNav(0);
      } else if (oldValue - newValue > 0) {
        setHideNav(0);
      }
      oldValue = newValue;
    });
  }, []);

  const styles = {
    itemNav: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    active: { color: "primary.main" },
    diactive: {
      color: theme.palette.mode === "light" ? "common.black" : "common.white",
    },
  };

  return (
    <>
      <Paper
        sx={{
          display: { xs: "block", sm: "none" },
          zIndex: 3,
          position: "fixed",
          bottom: `${hideNav}px`,
          transition: "bottom 0.3s",
          width: "100%",
          bgcolor: "background.paper",
        }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <Grid container>
            {/* Home */}
            <Grid item xs={3} sx={styles.itemNav}>
              <Link href="/" component={RouterLink}>
                <BottomNavigationAction
                  label="Home"
                  icon={<Iconify icon={"carbon:home"} width={26} height={26} />}
                />
              </Link>
            </Grid>

            {/* Scan */}
            <Grid item xs={6} sx={styles.itemNav}>
              <div className="hexagon-box" onClick={openScanModal.onTrue}>
                <Iconify icon={"bi:qr-code-scan"} width={26} height={26} />
              </div>
            </Grid>

            {/* Cart */}
            <Grid item xs={3} sx={styles.itemNav}>
              <Link component={RouterLink} href="/cart">
                <BottomNavigationAction
                  label="Cart"
                  icon={<Iconify icon={"mdi:cart"} width={30} height={30} />}
                  disableRipple={true}
                />
              </Link>
            </Grid>
          </Grid>
        </BottomNavigation>
      </Paper>

      <Dialog
        fullScreen
        open={openScanModal.value}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseScanModal}
              aria-label="close"
            >
              <Iconify icon="carbon:close-filled" width={24} />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <BarcodeScanner onScan={handleScan} />
          {scannedBarcode && <p>Scanned Barcode: {scannedBarcode}</p>}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavBottom;
