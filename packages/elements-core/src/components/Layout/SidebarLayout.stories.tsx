import { SidebarLayout } from './SidebarLayout'
import {
  SidebarLayoutProps
} from './SidebarLayout'
import { Meta, Story } from '@storybook/react';
import * as React from 'react';

export default {
  title: 'Internal/SidebarLayout',
  component: SidebarLayout,
} as Meta<SidebarLayoutProps>;

const Template: Story<SidebarLayoutProps> = args => <SidebarLayout {...args} />;

export const WithParameters = Template.bind({});
WithParameters.args = {
  children: (<div>{Array.from({ length: 4_500 }, v => ' x ')}</div>),
};
WithParameters.storyName = 'Sidebar Layout';
