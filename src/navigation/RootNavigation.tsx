import React, {useContext, useEffect} from 'react';
import HomeScreen from '../screens/HomeScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ReceipeDetailsScreen from '../screens/ReceipeDetailsScreen';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';

export type RootNavigationProps = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  'Receipe Details': {receipeId: string};
};

type NavigationProp = NativeStackNavigationProp<RootNavigationProps>;

const Stack = createNativeStackNavigator<RootNavigationProps>();

const RootNavigation: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {isAuthenticated, isLoading} = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    }
  }, [isAuthenticated, isLoading, navigation]);

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
        options={{headerShown: false}}
      />
      <Stack.Screen name="Receipe Details" component={ReceipeDetailsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
