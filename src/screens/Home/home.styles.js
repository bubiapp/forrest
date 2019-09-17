import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logosmall: {
    width: 40,
    height: 15,
  },
  logoicon: {
    height: 30,
    width: 30,
  },
  toolbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 25,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: 50,
  },
  footer: {
    padding: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 60,
  },
  content: {
    padding: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 0,
  },
  buttonRed: {
    backgroundColor: '#f02733',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRedText: {
    color: '#fff',
    fontFamily: 'BebasNeue',
    textAlign: 'center',
    fontSize: 24,
  },
  mapView: {
    flex: 1,
    marginBottom: 120,
  },
});
