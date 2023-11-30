import {
  Group,
  Cell,
  PanelHeader,
  PanelHeaderButton,
  Search,
  Footer,
} from "@vkontakte/vkui";
import { useState, useEffect, filter, Fragment } from "react";

const trails = [
  { city: "Челябинск", name: "Городской бор" },
  { city: "Москва", name: "Москва - Пушкино - Тесна" },
  {
    city: "Санкт-Петербург",
    name: "Петергоф - ул. Ломоносова",
  },
  { city: "Омск", name: "От Омска до Киревска" },
  { city: "Екатеринбург", name: "Северок - оз. Песчанное" },
  { city: "Казань", name: "От парка Горького до Голубых озер" },
  { city: "Москва", name: "По центру москвы" },
  { city: "Челябинск", name: "Вокруг шершней" },
];

const TrailModal = ({ trailChange }) => {
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const trailsFiltered = trails.filter(
    ({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1
  );
  return (
    <Fragment>
      <PanelHeader>Выбор маршрута</PanelHeader>
      <Group>
        <Search value={search} onChange={onChange} after={null} />
        {trailsFiltered.length > 0 &&
          trailsFiltered.map((trail) => (
            <Cell
              onClick={trailChange}
              data-name={trail.name}
              data-city={trail.city}
            >
              {trail.name}
            </Cell>
          ))}
        {trailsFiltered.length === 0 && <Footer>Ничего не найдено</Footer>}
      </Group>
    </Fragment>
  );
};

export default TrailModal;
