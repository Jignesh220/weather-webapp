import React, { useState, useEffect } from "react";
import { Stack } from "@mui/joy";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { yellow } from "@mui/material/colors";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";

export default function WeatherLayout() {
  const [Day, setDay] = useState("");
  const [todaysDate, settodaysDate] = useState(0);
  const [MonthData, setMonthData] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [CurrentLocation, setCurrentLocation] = useState({
    city: "",
    mainCity: "",
    temp_c: "",
    wind_kph: "",
    pressure_mb: "",
    humidity: "",
    cloud: "",
    uv: "",
    air_quality: "",
    weather_condition: "",
    last_updated:'',
  });
  React.useEffect(() => {
    if (Day === "") {
      getDateData();
    }
  }, [Day]);
  React.useEffect(() => {
    LocationData();
  }, [latitude, longitude]);

  const getDateData = () => {
    const today = new Date();
    console.log(today.getMonth());
    settodaysDate(today.getDate());
    switch (today.getMonth()) {
      case 0:
        setMonthData("January");
        break;
      case 1:
        setMonthData("February");
        break;
      case 2:
        setMonthData("March");
        break;
      case 3:
        setMonthData("April");
        break;
      case 4:
        setMonthData("May");
        break;
      case 5:
        setMonthData("June");
        break;
      case 6:
        setMonthData("July");
        break;
      case 7:
        setMonthData("August");
        break;
      case 8:
        setMonthData("September");
        break;
      case 9:
        setMonthData("October");
        break;
      case 10:
        setMonthData("November");
        break;
      case 11:
        setMonthData("December");
        break;
      default:
        break;
    }
    switch (new Date().getDay()) {
      case 0:
        setDay("Sunday");
        break;
      case 1:
        setDay("Monday");
        break;
      case 2:
        setDay("Tuesday");
        break;
      case 3:
        setDay("Wednesday");
        break;
      case 4:
        setDay("Thursday");
        break;
      case 5:
        setDay("Friday");
        break;
      case 6:
        setDay("Saturday");
    }
  };
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
            setCurrentLocation({
              ...CurrentLocation,
              city: json.location.name,
              mainCity: json.location.region,
              weather_condition: json.current.condition.text,
              last_updated: json.current.last_updated,
              wind_kph: json.current.wind_kph,
              temp_c: json.current.temp_c,
              pressure_mb: json.current.pressure_mb,
              humidity: json.current.humidity,
              cloud: json.current.cloud,
              uv: json.current.uv,
              air_quality: json.current.air_quality.pm2_5,
            });
          });
      },
      (error: GeolocationPositionError) => {
        setError(error.message);
      }
    );
  };

  return (
    <div className="px-72">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ flexGrow: 1 }}
      >
        <Grid
          xs={2}
          sm={4}
          md={3.5}
          sx={{
            backgroundColor: "#ffffff4a",
            backdropFilter: "blur(5px)",
            borderRadius: 20,
          }}
        >
          <div className="min-w-full p-10 rounded-2xl">
            <Stack direction="column" gap={3}>
              <div className="text-sm text-white tracking-wider">last updated: {CurrentLocation.last_updated}</div>
              <Stack direction="row" gap={1} justifyContent="start">
                <LocationOnRoundedIcon
                  style={{
                    color: yellow[700],
                  }}
                />

                <div className="text-xl text-white my-auto">
                  <Stack direction="row" gap={1}>
                    <div className="">{CurrentLocation.city},</div>
                    <div className="">{CurrentLocation.mainCity}</div>
                  </Stack>
                </div>
              </Stack>
              <Stack direction="column" justifyContent="start">
                <Stack direction="row" gap={2} justifyContent="start">
                  <div className="text-3xl text-white font-bold tracking-wider font-manjari">
                    {MonthData}
                  </div>
                  <div className="text-3xl text-white font-bold tracking-wider font-manjari">
                    {todaysDate}
                  </div>
                </Stack>
                <div className="text-xl text-white font-bold tracking-wider font-manjari text-start">
                  {Day}
                </div>
                <div className="text-3xl text-white font-bold tracking-wider font-manjari text-start mt-5">
                  <div className="text-yellow-500">
                    {CurrentLocation.weather_condition}
                  </div>
                  <div className="text-sm">Weather</div>
                </div>
              </Stack>
            </Stack>
          </div>
        </Grid>
        <Grid xs={2} sm={4} md={5}>
          <div className="min-w-full p-5">
            <Stack direction="row" gap={2}>
              <div className="text-lg text-white">{latitude}</div>
              <div className="text-lg font-bold text-white">{longitude}</div>
            </Stack>
          </div>
        </Grid>
        <Grid
          xs={2}
          sm={4}
          md={3.5}
          sx={{
            backgroundColor: "#ffffff4a",
            backdropFilter: "blur(5px)",
            borderRadius: 20,
          }}
        >
          <div className="min-w-full p-10 rounded-2xl">
            <Stack direction="column" gap={2}>
              <div className="text-5xl font-extrabold font-manjari text-yellow-500 text-start tracking-wider">
                {CurrentLocation.temp_c}&deg; C
              </div>
              <Stack direction="column" gap={1}>
                <Stack direction="row" gap={2}>
                  <div className="text-lg text-white">Wind</div>
                  <div className="text-lg font-bold text-yellow-500">
                    {CurrentLocation.wind_kph}kph
                  </div>
                </Stack>
                <Stack direction="row" gap={2}>
                  <div className="text-lg text-white">Humidity</div>
                  <div className="text-lg font-bold text-yellow-500">
                    {CurrentLocation.humidity}%
                  </div>
                </Stack>
                <Stack direction="row" gap={2}>
                  <div className="text-lg text-white">
                    Air Quality ( pm 2.5 )
                  </div>
                  <div className="text-lg font-bold text-yellow-500">
                    {parseFloat(CurrentLocation.air_quality).toFixed(2)}
                  </div>
                </Stack>
                <Stack direction="row" gap={2}>
                  <div className="text-lg text-white">UV</div>
                  <div className="text-lg font-bold text-yellow-500">
                    {CurrentLocation.uv}
                  </div>
                </Stack>
                <Stack direction="row" gap={2}>
                  <div className="text-lg text-white">Pressure</div>
                  <div className="text-lg font-bold text-yellow-500">
                    {CurrentLocation.pressure_mb}mb
                  </div>
                </Stack>
                <Stack direction="row" gap={2}>
                  <div className="text-lg text-white">Cloud</div>
                  <div className="text-lg font-bold text-yellow-500">
                    {CurrentLocation.cloud}%
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
