import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigationProps} from '../navigation/RootNavigation';
import CreateReceipeForm from '../components/CreateReceipeForm';
import {Receipe, ReceipeContext} from '../context/ReceipeContext';
import ReceipeItem from '../components/ReceipeItem';

type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootNavigationProps,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {signOut, userId} = useContext(AuthContext);
  const {createReceipe, getReceipes, deleteReceipe, receipes} =
    useContext(ReceipeContext);

  useEffect(() => {
    getReceipes();
  }, []);

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

  const handleOnCreateBtnSubmit = async (
    newReceipe: Omit<Receipe, '_id' | 'createdBy' | 'createdAt'>,
  ) => {
    await createReceipe(newReceipe);
    setShowModal(false);
  };

  const filterReceipes = receipes.filter(receipeItem =>
    receipeItem.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Receipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setShowModal(true)}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for creating new receipe */}

      <FlatList
        data={filterReceipes}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ReceipeItem
            receipe={item}
            currentUser={userId}
            onPressDeleteReceipe={() => deleteReceipe(item._id)}
            onPressReceipeItem={() =>
              navigation.navigate('Receipe Details', {receipeId: item._id})
            }
          />
        )}
      />

      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <CreateReceipeForm
          onCancel={() => setShowModal(false)}
          onSubmit={handleOnCreateBtnSubmit}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#111827',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  iconBtn: {
    width: 37,
    height: 37,
    borderRadius: 22.5,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
  logoutBtnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  logoutBtn: {
    padding: 10,
    // backgroundColor: '#9f1239',
    backgroundColor: '#111827',
    borderRadius: 24,
    marginLeft: 12,
  },
});

export default HomeScreen;
