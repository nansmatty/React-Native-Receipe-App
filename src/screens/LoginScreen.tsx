import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigationProps} from '../navigation/RootNavigation';
import {AuthContext} from '../context/AuthContext';

type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootNavigationProps,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProps;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  const resetState = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = async () => {
    if (email && password) {
      const success = await signIn(email, password);
      if (success) {
        resetState();
        navigation.navigate('Home');
      } else {
        Alert.alert('Sign In Failed', 'Invalid Credentials.');
      }
    } else {
      Alert.alert('Invalid input', 'Signup failed. Please fill all the fields');
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {marginBottom: 20}]}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.inputBox}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.inputBox}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.signUpBtn} onPress={handleLogin}>
        <Text style={[styles.sectionTitle, {color: '#fff', fontSize: 14}]}>
          Login Now
        </Text>
      </TouchableOpacity>
      <View style={styles.loginText}>
        <Text style={[styles.sectionTitle, {color: '#111827', fontSize: 14}]}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text
            style={[
              styles.sectionTitle,
              {color: '#111827', fontSize: 14, textDecorationLine: 'underline'},
            ]}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={styles.loginText}>
          <Text style={[styles.sectionTitle, {color: '#111827', fontSize: 14}]}>
            Already have an account? Login
          </Text>
        </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.3,
  },
  inputBox: {
    width: '100%',
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
  signUpBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  loginText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
  },
});
export default LoginScreen;
