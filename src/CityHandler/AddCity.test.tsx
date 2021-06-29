import * as React from 'react';
import AddCity from './AddCity';
import { render, fireEvent, screen } from '@testing-library/react'

describe('AddCity', () =>  {
  it('user should be able to add new city to list', () => {
    const addCityMockFn = jest.fn();
    render(<AddCity addCity={addCityMockFn} />);

    fireEvent.change(screen.getByRole('textbox'), { target: {value: 'testing'}});
    fireEvent.click(screen.getByRole('button'));

    expect(addCityMockFn).toHaveBeenCalledWith('testing')
  });
});
