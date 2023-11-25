import React, { useState, useEffect } from "react";
import "./YandexMap.css";
import {
  YMaps,
  Map,
  FullscreenControl,
  GeoObject,
} from "@pbe/react-yandex-maps";

const API_KEY = "8ad44015-6f2d-4403-92cb-4daa45aff76c";

const defaultMapState = {
  center: [55.159901, 61.402547],
  zoom: 12,
};

const mapState = {
  center: [55.159901, 61.402547],
  zoom: 12,
};

const YandexMap = () => (
  <div>
    <YMaps
      query={{
        apikey: API_KEY,
      }}
    >
      <Map className="map" state={mapState} defaultState={defaultMapState}>
        <FullscreenControl />
      </Map>
    </YMaps>
  </div>
);

export default YandexMap;
