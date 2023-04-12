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
  const [location, setlocation] = React.useState("");
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
    last_updated: "",
    icon: "",
  });
  const [iPath, setiPath] = React.useState("");
  function ReverseString(str: string) {
    const reverse = str.split("").reverse().join("");
    const extractPath = reverse.slice(0, 7);
    setiPath(extractPath.split("").reverse().join(""));
  }
  React.useEffect(() => {
    if (Day === "") {
      getDateData();
    }
  }, [Day]);
  React.useEffect(() => {
    ReverseString(CurrentLocation.icon);
  }, [iPath, CurrentLocation.icon]);

  React.useEffect(() => {
    getWeatherHourlyDataBySearch();
    console.log(window.location.search);
    
    setlocation(window.location.search)
  }, [location]);

  const getDateData = () => {
    const today = new Date();
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

  const getWeatherHourlyDataBySearch = () => {
    if (window.location.search) {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${
          process.env.GATSBY_API_KEY
        }&q=${window.location.search.slice(3)}&aqi=yes`
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
            icon: json.current.condition.icon,
          });
        });
    }
  };

  return (
    <div className="px-72">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columnSpacing={3}
        columns={{ xs: 4, sm: 8, md: 12 ,lg: 12}}
        sx={{ flexGrow: 1 }}
        justifyContent="center"
      >
        <Grid
          xs={6}
          sm={12}
          md={6}
          lg={3.5}
          sx={{
            backgroundColor: "#ffffff4a",
            backdropFilter: "blur(5px)",
            borderRadius: 20,
          }}
        >
          <div className="min-w-full p-10 rounded-2xl">
            <Stack direction="column" gap={3}>
              <div className="text-sm text-white tracking-wider">
                last updated: {CurrentLocation.last_updated}
              </div>
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
        <Grid xs={6} sm={12} md={6}
          lg={5}>
          <center
            className="min-w-full p-5"
            style={{
              backgroundColor: "#ffffff8a",
              backdropFilter: "blur(8px)",
              borderRadius: 20,
            }}
          >
            <img
              src={`https://firebasestorage.googleapis.com/v0/b/clime-forecast.appspot.com/o/weather%2F${iPath}?alt=media`}
              alt="icon_image"
              width={400}
              className="mx-3"
            />
            <div className="text-center text-3xl">
              <div className="text-blue-800 font-bold font-manjari tracking-wide">
                {CurrentLocation.weather_condition}
              </div>
            </div>
          </center>
        </Grid>
        <Grid
          xs={6}
          sm={12}
          md={6}
          lg={3.5}
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
