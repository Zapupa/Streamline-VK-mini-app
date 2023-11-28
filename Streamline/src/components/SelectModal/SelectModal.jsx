import {
  Group,
  Cell,
  PanelHeader,
  PanelHeaderButton,
  Search,
  Footer,
} from "@vkontakte/vkui";
import { useState, useEffect, filter, Fragment } from "react";

const cities = [
  { state: { center: [55.159901, 61.402547], zoom: 12 }, name: "Челябинск" },
  { state: [55.75404, 37.614953], zoom: 12, name: "Москва" },
  {
    center: [59.936542, 30.313521],
    zoom: 12,
    name: "Санкт-Петербург",
  },
];

const SelectModal = ({ cityChange }) => {
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const citiesFiltered = cities.filter(
    ({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1
  );
  return (
    <Fragment>
      <PanelHeader>Выбор города</PanelHeader>
      <Group>
        <Search value={search} onChange={onChange} after={null} />
        {citiesFiltered.length > 0 &&
          citiesFiltered.map((city) => (
            <Cell
              onClick={cityChange}
              data-name={city.name}
              data-state={city.state}
            >
              {city.name}
            </Cell>
          ))}
        {citiesFiltered.length === 0 && <Footer>Ничего не найдено</Footer>}
      </Group>
    </Fragment>
  );
};

export default SelectModal;
