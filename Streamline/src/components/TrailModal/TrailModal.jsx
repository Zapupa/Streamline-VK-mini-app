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
  { city: "Томск", name: "От Томска до Киревска" },
  { city: "Екатеринбург", name: "Северок - оз. Песчанное" },
  { city: "Казань", name: "От парка Горького до Голубых озер" },
  { city: "Москва", name: "По центру москвы" },
  { city: "Казань", name: "Казанский бор" }, //
  { city: "Томск", name: "Томск - Верхняя Елань" },
  { city: "Томск", name: "Томск - Воскресная гора" },
  { city: "Челябинск", name: "По городу" },
  { city: "Москва", name: "Москва - Новокосино и обратно" },
  { city: "Омск", name: "Омск до набережной" },
  { city: "Омск", name: "По центру Омска" },
  { city: "Казань", name: "В центр Казани" },
  { city: "Екатеринбург", name: "Екатеринбург - оз. Глухое" },
  { city: "Санкт-Петербург", name: "Санкт-Петербург по набережным" },
  { city: "Санкт-Петербург", name: "Орловский карьер" },
  { city: "Екатеринбург", name: "Екатеринбург - Ревун" },
];

let cock;

const TrailModal = ({ trailChange, currentCity }) => {
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
          trailsFiltered.map((trail) => {
            cock = { currentCity };
            if (trail.city != cock.currentCity && cock.currentCity != "Город") {
              return;
            }
            return (
              <Cell
                onClick={trailChange}
                data-name={trail.name}
                data-city={trail.city}
              >
                {trail.name}
              </Cell>
            );
          })}
        {trailsFiltered.length === 0 && <Footer>Ничего не найдено</Footer>}
      </Group>
    </Fragment>
  );
};

export default TrailModal;
