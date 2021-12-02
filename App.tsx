import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme, Icon } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import AddRecord from './screens/AddRecord';
import { Ionicons } from '@expo/vector-icons';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

// extend the theme
export const theme = extendTheme({ config });

export type TabRootParamList = {
  Home: undefined;
  AddRecord: undefined;
};
const TabRoot = createBottomTabNavigator<TabRootParamList>();

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <TabRoot.Navigator initialRouteName="Home">
          <TabRoot.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: (tabInfo) => (
                <Icon
                  as={<Ionicons name="home" />}
                  color={tabInfo.color}
                  size={tabInfo.size}
                />
              ),
            }}
          />
          <TabRoot.Screen
            name="AddRecord"
            component={AddRecord}
            options={{
              title: 'Add Record',
              tabBarIcon: (tabInfo) => (
                <Icon
                  as={<Ionicons name="add-circle" />}
                  color={tabInfo.color}
                  size={tabInfo.size}
                />
              ),
            }}
          />
        </TabRoot.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
