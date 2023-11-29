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
  { city: "Челябинск", name: "Челябинск" },
  { city: "Москва", name: "Москва" },
  {
    city: "Санкт-Петербург",
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
            <Cell onClick={cityChange} data-city={city.city}>
              {city.name}
            </Cell>
          ))}
        {citiesFiltered.length === 0 && <Footer>Ничего не найдено</Footer>}
      </Group>
    </Fragment>
  );
};

export default SelectModal;
