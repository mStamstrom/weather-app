import * as React from 'react';
import './AddCity.css';

interface IProps {
  addCity: any;
}
interface IState {
  text: string;
}
class AddCity extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state ={
      text: '',
    } 
  }

  onChange = (e: any) => {
    this.setState({text: e.target.value});
  }

  addCity = () => {
    if (this.state.text) {
      this.props.addCity(this.state.text);
    }
  }

  render() {
    return (
      <form onSubmit={this.addCity} className="add-city">
        <span className="add-city__header">
          Lägg till stad
        </span>
        <div className="add-city-input">
          <div className="add-city-input-container">
            <input type="text" className="add-city-input-field__input" onChange={this.onChange} value={this.state.text} />}
          </div>
          <button type="submit">
            <i className="fas fa-2x fa-plus-circle" />
          </button>
        </div>
      </form>
    );
  }
}

export default AddCity;
