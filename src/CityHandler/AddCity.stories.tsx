import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddCity from './AddCity';

export default {
  title: 'AddCity',
  component: AddCity,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'lightblue', maxWidth: 400 }}>
        {Story()}
      </div>
    ),
  ],
  argTypes: {}
} as ComponentMeta<typeof AddCity>;

const Template: ComponentStory<typeof AddCity> = (args) => <AddCity {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};