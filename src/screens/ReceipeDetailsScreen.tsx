import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../navigation/RootNavigation';
import {Receipe, ReceipeContext} from '../context/ReceipeContext';
import {AuthContext} from '../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ReceipeDetailsScreenRouteProps = RouteProp<
  RootNavigationProps,
  'Receipe Details'
>;

type ReceipeDetailsNavigationProps = NativeStackNavigationProp<
  RootNavigationProps,
  'Receipe Details'
>;

interface ReceipeDetailsScreenProps {
  route: ReceipeDetailsScreenRouteProps;
  navigation: ReceipeDetailsNavigationProps;
}

const ReceipeDetailsScreen: React.FC<ReceipeDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {receipeId} = route.params;
  const [receipe, setReceipe] = useState<Receipe | null>(null);

  const {getReceipeByID, deleteReceipe} = useContext(ReceipeContext);
  const {userId} = useContext(AuthContext);

  const fetchReceipe = async () => {
    const receipe = await getReceipeByID(receipeId);
    setReceipe(receipe);
  };

  useEffect(() => {
    fetchReceipe();
  }, [receipeId]);

  if (!receipe) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  const handleDeleteReceipe = async (receipeId: string) => {
    await deleteReceipe(receipeId);
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.sectionContainer}>
      <Text style={[styles.text, {fontSize: 20}]} numberOfLines={1}>
        {receipe.title}
      </Text>
      <Text style={[styles.text]} numberOfLines={2}>
        {receipe.description}
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: '#a21caf',
          },
        ]}>
        Difficulty: {receipe.difficulty}
      </Text>

      {userId === receipe.createdBy && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleDeleteReceipe(receipe._id)}>
          <Text
            style={[
              styles.text,
              {color: '#fff', marginBottom: 0, fontSize: 12},
            ]}>
            Delete
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 15,
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#111827',
  },
  btn: {
    backgroundColor: '#9f1239',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ReceipeDetailsScreen;
