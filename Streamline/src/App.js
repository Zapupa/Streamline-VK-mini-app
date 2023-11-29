import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  ModalRoot,
  ModalPage,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import cities from "../src/resources/trails/cities.json";
import SelectModal from "./components/SelectModal/SelectModal";
import TrailModal from "./components/TrailModal/TrailModal";
import Home from "./panels/Home";
import gorBotTrail from "../src/resources/trails/gorodskoi-bor.gpx";
import mosPushTesTrail from "../src/resources/trails/moskva-pushchino-tesna-june-16-mmxviii.gpx";
import petLomTrail from "../src/resources/trails/saint-petersburg-peterhof-lomonosov.gpx";

const App = () => {
  let gpxParser = require("gpxparser");
  var gpx = new gpxParser();

  const defaultMapState = {
    center: [55.159901, 61.402547],
    zoom: 12,
  };

  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [activeModal, setActiveModal] = useState(null);
  const [cityBtnText, setCityBtnText] = useState("Город");
  const [mapState, setMapState] = useState(defaultMapState);
  const [positions, setPositions] = useState("");

  // let currentTrail = "";

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const cityChange = (e) => {
    setCityBtnText(e.currentTarget.dataset.name);
    switch (e.currentTarget.dataset.name) {
      case "Челябинск":
        setMapState(cities.chelyabinsk);
        break;
      case "Москва":
        setMapState(cities.moscow);
        break;
      case "Санкт-Петербург":
        setMapState(cities.saintpeter);
        break;
      default:
    }
    closeModal();
  };

  const trailChange = (e) => {
    let currentTrail = "";
    switch (e.currentTarget.dataset.name) {
      case "Городской бор":
        currentTrail = gorBotTrail;
        break;
      case "Москва - Пушкино - Тесна":
        currentTrail = mosPushTesTrail;
        break;
      case "Петергоф - ул. Ломоносова":
        currentTrail = petLomTrail;
        break;
      default:
    }
    componentDidMount(currentTrail);
    closeModal();
  };

  const componentDidMount = async (currentTrail) => {
    const response = await fetch(currentTrail, { metod: "POST" });
    const gpxDemo = await response.text();

    gpx.parse(gpxDemo);
    setPositions(gpx.tracks[0].points.map((p) => [p.lat, p.lon]));

    console.log(positions);
  };

  const openModal = (e) => {
    setActiveModal(e.currentTarget.dataset.to);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalPage id="select" dynamicContentHeight onClose={closeModal}>
        <SelectModal cityChange={cityChange} />
      </ModalPage>
      <ModalPage id="selectTrail" dynamicContentHeight onClose={closeModal}>
        <TrailModal trailChange={trailChange} />
      </ModalPage>
    </ModalRoot>
  );

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout} modal={modal}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home
                  id="home"
                  openModal={openModal}
                  cityBtnText={cityBtnText}
                  mapState={mapState}
                  positions={positions}
                />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
