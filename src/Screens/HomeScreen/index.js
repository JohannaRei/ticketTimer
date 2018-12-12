import React, { Component } from 'react';
import { View, Button, Alert } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { TaskButton } from '../../common/components';
import randomColours from '../../constants/colors';
import { Navigation } from 'react-native-navigation';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTasks: [],
      colours: randomColours()
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
    }, 1000);
  };

  onTaskButtonPress = id => {
    console.log(id);
    this.startTaskTimer(id);
  };

  showButtonOptions = () => {
    console.log('PITKÄ PAINALLUS');
    Alert.alert('Task options', 'Do you want to edit or delete this task?', [
      { text: 'Edit', onPress: () => console.log('edit') },
      { text: 'Delete', onPress: () => console.log('delete') }
    ]);
  };

  openNewTaskModal = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'app.NewTaskModal',
              passProps: {
                onSubmit: this.addNewTask
              }
            }
          }
        ]
      }
    });
  };

  addNewTask = task => {
    const { currentTasks, colours } = this.state;
    if (currentTasks.length === 8) return;

    const taskNumber =
      currentTasks.length > 0
        ? currentTasks[currentTasks.length - 1].id + 1
        : 1;
    const newTasks = [
      ...currentTasks,
      {
        id: taskNumber,
        name: task.name,
        timeToday: 0,
        timeTotal: 0,
        times: [],
        colour: colours[taskNumber],
        deadline: task.deadline
      }
    ];
    this.setState({ currentTasks: newTasks });
  };

  renderButtonRows = rows => {
    const buttonRows = [];
    for (let i = 0; i < rows * 2; i += 2) {
      buttonRows.push(this.renderButtonRow([i, i + 1]));
    }
    return buttonRows;
  };

  renderButtonRow = tasks => {
    const { currentTasks } = this.state;
    return (
      <View key={tasks.toString()} style={{ flexDirection: 'row', flex: 1 }}>
        {tasks.map(
          task =>
            currentTasks[task] && (
              <TaskButton
                key={currentTasks[task].id}
                task={currentTasks[task]}
                onPress={this.onTaskButtonPress}
                buttonColor={currentTasks[task].color}
              />
            )
        )}
      </View>
    );
  };

  renderButtons = () => {
    const { currentTasks } = this.state;
    const taskLength = currentTasks.length;
    switch (true) {
      case taskLength <= 3:
        return currentTasks.map(task => (
          <TaskButton
            key={task.id}
            task={task}
            onPress={this.onTaskButtonPress}
            buttonColor={task.color}
          />
        ));
      case taskLength === 4:
        return this.renderButtonRows(2);
      case taskLength > 4:
        return this.renderButtonRows(3);
      default:
        return;
    }
  };

  render() {
    const { currentTasks } = this.state;
    return (
      <View style={styles.container}>
        {this.renderButtons()}
        {this.state.currentTasks.length < 6 && (
          <Button title="Add new" onPress={this.openNewTaskModal} />
        )}
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
