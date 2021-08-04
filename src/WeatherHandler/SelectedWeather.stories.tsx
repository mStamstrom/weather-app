import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectedWeather from './SelectedWeather';

export default {
  title: 'SelectedWeather',
  component: SelectedWeather,
  argTypes: {

  }
} as ComponentMeta<typeof SelectedWeather>;

const Template: ComponentStory<typeof SelectedWeather> = (args) => <SelectedWeather {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  weather: {
    name: 'Uppsala',
    id: '1',
    main: { temp: 20, pressure: 100, humidity: 50},
    weather: [{main: '20'}],
    dt: 0,
    dt_txt: '',
    wind: { speed: 2, deg: 0 },}
};