import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { REQUEST_ALL_PERMISSIONS } from '../actions/permissionActions'

const Counter = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={props.requestPremissions}>
          <Text style={styles.buttonText}>Request for Perms!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('DEVICE LEN', props.scannedDevices.length, props.scannedDevices)}>
          <Text style={styles.buttonText}>Devices Length</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Bluetooth State: {props.bluetoothState}</Text>
        </TouchableOpacity>
        {
          props.scannedDevices.map((device) => {
            return <Text style={styles.buttonText}>Scanned Devices: {device}</Text>
          })
        }
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '300',
    color: '#007AFF',
    marginLeft: 10,
    marginRight: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    hasPermissions: state.permission.hasAllRequiredPermissions,
    bluetoothState: state.bluetooth.bluetoothState,
    scannedDevices: state.bluetooth.scannedDevices,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    requestPremissions: () => dispatch({
      type: REQUEST_ALL_PERMISSIONS
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
