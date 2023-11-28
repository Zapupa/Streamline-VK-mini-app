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

import SelectModal from "./components/SelectModal/SelectModal";
import Home from "./panels/Home";

const App = () => {
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
    setMapState(e.currentTarget.dataset.state);
    console.log(mapState);
    closeModal();
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
