import PropTypes from "prop-types";
import Image from "@/components/partials/image/image";
import { Card, Box } from "@mui/material";

const ImageList = ({ item }) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <Image
          src={item}
          alt="cover"
          ratio="3/4"
          // width="200"
          // height={200}
          // // layout="responsive"
          // // loading="lazy"
          // priority
        />
      </Box>
    </Card>
  );
};

export default ImageList;

ImageList.propTypes = {
  item: PropTypes.string,
};
