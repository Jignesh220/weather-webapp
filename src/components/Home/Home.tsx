import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Searchbar from "../Search/Searchbar";
import HourlyWeather from "./HourlyWeather";
import WeatherLayout from "./WeatherLayout";

export default function Home() {
  return (
    <div>
      <div
        style={{
          minHeight: "100%",
        }}
      >
        <StaticImage
          src={"../../images/Cloudy.jpg"}
          alt="Cloudy image"
          formats={["avif", "webp"]}
          style={{ width: "100vw", height: "100vh", position: "absolute" }}
        />
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
            <HourlyWeather/>
          </div>
        </div>
      </div>
    </div>
  );
}
