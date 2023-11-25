import "./Home.css";

import React from "react";
import PropTypes from "prop-types";

import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
} from "@vkontakte/vkui";

import YandexMap from "../components/YandexMap/YandexMap";

const Home = ({ id, go, fetchedUser }) => (
  <Panel id={id}>
    <PanelHeader before={<PanelHeaderButton>Город</PanelHeaderButton>}>
      Streamline
    </PanelHeader>
    <Group className="main" header={<Header mode="secondary">Карта</Header>}>
      <div className="main-map">
        <Div className="map">
          <YandexMap />
        </Div>
        <Div>Маршруты тут</Div>
      </div>
    </Group>

    <Group header={<Header mode="secondary">Navigation Example</Header>}>
      <Div>
        <Button
          stretched
          size="l"
          mode="secondary"
          onClick={go}
          data-to="persik"
        >
          Show me the Persik, please
        </Button>
      </Div>
    </Group>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
