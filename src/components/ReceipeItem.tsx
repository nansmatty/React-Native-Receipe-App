import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Receipe, ReceipeContext} from '../context/ReceipeContext';
import {AuthContext} from '../context/AuthContext';

interface ReceipeItemProps {
  receipe: Receipe;
  onPressReceipeItem: () => void;
  currentUser: string | null;
  onPressDeleteReceipe: () => void;
}

const ReceipeItem: React.FC<ReceipeItemProps> = ({
  receipe,
  onPressReceipeItem,
  currentUser,
  onPressDeleteReceipe,
}) => {
  const {userId} = useContext(AuthContext);
  const {deleteReceipe} = useContext(ReceipeContext);

  return (
    <TouchableOpacity style={styles.card} onPress={onPressReceipeItem}>
      <View style={styles.cardContent}>
        <Text style={[styles.text, {fontSize: 16}]} numberOfLines={1}>
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
      </View>
      {currentUser === receipe.createdBy && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => onPressDeleteReceipe()}>
          <Text
            style={[
              styles.text,
              {color: '#fff', marginBottom: 0, fontSize: 12},
            ]}>
            Delete
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 12,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  text: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  cardContent: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#9f1239',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ReceipeItem;
