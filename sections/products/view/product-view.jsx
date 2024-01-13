"use client";

import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

// import { useBoolean } from "@/hooks/use-boolean";

import CustomBreadcrumbs from "@/components/partials/custom-breadcrumbs";

import ProductDetailsCarousel from "../details/product-details-carousel";
import ProductDetailsInfo from "../details/product-details-info";
import ProductDetailsDescription from "../details/product-details-description";

// ----------------------------------------------------------------------

const product = {
  name: "Nama Produk",
  price: 100, // Ganti dengan nilai harga yang sesuai
  caption:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas bibendum sem. Aliquam erat volutpat. Etiam laoreet quam ac nisi molestie auctor. Aenean ultricies urna id commodo pharetra. Morbi tristique, lorem eget pellentesque imperdiet, lorem turpis ornare nisi, sed suscipit metus est iaculis leo. ",
  priceSale: 80, // Ganti dengan nilai harga diskon yang sesuai
  ratingNumber: 4.5, // Ganti dengan nilai rating produk yang sesuai
  totalReviews: 120, // Ganti dengan jumlah total ulasan yang sesuai
  images: [
    "/assets/images/product-1.jpg",
    "/assets/images/product-2.jpeg",
    "/assets/images/product-3.jpeg",
    // ... dan seterusnya
  ],
};

export default function ProductView() {
  //   const loading = useBoolean(true);

  //   useEffect(() => {
  //     const fakeLoading = async () => {
  //       await new Promise((resolve) => setTimeout(resolve, 500));
  //       loading.onFalse();
  //     };
  //     fakeLoading();
  //   }, [loading]);

  //   //   if (loading.value) {
  //   //     return <SplashScreen />;
  //   //   }

  return (
    <>
      <Container sx={{ overflow: "hidden" }}>
        <CustomBreadcrumbs
          links={[
            {
              name: "Home",
            },
            {
              name: "Products",
            },
            {
              name: "Detail Products",
            },
          ]}
          sx={{ my: 5 }}
        />

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <ProductDetailsCarousel images={product.images} />
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <ProductDetailsInfo
              name={product.name}
              price={product.price}
              caption={product.caption}
              priceSale={product.priceSale}
              ratingNumber={product.ratingNumber}
              totalReviews={product.totalReviews}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <ProductDetailsDescription
              specifications={[
                { label: "Weight", value: "200 ml" },
                { label: "Discount", value: "50%" },
                { label: "Stock", value: "10" },
                { label: "Sent From", value: "358607726380311" },
                { label: "Ingredients", value: "-" },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
