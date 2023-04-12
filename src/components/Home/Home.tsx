import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Searchbar from "../Search/Searchbar";
import HourlyWeather from "./HourlyWeather";
import WeatherLayout from "./WeatherLayout";
import { navigate } from "gatsby";
import "../../images/weather/sunny.jpg";

export default function Home() {
  const [locaion, setlocaion] = React.useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ImageCounter, setImageCounter] = useState(0);
  React.useEffect(() => {
    setlocaion(window.location.search.slice(3));
    LocationData();
    setBackgroundImage();
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
              navigate(`?s=${json.location.name}`);
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
              setLatitude(json.latitude);
              setLongitude(json.longitude);
              fetch(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.GATSBY_API_KEY}&q=${json.latitude},${json.longitude}&aqi=yes`
              )
                .then((res) => res.json())
                .then((json) => {
                  navigate(`?s=${json.location.name}`);
                });
            })
            .catch((err) => {});
        }
      );
  };

  const setBackgroundImage = () => {
    if (window.location.search !== null) {
      console.log("running!!!");
      
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${
          process.env.GATSBY_API_KEY
        }&q=${window.location.search.slice(3)}&aqi=yes`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.current.condition.code === 1000) {
            setImageCounter(0);
          }
          if (
            json.current.condition.code === 1003 ||
            json.current.condition.code === 1006 ||
            json.current.condition.code === 1009
          ) {
            setImageCounter(1);
          }
          if (
            json.current.condition.code === 1030 ||
            json.current.condition.code === 1135 ||
            json.current.condition.code === 1147
          ) {
            setImageCounter(2);
          }
          if (
            json.current.condition.code === 1063 ||
            json.current.condition.code === 1150 ||
            json.current.condition.code === 1153 ||
            json.current.condition.code === 1168 ||
            json.current.condition.code === 1171 ||
            json.current.condition.code === 1180 ||
            json.current.condition.code === 1183 ||
            json.current.condition.code === 1186 ||
            json.current.condition.code === 1189 ||
            json.current.condition.code === 1192 ||
            json.current.condition.code === 1195 ||
            json.current.condition.code === 1198 ||
            json.current.condition.code === 1201 ||
            json.current.condition.code === 1240 ||
            json.current.condition.code === 1243 ||
            json.current.condition.code === 1246
          ) {
            setImageCounter(3);
          }
          if (
            json.current.condition.code === 1066 ||
            json.current.condition.code === 1072 ||
            json.current.condition.code === 1114 ||
            json.current.condition.code === 1117 ||
            json.current.condition.code === 1210 ||
            json.current.condition.code === 1213 ||
            json.current.condition.code === 1216 ||
            json.current.condition.code === 1219 ||
            json.current.condition.code === 1222 ||
            json.current.condition.code === 1225 ||
            json.current.condition.code === 1237 ||
            json.current.condition.code === 1255 ||
            json.current.condition.code === 1258 ||
            json.current.condition.code === 1261 ||
            json.current.condition.code === 1264
          ) {
            setImageCounter(4);
          }
          if (
            json.current.condition.code === 1087 ||
            json.current.condition.code === 1273 ||
            json.current.condition.code === 1276 ||
            json.current.condition.code === 1279 ||
            json.current.condition.code === 1282
          ) {
            setImageCounter(5);
          }
          if (
            json.current.condition.code === 1069 ||
            json.current.condition.code === 1204 ||
            json.current.condition.code === 1207 ||
            json.current.condition.code === 1249 ||
            json.current.condition.code === 1252
          ) {
            setImageCounter(6);
          }
        });
    }
  };

  return (
    <div>
      <div
        style={{
          minHeight: "100%",
        }}
      >
        {ImageCounter === 0 && (
          <StaticImage
            src={"../../images/weather/sunny.jpg"}
            alt="Cloudy image"
            formats={["avif", "webp"]}
            style={{ width: "100vw", height: "100vh", position: "absolute" }}
          />
        )}
        {ImageCounter === 1 && (
          <StaticImage
            src={"../../images/weather/cloudy.jpg"}
            alt="Cloudy image"
            formats={["avif", "webp"]}
            style={{ width: "100vw", height: "100vh", position: "absolute" }}
          />
        )}
        {ImageCounter === 2 && (
          <StaticImage
            src={"../../images/weather/mist.jpg"}
            alt="Cloudy image"
            formats={["avif", "webp"]}
            style={{ width: "100vw", height: "100vh", position: "absolute" }}
          />
        )}
        {ImageCounter === 3 && (
          <StaticImage
            src={"../../images/weather/rainy.jpg"}
            alt="Cloudy image"
            formats={["avif", "webp"]}
            style={{ width: "100vw", height: "100vh", position: "absolute" }}
          />
        )}
        {ImageCounter === 4 && (
          <StaticImage
            src={"../../images/weather/snow.jpg"}
            alt="Cloudy image"
            formats={["avif", "webp"]}
            style={{ width: "100vw", height: "100vh", position: "absolute" }}
          />
        )}
        {ImageCounter === 5 && (
          <StaticImage
            src={"../../images/weather/thunder.jpg"}
            alt="Cloudy image"
            formats={["avif", "webp"]}
            style={{ width: "100vw", height: "100vh", position: "absolute" }}
          />
        )}
        {ImageCounter === 6 && (
          <StaticImage
            src={"../../images/weather/sleet.jpg"}
            alt="Cloudy image"
            formats={["avif", "webp"]}
            style={{ width: "100vw", height: "100vh", position: "absolute" }}
          />
        )}

        <div
          style={{
            minWidth: "100%",
            minHeight: "100%",
            backgroundColor: "#0000005a",
            backdropFilter: "blur(5px)",
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="grid grid-flow-row min-w-full">
            <Searchbar />
            <WeatherLayout />
            <HourlyWeather />
          </div>
        </div>
      </div>
    </div>
  );
}
