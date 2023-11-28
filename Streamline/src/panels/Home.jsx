import "./Home.css";

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

const Home = ({ id, openModal, cityBtnText, mapState }) => {
  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={openModal} data-to="select">
            {cityBtnText}
          </PanelHeaderButton>
        }
      >
        Streamline
      </PanelHeader>
      <div className="main-map">
        <YandexMap mapState={mapState} />
      </div>
      <Group
        className="main-trail"
        header={<Header mode="secondary">Карта</Header>}
      >
        <Button stretched size="l" mode="secondary">
          Маршрут
        </Button>
      </Group>

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" data-to="persik">
            Show me the Persik, please
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

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
