import React from 'react';
import PropTypes from 'prop-types';
import './AddCity.css';

const AddCity = ({ value, addCity, onChange }) => (
  <div className="add-city">
    <span>
      Lägg till stad
    </span>
    <div>
      <input type="text" onChange={event => onChange(event)} value={value} />
      <button type="button" onClick={addCity}>
        <i className="fas fa-2x fa-plus-circle" />
      </button>
    </div>
  </div>
);

AddCity.defaultProps = {
  value: '',
};

AddCity.propTypes = {
  addCity: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default AddCity;
