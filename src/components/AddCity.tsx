import * as React from 'react';
import './AddCity.css';

interface IProps {
  value: string;
  addCity: any;
  onChange: any;
}

const AddCity: React.SFC<IProps> = ({ value, addCity, onChange }) => (
  <div className="add-city">
    <span className="add-city__header">
      Lägg till stad
    </span>
    <div className="add-city-input">
      <div className="add-city-input-container">
        <input type="text" className="add-city-input-field__input" onChange={onChange} value={value} />
      </div>
      <button type="button" onClick={addCity}>
        <i className="fas fa-2x fa-plus-circle" />
      </button>
    </div>
  </div>
);

export default AddCity;
