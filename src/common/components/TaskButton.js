import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Button, View } from 'react-native';

class TaskButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditButtons: false
    };
  }

  render() {
    const { task, onPress } = this.props;
    const { showEditButtons } = this.state;
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: task.colour }]}
        onPress={() => onPress(task.id)}
        onLongPress={() => this.setState({ showEditButtons: !showEditButtons })}
      >
        <Text style={styles.title}>{task.name}</Text>
        <Text>{`Time used today: ${task.timeToday}`}</Text>
        <Text>{`Time used in total: ${task.timeTotal}`}</Text>
        {task.deadline && <Text>{`Deadline: ${task.deadline}`}</Text>}
        {showEditButtons && (
          <View style={styles.editButtons}>
            <Button title="Edit" onPress={() => console.log('edit')} />
            <Button
              title="Delete"
              color="red"
              onPress={() => console.log('delete')}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

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
  },
  editButtons: {
    padding: 20,
    flexDirection: 'row'
  }
});

export default TaskButton;
