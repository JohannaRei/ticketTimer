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
import { updateUser } from '../../services/User';

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
    updateUser({
      name: 'Johanna'
    });
    this.fetchTasks()
      .then(res => res > 0 && this.checkTaskDates())
      .catch(e => console.log(e));
  }

  fetchTasks = async () => {
    return await new Promise((resolve, reject) => {
      fetchCurrentTasks()
        .then(res => {
          const tasks = JSON.parse(res);
          this.setState({ tasks });
          return resolve(tasks.length);
        })
        .catch(e => reject());
    });
  };

  checkTaskDates = () => {
    const today = new Date();
    console.log(today);
    this.setState(state => {
      const tasks = this.state.tasks.map(task => {
        const sameDay = this.checkDateEquality(task.lastLogged, today);
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
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const sameYear = d1.getFullYear() === d2.getFullYear();
    const sameMonth = d1.getMonth() === d2.getMonth();
    const sameDay = d1.getDay() === d2.getDay();
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
          onPress: () => {
            const tasks = this.state.tasks.filter(task => task.id !== id);
            updateTasks(tasks);
            this.setState({ tasks });
          },
          style: 'destructive'
        }
      ]
    );
  };

  unselectTask = id => {
    clearInterval(this.timer);
    updateTasks(this.state.tasks);
    this.setState({ currentTask: null });
  };

  onTaskButtonPress = id => {
    const { tasks, currentTask } = this.state;
    this.unselectTask(id);

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
        lastLogged: new Date()
      }
    ];
    updateTasks(newTasks);
    this.setState({ tasks: newTasks });
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
