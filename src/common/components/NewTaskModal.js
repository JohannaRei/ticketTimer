import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import appStyles from '../appStyles';
import Input from './Input';

class NewTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      deadline: null
    };
  }

  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Add new task'
        },
        drawBehind: false,
        visible: true,
        animate: false
      }
    };
  }

  onChangeText = (text, value) => this.setState({ [value]: text });

  render() {
    return (
      <View style={[styles.container, styles.modal]}>
        <Input
          onChangeText={text => this.onChangeText(text, 'name')}
          title="Task name"
          value={this.state.name}
        />
        <Input
          onChangeText={text => this.onChangeText(text, 'deadline')}
          title="Deadline (optional)"
          value={this.state.deadline}
        />
        <Button
          title="Save"
          disabled={!this.state.name}
          onPress={() => {
            this.props.onSubmit(this.state);
            Navigation.dismissAllModals();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...appStyles,
  modal: {
    justifyContent: 'space-around'
  }
});

export default NewTaskModal;
