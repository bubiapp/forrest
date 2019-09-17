import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Animated,
  PanResponder,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView from 'react-native-maps';

import CardProfile from '../../components/cardProfile';
import CardCoach from '../../components/cardCoach';
import CardHistory from '../../components/cardHistory';

const windowWidth = Dimensions.get('window').width;

import styles from './home.styles';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      pulse: new Animated.Value(0),
      carousel: false,
      marker: {
        latitude: 1.277936,
        longitude: 103.852667,
      },
      region: {
        latitude: 1.277936,
        longitude: 103.852667,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
    };
  }

  isDropZone(gesture) {
    return gesture.moveY > 0 && gesture.moveY < 350;
  }

  componentWillMount() {
    this.mover = Animated.event([null, { dy: this.state.pan.y }]);
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => {
        return true;
      },
      onMoveShouldSetPanResponderCapture: () => {
        if (!this.state.carousel) {
          return true;
        }
        return false;
      },

      onPanResponderGrant: (e, gestureState) => {
        if (!this.state.carousel) {
          this.state.pan.setOffset({
            x: this.state.pan.x._value,
            y: this.state.pan.y._value,
          });
          this.state.pan.setValue({ x: 0, y: 0 });
        }
      },
      onPanResponderMove: (e, gesture) => {
        if (this.state.carousel) {
          return;
        }
        return this.mover(e, gesture);
      },
      onPanResponderRelease: (e, gesture) => {
        // Set the initial value to the current state
        if (this.isDropZone(gesture)) {
          Animated.spring(this.state.pan, { toValue: { x: 0, y: -280 } }).start(
            () => {
              this.state.pan.flattenOffset();
            },
          );
          this.setState({
            carousel: true,
          });
        } else {
          Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
          this.setState({
            carousel: false,
          });
        }
      },
    });
    this._panResponder2 = PanResponder.create({
      onMoveShouldSetResponderCapture: () => {
        return true;
      },
      onMoveShouldSetPanResponderCapture: () => {
        return true;
      },

      // Initially, set the value of x and y to 0 (the center of the screen)
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setValue({ x: 0, y: -280 });
      },

      onPanResponderMove: (e, gesture) => {
        if (this.state.carousel) {
          return;
        }
        return this.mover(e, gesture);
      },

      onPanResponderRelease: (e, gesture) => {
        if (!this.isDropZone(gesture)) {
          Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
          this.setState({
            carousel: false,
          });
        }
      },
    });
  }
  componentDidMount() {
    setInterval(() => {
      Animated.sequence([
        Animated.spring(this.state.pulse, { toValue: 1, friction: 1 }),
        Animated.spring(this.state.pulse, { toValue: 0.8 }),
      ]).start();
    }, 2000);
  }
  onRegionChange = region => {
    this.setState({ region });
  };
  onBegin = () => {
    this.props.navigation.navigate('BeginRun');
  };
  onHistory = () => {
    this.props.navigation.navigate('History');
  };
  render() {
    let { pan, scale } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];
    console.log('Platform', Platform.OS);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <MapView
          style={styles.mapView}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          <MapView.Marker coordinate={this.state.marker} title={'My Location'}>
            <Animated.View
              style={{
                position: 'absolute',
                top: -20,
                left: -20,
                width: 40,
                height: 40,
                backgroundColor: 'rgba(98,186,85,0.4)',
                borderRadius: 20,
                transform: [{ scale: this.state.pulse }],
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                top: -40,
                left: -40,
                width: 80,
                height: 80,
                backgroundColor: 'rgba(98,186,85,0.2)',
                borderRadius: 40,
                transform: [{ scale: this.state.pulse }],
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                top: -10,
                left: -10,
                width: 20,
                height: 20,
                backgroundColor: 'rgba(98,186,85,1)',
                borderColor: '#fff',
                borderWidth: 2,
                borderRadius: 10,
                transform: [{ scale: this.state.pulse }],
              }}
            />
          </MapView.Marker>
        </MapView>
        <View style={styles.toolbar}>
          <LinearGradient
            colors={[
              'rgba(255,255,255,1)',
              'rgba(255,255,255,0.8)',
              'rgba(255,255,255,0)',
            ]}
            style={{
              height: 50,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          />
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              source={require('../../images/left-icon.png')}
              style={styles.logoicon}
            />
          </View>
          <View
            style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              source={require('../../images/logonike.png')}
              style={styles.logosmall}
            />
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              source={require('../../images/right-icon.png')}
              style={styles.logoicon}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Animated.View
            style={{
              transform: [
                { translateX },
                { translateY },
                { rotate: '0deg' },
                { scale },
              ],
              marginBottom: -180,
            }}
            {...this._panResponder.panHandlers}
          >
            <ScrollView
              horizontal={true}
              snapToInterval={windowWidth}
              snapToAlignment={'center'}
              decelerationRate={0}
              scrollEnabled={this.state.carousel}
              automaticallyAdjustInsets={false}
            >
              <Animated.View {...this._panResponder2.panHandlers}>
                <TouchableOpacity onPress={this.onHistory}>
                  <CardProfile />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View {...this._panResponder2.panHandlers}>
                <TouchableOpacity onPress={this.onHistory}>
                  <CardCoach />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View {...this._panResponder2.panHandlers}>
                <TouchableOpacity onPress={this.onHistory}>
                  <CardHistory />
                </TouchableOpacity>
              </Animated.View>
            </ScrollView>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <LinearGradient
            pointerEvents="none"
            colors={[
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0.8)',
              'rgba(255,255,255,1)',
              'rgba(255,255,255,1)',
            ]}
            style={{
              height: 200,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
          <TouchableOpacity
            style={styles.buttonRedWrapper}
            onPress={this.onBegin}
          >
            <View
              style={styles.buttonRed}
              shadowColor={'#f02733'}
              shadowOffset={{ width: 0, height: 10 }}
              shadowOpacity={0.4}
              shadowRadius={20}
            >
              <Text style={styles.buttonRedText}>BEGIN RUN</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
