import React, { Component } from 'react';
import { View, Button, Alert } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { TaskButton } from '../../common/components';
import randomColours from '../../constants/colors';
import { Navigation } from 'react-native-navigation';
import i18n from '../../locales';
import uuid from 'react-native-uuid';
import { updateTasks, fetchCurrentTasks } from '../../services/Tasks';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      currentTask: null,
      colours: randomColours()
    };
    this.timer;
  }

  static options(passProps) {
    return {
      topBar: {
        title: {
          text: i18n.t('home.title')
        },
        drawBehind: false,
        visible: true,
        animate: false
      }
    };
  }

  componentDidMount() {
    this.fetchTasks();
    this.checkTaskDates();
  }

  fetchTasks = async () => {
    return await fetchCurrentTasks()
      .then(res => {
        const tasks = JSON.parse(res);
        this.setState({ tasks });
        return tasks;
      })
      .catch(e => console.log(e));
  };

  checkTaskDates = () => {
    const today = new Date();
    this.setState(state => {
      const tasks = this.state.tasks.map(task => {
        const sameDay = this.checkDateEquality(task.lastLogged, today);
        console.log(sameDay);
        return !sameDay
          ? {
              ...task,
              timeToday: 0,
              lastLogged: today
            }
          : task;
      });
      return { tasks };
    });
  };

  checkDateEquality = (date1, date2) => {
    const sameYear = date1.getYear() === date2.getYear();
    const sameMonth = date1.getMonth() === date2.getMonth();
    const sameDay = date1.getDay() === date2.getDay();
    return sameYear && sameMonth && sameDay;
  };

  removeTask = id => {
    Alert.alert(
      i18n.t('home.task.delete_alert.title'),
      i18n.t('home.task.delete_alert.message'),
      [
        {
          text: i18n.t('home.task.cancel'),
          onPress: () => {}
        },
        {
          text: i18n.t('home.task.delete'),
          onPress: () =>
            this.setState({
              tasks: this.state.tasks.filter(task => task.id !== id)
            }),
          style: 'destructive'
        }
      ]
    );
  };

  onTaskButtonPress = id => {
    const { tasks, currentTask } = this.state;

    if (!currentTask || currentTask.id !== id) {
      const selected = tasks.find(task => task.id === id);
      this.setState({ currentTask: selected });

      this.timer = setInterval(() => {
        this.setState(state => {
          const tasks = state.tasks.map(task => {
            return task.id === id
              ? {
                  ...task,
                  timeToday: task.timeToday + 1,
                  timeTotal: task.timeToday + 1
                }
              : task;
          });
          return { tasks };
        });
      }, 1000);
    } else {
      clearInterval(this.timer);
      updateTasks(this.state.tasks);
      this.setState({ currentTask: null });
    }
  };

  showButtonOptions = () => {
    console.log('button options');
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
    const { tasks, colours } = this.state;
    if (tasks.length === 8) return;

    const newTasks = [
      ...tasks,
      {
        id: uuid.v4(),
        name: task.name,
        timeToday: 0,
        timeTotal: 0,
        colour: colours[tasks.length],
        deadline: task.deadline,
        lastLogged: new Date('2018-11-11')
      }
    ];
    this.setState({ tasks: newTasks });
    updateTasks(newTasks);
  };

  renderButtonRows = rows => {
    const buttonRows = [];
    for (let i = 0; i < rows * 2; i += 2) {
      buttonRows.push(this.renderButtonRow([i, i + 1]));
    }
    return buttonRows;
  };

  renderButtonRow = taskArr => {
    const { tasks } = this.state;
    return (
      <View key={taskArr.toString()} style={{ flexDirection: 'row', flex: 1 }}>
        {taskArr.map(
          task =>
            tasks[task] && (
              <TaskButton
                key={tasks[task].id}
                task={tasks[task]}
                onPress={this.onTaskButtonPress}
                buttonColor={tasks[task].color}
                onDelete={this.removeTask}
              />
            )
        )}
      </View>
    );
  };

  renderButtons = () => {
    const { tasks } = this.state;
    const taskLength = tasks.length;
    switch (true) {
      case taskLength <= 3:
        return tasks.map(task => (
          <TaskButton
            key={task.id}
            task={task}
            onPress={this.onTaskButtonPress}
            buttonColor={task.color}
            onDelete={this.removeTask}
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
    const { tasks } = this.state;

    return (
      <View style={styles.container}>
        {this.renderButtons()}
        {tasks.length < 6 && (
          <Button title="Add new" onPress={this.openNewTaskModal} />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
