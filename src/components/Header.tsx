import * as React from 'react';
import './Header.css'

const baseUrl = process.env.PUBLIC_URL;

interface IProps {
  name: string;
}
const Header: React.SFC<IProps> = ({ name }) => (
  <header className="App-header header">
    <a href={`${baseUrl}/list`} className="App-menu">
      <span className="fas fa-list" />
    </a>
    <h1 className="App-title">{name}</h1>
  </header>
  
);

export default Header;
