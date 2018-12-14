import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { getUser, setUser } from '../../services/User';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

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

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    return await getUser()
      .then(res => {
        const user = JSON.parse(res);
        this.setState({ user });
      })
      .catch(e => console.log(e));
  };

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <Text>{user.name}</Text>
      </View>
    );
  }
}

export default ProfileScreen;
