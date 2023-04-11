import React, { useState, useEffect } from "react";
import { Box, Stack, Grid } from "@mui/joy";
import { StaticImage } from "gatsby-plugin-image";

type HourlyWeatherDataType = {
  temp_c: number;
  time: string;
  condition: {
    icon: string;
  };
};

export default function HourlyWeather() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState<
    HourlyWeatherDataType[]
  >([]);

  useEffect(() => {
    getWeatherHourlyData();
  }, [latitude, longitude, error]);

  const getWeatherHourlyData = (): void => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.GATSBY_API_KEY}&q=${position.coords.latitude},${position.coords.longitude}&aqi=yes`
        )
          .then((res) => res.json())
          .then((json) => {
            setHourlyWeatherData(json.forecast.forecastday[0].hour);
          });
      },
      (error: GeolocationPositionError) => {
        setError(error.message);
      }
    );
  };

  return (
    <div className="mt-12 px-28">
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }} sx={{ flexGrow: 1 }}>
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
      xs={2}
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
