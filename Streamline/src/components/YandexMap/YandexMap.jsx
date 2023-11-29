import React, { useState, useEffect } from "react";
import "./YandexMap.css";
import {
  YMaps,
  Map,
  FullscreenControl,
  GeoObject,
  Polyline,
  Button,
} from "@pbe/react-yandex-maps";

const API_KEY = "8ad44015-6f2d-4403-92cb-4daa45aff76c";

const defaultMapState = {
  center: [55.159901, 61.402547],
  zoom: 12,
};

const YandexMap = ({ mapState, positions }) => {
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
