import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import config from "../../config";
import "./FeaturedListing.css";
import { CardActionArea } from "@mui/material";

export default function FeaturedListing() {
  const [listingsData, setListingsData] = useState([]);

  //fetch listings data:
  async function fetchListings() {
    const response = await axios.get(
      `${config.backendEndpoint}/real-estate-data`
    );

    const data = response.data.listings;

    //only 8 listing to be displayed:
    setListingsData(data.slice(0, 8));
  }

  //on page load, fetch listing data
  useEffect(() => {
    fetchListings();
  }, []);

  //render:
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 3, md: 5 }}>
        {listingsData.map((ele, index) => (
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  sx={{ height: 200 }}
                  image={`/assets/real-estate-${index}.jpg`}
                  title="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ wordBreak: "breakAll" }}
                  >
                    {ele.property_name.slice(0, 6)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div className="listing-detail">
                    <span>Rs {ele.price}</span>
                    <span>{ele.city.slice(0, 5)}</span>
                  </div>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}