import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Searchbar from "../Search/Searchbar";
import HourlyWeather from "./HourlyWeather";
import WeatherLayout from "./WeatherLayout";
import { navigate } from "gatsby";
import LinearProgress from '@mui/joy/LinearProgress';
import { Stack } from "@mui/joy";

export default function Home() {
  const [locaion, setlocaion] = React.useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ImageCounter, setImageCounter] = useState(0);
  React.useEffect(() => {
    setlocaion(window.location.search.slice(3));
    LocationData();
  }, [locaion]);

  const LocationData = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.GATSBY_API_KEY}&q=${position.coords.latitude},${position.coords.longitude}&aqi=yes`
        )
          .then((res) => res.json())
          .then((json) => {
            setTimeout(() => {
              navigate(`/location?s=${json.location.name}`);
            }, 3000);
          });
      },
      (error: GeolocationPositionError) => {
        setError(error.message);
        fetch(`https://geolocation-db.com/json/`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(
                `Failed to fetch geolocation data: ${res.status}`
              );
            }
            return res.json();
          })
          .then((json) => {
            setTimeout(() => {
              navigate(`/location?s=${json.city}`);
            }, 3000);
          })
          .catch((err) => {});
      }
    );
  };

  return (
    <div className="min-h-screen center-v-h bg-sky-950">
      <Stack direction="column" gap={2}>
      <StaticImage src="../../images/icon.png" alt="logo" width={300} />
      <LinearProgress variant="outlined" thickness={1} color="danger" sx={{
        paddingX: 10,
      }}/>
      </Stack>
    </div>
  );
}
