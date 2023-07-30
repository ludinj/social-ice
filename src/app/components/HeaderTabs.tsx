'use client';
import { Tab, Tabs, TabsHeader, Typography } from '@material-tailwind/react';
import React, { type FC, useState } from 'react';
// eslint-disable-next-line
interface HeaderTabsProps {}
// eslint-disable-next-line
const HeaderTabs: FC<HeaderTabsProps> = ({}) => {
  const [activeTab, setActiveTab] = useState('ParaTi');

  return (
    <div className="w-full bg-white opacity-90 sticky z-10 top-0 left-0 p-4 ">
      <Typography variant="h3">Inicio</Typography>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              'bg-transparent border-b-2 border-green-500    shadow-none rounded-none'
          }}
        >
          <Tab
            key={'ParaTi'}
            value={'ParaTi'}
            onClick={() => {
              setActiveTab('ParaTi');
            }}
            className={'font-semibold'}
            activeClassName="text-green-600"
          >
            Para ti
          </Tab>
          <Tab
            key={'Siguiendo'}
            value={'Siguiendo'}
            onClick={() => {
              setActiveTab('Siguiendo');
            }}
            className={'font-semibold'}
            activeClassName="text-green-600"
          >
            Siguiendo
          </Tab>
        </TabsHeader>
      </Tabs>
    </div>
  );
};

export default HeaderTabs;
