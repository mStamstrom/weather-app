import * as React from 'react';
import styled from 'styled-components';
import { City } from '../models/City';
import WeatherIconSelector from '../shared/WeatherIconSelector';

const ListLink = styled.a`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-bottom: 1px solid white;
  padding: 10px;
`;
const ItemText = styled.span`
  padding-top: 4px;
  padding-right: 5px;
`;
const RemoveButton = styled.button`
  color: red;
`;
const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface IProps {
  item: City;
  removeItem: any;
}
const CityListItem: React.SFC<IProps> = ({ item, removeItem }) => {
  const removeItemHandler = (e: any) => removeItem(item, e);
  return (
    <ListLink as="a" href={`city/${item.id}`}>
      <ItemText>
        {item.name}
      </ItemText>
      <WeatherContainer>
        <ItemText>
          {Math.round(item.main.temp)}
        </ItemText>
        <WeatherIconSelector icon={item.weather[0].main} />
        <RemoveButton type="button" onClick={removeItemHandler}>
          <i className="fa fa-2x fa-minus-circle" />
        </RemoveButton>
      </WeatherContainer>
    </ListLink>
  );
}

export default CityListItem;
