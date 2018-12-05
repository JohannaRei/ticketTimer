import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class ProfileScreen extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Profile'
        },
        drawBehind: false,
        visible: true,
        animate: false
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile screen</Text>
      </View>
    );
  }
}

export default ProfileScreen;
