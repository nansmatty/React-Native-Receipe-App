import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Receipe} from '../context/ReceipeContext';

interface CreateReceipeFormProps {
  onSubmit: (
    receipe: Omit<Receipe, '_id' | 'createdBy' | 'createdAt'>,
  ) => Promise<void>;
  onCancel: () => void;
}

const CreateReceipeForm: React.FC<CreateReceipeFormProps> = ({
  onCancel,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(
    'Easy',
  );

  const resetState = () => {
    setTitle('');
    setDescription('');
    setDifficulty('Easy');
  };

  const handleCreateReceipe = async () => {
    if (title && description) {
      onSubmit({title, description, difficulty});
      resetState();
    } else {
      Alert.alert(
        'Invalid input',
        'Receipe create failed. Please fill all the fields',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle, {fontSize: 20, marginBottom: 15}]}>
        Create Receipe Form
      </Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Receipe Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.inputBox, styles.textArea]}
        placeholder="Receipe Description"
        value={description}
        onChangeText={itemValue =>
          setDescription(itemValue as 'Easy' | 'Medium' | 'Hard')
        }
      />
      <View style={styles.pickerContainer}>
        <Text style={[styles.textStyle, {marginRight: 20, fontSize: 14}]}>
          Difficulty
        </Text>
        <Picker
          style={styles.picker}
          selectedValue={difficulty}
          onValueChange={setDifficulty}>
          <Picker.Item label="Easy" value="Easy" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Hard" value="Hard" />
        </Picker>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.btn]} onPress={handleCreateReceipe}>
          <Text style={[styles.textStyle, {color: '#fff', fontSize: 12}]}>
            Create Receipe
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#9f1239'}]}
          onPress={onCancel}>
          <Text style={[styles.textStyle, {color: '#fff', fontSize: 12}]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  inputBox: {
    width: '100%',
    height: 50,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 70,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#111827',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default CreateReceipeForm;
