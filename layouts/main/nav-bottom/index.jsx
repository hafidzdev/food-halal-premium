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
  Badge,
} from "@mui/material";
import Iconify from "@/components/partials/Iconify";
import { RouterLink } from "@/routes/components";
import { useBoolean } from "@/hooks/use-boolean";
import BarcodeScanner from "@/components/partials/barcodeScanner";
import Quagga from "quagga";
import { useCart } from "@/context/CartContext";
import { usePathname } from "@/routes/hooks/use-pathname";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useActiveLink = (path) => {
  const pathname = usePathname();

  // Check for an exact match or partial match
  const isActive =
    pathname === path || (path !== "/" && pathname.startsWith(path));

  return isActive;
};

const NavBottom = () => {
  const theme = useTheme();
  const [cart] = useCart();

  // set active menu
  const active1 = useActiveLink("/");
  const active2 = useActiveLink("/cart");

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
                  icon={<Iconify icon={"mdi:home"} width={26} height={26} />}
                  sx={{
                    ...(active1 && {
                      color: theme.palette.primary.main,
                      bgcolor: theme.palette.background.neutral,
                    }),
                  }}
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
                  icon={
                    <Badge badgeContent={cart?.length} color="error">
                      <Iconify icon={"mdi:cart"} width={26} height={26} />
                    </Badge>
                  }
                  disableRipple={true}
                  sx={{
                    ...(active2 && {
                      color: theme.palette.primary.main,
                      bgcolor: theme.palette.background.neutral,
                    }),
                  }}
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
