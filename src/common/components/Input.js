import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ title, onChangeText, value }) => (
  <View style={styles.row}>
    <Text>{title}</Text>
    <TextInput style={styles.input} onChangeText={onChangeText} value={value} />
  </View>
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'red',
    height: 20
  },
  row: {
    width: '80%'
  }
});

export default Input;
