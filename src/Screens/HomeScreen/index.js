import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { TaskButton } from '../../common/components';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTasks: [
        {
          id: 1,
          name: 'Task 1',
          timeToday: 0,
          timeTotal: 0,
          times: [],
          color: 'lightblue'
        },
        {
          id: 2,
          name: 'Task 2',
          timeToday: 0,
          timeTotal: 0,
          times: [],
          color: 'salmon'
        }
      ]
    };
  }

  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
        drawBehind: false,
        visible: true,
        animate: false
      }
    };
  }

  startTaskTimer = id => {
    let time = 0;
    setInterval(() => {
      time += 1;
      console.log(time);
    }, 1000);
  };

  onTaskButtonPress = id => {
    console.log(id);
    this.startTaskTimer(id);
  };

  createNewTask = () => {};

  render() {
    const { currentTasks } = this.state;
    return (
      <View style={styles.container}>
        {currentTasks.map(task => (
          <TaskButton
            key={task.id}
            task={task}
            onPress={this.onTaskButtonPress}
            buttonColor={task.color}
          />
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  currentTasks: state.currentTasks
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
