import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FormInputProps extends TextInputProps {
  isPassword?: boolean;
  label?: string;
  required?: boolean;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  isPassword = false,
  label,
  required,
  error,
  ...rest
}) => {
  const [secure, setSecure] = useState(isPassword);

  const toggleSecure = () => setSecure(prev => !prev);

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.asterisk}> *</Text>}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          error ? { borderColor: 'red' } : undefined,
        ]}
      >
        <TextInput
          {...rest}
          secureTextEntry={secure}
          style={styles.input}
          placeholderTextColor="#999"
        />
        {isPassword && (
          <TouchableOpacity onPress={toggleSecure}>
            <Icon
              name={secure ? 'visibility-off' : 'visibility'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  asterisk: {
    color: 'red',
  },
  inputContainer: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default FormInput;
