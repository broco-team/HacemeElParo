import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { TodoScreenNavigator, PackScreenNavigator, ProfileScreenNavigator, SettingScreenNavigator } from './ScreenNavigator';

export default DrawerNavigator(
  {
    Todos: {
      screen: TodoScreenNavigator,
    },
    Packs: {
      screen: PackScreenNavigator,
    },
    Profile: {
      screen: ProfileScreenNavigator,
    },
    Settings: {
      screen: SettingScreenNavigator,
    },
  },
);

