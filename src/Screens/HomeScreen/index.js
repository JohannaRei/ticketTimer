import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './HomeScreenStyles';
import { connect } from 'react-redux';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home screen</Text>
      </View>
    );
  }
}

/*const mapStateToProps = state => ({
  user: state.user,
  currentTasks: state.currentTasks
});

const mapDispatchToProps = dispatch => ({});*/

export default /*connect(
  mapStateToProps,
  mapDispatchToProps
)(*/ HomeScreen; //);
