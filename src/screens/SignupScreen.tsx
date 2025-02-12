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

type SignupScreenNavigationProps = NativeStackNavigationProp<
  RootNavigationProps,
  'Signup'
>;

interface SignupScreenProps {
  navigation: SignupScreenNavigationProps;
}

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signUp} = useContext(AuthContext);

  const resetState = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSignup = async () => {
    if (name && email && password) {
      const success = await signUp(name, email, password);
      if (success) {
        resetState();
        Alert.alert('Success', 'Account created successfully, Please login.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Sign Up Failed', 'Please try with different email.');
      }
    } else {
      Alert.alert('Invalid input', 'Signup failed. Please fill all the fields');
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {marginBottom: 20}]}>Sign Up</Text>
      <TextInput
        placeholder="Name"
        style={styles.inputBox}
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
      />
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
      <TouchableOpacity style={styles.signUpBtn} onPress={handleSignup}>
        <Text style={[styles.sectionTitle, {color: '#fff', fontSize: 14}]}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <View style={styles.loginText}>
        <Text style={[styles.sectionTitle, {color: '#111827', fontSize: 14}]}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={[
              styles.sectionTitle,
              {color: '#111827', fontSize: 14, textDecorationLine: 'underline'},
            ]}>
            Login
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

export default SignupScreen;
