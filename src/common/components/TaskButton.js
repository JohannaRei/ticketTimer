import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TaskButton = ({ task, onPress }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: task.colour }]}
    onPress={() => onPress(task.id)}
  >
    <Text style={styles.title}>{task.name}</Text>
    <Text>{`Time used today: ${task.timeToday}`}</Text>
    <Text>{`Time used in total: ${task.timeTotal}`}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default TaskButton;
