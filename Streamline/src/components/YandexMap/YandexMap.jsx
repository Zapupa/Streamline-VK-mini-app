import React, { useState, useEffect } from "react";
import "./YandexMap.css";
import {
  YMaps,
  Map,
  FullscreenControl,
  GeoObject,
  Polyline,
} from "@pbe/react-yandex-maps";
import trail from "../../resources/trails/gorodskoi-bor.gpx";
// import trail from "../../resources/trails/moskva-pushchino-tesna-june-16-mmxviii.gpx";
const API_KEY = "8ad44015-6f2d-4403-92cb-4daa45aff76c";

const defaultMapState = {
  center: [55.159901, 61.402547],
  zoom: 12,
};

const YandexMap = ({ mapState }) => {
  const [positions, setPositions] = useState("");
  let gpxParser = require("gpxparser");
  var gpx = new gpxParser();

  const componentDidMount = async () => {
    const response = await fetch(trail, { metod: "POST" });
    const gpxDemo = await response.text();

    gpx.parse(gpxDemo);
    setPositions(gpx.tracks[0].points.map((p) => [p.lat, p.lon]));

    console.log(positions);
  };

  return (
    <div>
      <YMaps
        query={{
          apikey: API_KEY,
        }}
      >
        <Map className="map" state={mapState} defaultState={defaultMapState}>
          <FullscreenControl />
          <Polyline
            geometry={positions}
            options={{
              balloonCloseButton: false,
              strokeColor: "#000",
              strokeWidth: 4,
              strokeOpacity: 0.5,
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
};

export default YandexMap;
