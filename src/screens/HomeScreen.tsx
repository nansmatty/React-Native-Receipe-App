import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigationProps} from '../navigation/RootNavigation';

type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootNavigationProps,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {signOut} = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          await signOut();
          navigation.navigate('Login');
        },
      },
    ]);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;
