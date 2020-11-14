import React from 'react';
import { Button } from '.';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args}>Click here</Button>;

export const Primary = Template.bind({});

Primary.args = {
  // eslint-disable-next-line
  handleClick: () => console.log('clicked'),
};
