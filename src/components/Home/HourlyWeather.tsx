import React, { useState, useEffect } from "react";
import { Box, Stack, Grid } from "@mui/joy";
import { StaticImage } from "gatsby-plugin-image";
import axios from "axios";

type HourlyWeatherDataType = {
  temp_c: number;
  time: string;
  condition: {
    icon: string;
  };
};

export default function HourlyWeather() {
  const [hourlyWeatherData, setHourlyWeatherData] = useState<
    HourlyWeatherDataType[]
  >([]);
  const [location, setlocation] = React.useState("");

  useEffect(() => {
    getWeatherHourlyDataBySearch();
    console.log(window.location.search);
    setlocation(window.location.search)
  }, [location]);

  const getWeatherHourlyDataBySearch = () => {
    if (window.location.search) {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${
          process.env.GATSBY_API_KEY
        }&q=${window.location.search.slice(3)}&aqi=yes`
      )
        .then((res) => res.json())
        .then((json) => {
          setHourlyWeatherData(json.forecast.forecastday[0].hour);
        });
    }
  };

  return (
    <div className="mt-12 px-28">
      <Grid container columns={{ xs: 12, sm: 12, md: 12 }} sx={{ flexGrow: 1 }}>
        {hourlyWeatherData.map((data: HourlyWeatherDataType) => (
          <OneHourData
            key={data.time}
            temp_c={data.temp_c}
            time={data.time}
            iconPath={data.condition.icon}
          />
        ))}
      </Grid>
    </div>
  );
}

const OneHourData = ({
  temp_c,
  time,
  iconPath,
}: {
  temp_c: number;
  time: string;
  iconPath: string;
}): JSX.Element => {
  const [iPath, setiPath] = React.useState("");
  function ReverseString(str: string) {
    const reverse = str.split("").reverse().join("");
    const extractPath = reverse.slice(0, 7);
    setiPath(extractPath.split("").reverse().join(""));
  }
  React.useEffect(() => {
    ReverseString(iconPath);
  }, [iconPath]);

  return (
    <Grid
      xs={6}
      sm={4}
      md={1.5}
      sx={{
        borderRadius: 16,
      }}
    >
      <Box
        sx={{
          padding: 1,
          borderRadius: 16,
          boxShadow: 8,
        }}
      >
        <Stack
          direction="row"
          gap={1}
          sx={{
            backgroundColor: "#B4D6FF7a",
            backdropFilter: "blur(5px)",
            paddingY: 1,
            borderRadius: 16,
          }}
        >
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/clime-forecast.appspot.com/o/weather%2F${iPath}?alt=media`}
            alt="icon_image"
            width={60}
            className="mx-3"
          />
          <Stack
            direction="column"
            gap={1}
            justifyContent="center"
            alignItems="center"
          >
            <div className="text-xl font-bold font-manjari text-white">
              {temp_c}&deg; C
            </div>
            <div className="text-xl font-bold font-manjari text-white">
              {time.slice(11)}
            </div>
          </Stack>
        </Stack>
      </Box>
    </Grid>
  );
};
