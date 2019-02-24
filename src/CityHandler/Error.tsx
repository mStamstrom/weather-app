import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import './Error.css';

interface IProps {
  errorString: string,
}

const Error: React.SFC<IProps> = ({ errorString }) => (
  <div className="error">
    <FontAwesomeIcon icon="exclamation-circle" />
    <span className="error-text">{errorString}</span>
  </div>
)

export default Error;
