import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import styles from './styles';
import { getUser, setUser } from '../../services/User';
import { VictoryArea, VictoryStack } from 'victory-native';

const screenWidth = Dimensions.get('screen').width;

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
    console.log(screenWidth);
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <Text>{user.name}</Text>
        <VictoryStack padding={0}>
          <VictoryArea
            style={{ data: { fill: '#51c0db' } }}
            data={[{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 2 }]}
          />
          <VictoryArea
            style={{ data: { fill: '#a3d96a' } }}
            data={[{ x: 1, y: 0 }, { x: 2, y: 6 }, { x: 3, y: 12 }]}
          />
        </VictoryStack>
      </View>
    );
  }
}

export default ProfileScreen;
