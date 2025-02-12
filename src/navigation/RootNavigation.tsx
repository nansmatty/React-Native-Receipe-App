import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ReceipeDetailsScreen from '../screens/ReceipeDetailsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootNavigationProps = {
  // Props type definition
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  'Receipe Details': {receipeId: string};
};

const Stack = createNativeStackNavigator<RootNavigationProps>();

const RootNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen name="Receipe Details" component={ReceipeDetailsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
