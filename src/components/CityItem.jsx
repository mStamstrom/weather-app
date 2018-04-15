import React from 'react';
import PropTypes from 'prop-types';
import './CityItem.css';

const CityItem = ({ item, removeItem }) => (
  <div className="city-item">
    <span className="city-item__text">
      {item.name}
    </span>
    <div className="city-item--flex">
      <span className="city-item__text">
        {item.weather}
      </span>
      <button type="button" className="city-item__remove-button" onClick={() => removeItem(item)}>
        <i className="fa fa-2x   fa-minus-circle" />
      </button>
    </div>
  </div>
);

CityItem.propTypes = {
  item: PropTypes.shape({ name: PropTypes.string, weather: PropTypes.number }).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default CityItem;
