import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NovaTarefa } from './pages/NovaTarefa';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import {TarefasStack} from './pages/TarefasStack';

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <BottomTab.Navigator>
          <BottomTab.Screen
            name={'Tarefas'}
            component={TarefasStack}
            options={{
              headerShown: false,
              title: 'Tarefas',
              tabBarIcon: ({ color, size, focused }) => (
                <FontAwesome name="tasks" size={size} color={color} />
              ),
            }}
          />
          <BottomTab.Screen
            name={'NovaTarefa'}
            component={NovaTarefa}
            options={{
              headerShown: false,
              title: 'Nova Tarefa',
              tabBarIcon: ({ color, size, focused }) => (
                <AntDesign name="pluscircleo" size={size} color={color} />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
