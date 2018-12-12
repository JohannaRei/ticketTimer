import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';

class NewTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      deadline: ''
    };
  }

  onChangeName = name => this.setState({ name });

  render() {
    return (
      <View>
        <Text>Task name:</Text>
        <TextInput onChangeText={this.onChangeName} value={this.state.name} />
        <Button
          title="Save"
          onPress={() => {
            this.props.onSubmit(this.state);
            Navigation.dismissAllModals();
          }}
        />
      </View>
    );
  }
}

export default NewTaskModal;
