import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CountryList from '../src/components/CountryList';
import CountryTable from '../src/components/CountryTable';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{
        headerBackTitleVisible: false,
      }} >
        <Stack.Screen name="CountryList" component={CountryList} options={{
          headerTitle: '',
        }} />
        <Stack.Screen name="CountryTable" component={CountryTable} options={{
          headerTitle: 'Data'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}