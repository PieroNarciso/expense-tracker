import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeBaseProvider,
  extendTheme,
} from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

// extend the theme
export const theme = extendTheme({ config });

export type TabRootParamList = {
  Home: undefined;
};
const TabRoot = createBottomTabNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <TabRoot.Navigator initialRouteName="Home">
          <TabRoot.Screen name="Home" component={Home} />
        </TabRoot.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
