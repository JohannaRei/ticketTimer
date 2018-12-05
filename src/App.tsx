import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface Props {
  username: string;
}

interface State {
  currentTask: Object;
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentTask: {}
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Tervetuloa</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
