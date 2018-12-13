import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Button, View } from 'react-native';
import i18n from '../../locales';

class TaskButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditButtons: false
    };
  }

  formatTime = sec => {
    const h = [
      Math.floor(sec / 3600),
      Math.floor((sec % 3600) / 60),
      Math.floor((sec % 3600) % 60)
    ];
    const times = h.map(time => {
      return time < 10 ? `0${time}` : time;
    });

    return `${times[0]}:${times[1]}:${times[2]}`;
  };

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
        <Text>{i18n.t('home.task.time_today')}</Text>
        <Text>{this.formatTime(task.timeToday)}</Text>
        <Text>{i18n.t('home.task.time_total')}</Text>
        <Text>{this.formatTime(task.timeTotal)}</Text>
        {task.deadline && (
          <Text>{`${i18n.t('home.task.deadline')} ${task.deadline}`}</Text>
        )}
        {showEditButtons && (
          <View style={styles.editButtons}>
            <Button
              title={Int8Array.t('home.task.edit')}
              onPress={() => console.log('edit')}
            />
            <Button
              title={i18n.t('home.task.delete')}
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
