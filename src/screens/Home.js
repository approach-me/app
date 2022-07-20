import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';
import { REQUEST_ALL_PERMISSIONS } from '../actions/permissionActions';
// import { getGrpcDataStream } from '../services/grpc/index';
import { getLasnServiceClient, linkNearbyUser, getLasnStream } from '../services/lasn/index'
const { LasnServiceClient, LasnServicePromiseClient } = require('../../protos/lasn/v1/lasn_grpc_web_pb');
const { SubscribeRequest, LinkRequest, DisconnectRequest, SubscribeResponse } = require('../../protos/lasn/v1/lasn_pb');


const lasnService = new LasnServiceClient('http://localhost:8080', null, null)

function Counter(props) {

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={props.requestPremissions}>
          <Text style={styles.buttonText}>Request for Perms!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('DEVICE LEN', props.scannedDevices.length, props.scannedDevices)}>
          <Text style={styles.buttonText}>Devices Length</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonText}>
            Bluetooth State:
            {props.bluetoothState}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          const disconnectedRequest = new DisconnectRequest();
          disconnectedRequest.setUserId('4');
          lasnService.disconnect(disconnectedRequest, null, (rsp) => {
            console.log('disconnected');
          });
        }}
        >
          <Text style={styles.buttonText}>END STREAM!!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          const subscribeRequest = new SubscribeRequest();
          subscribeRequest.setUserId('1');
          const stream = lasnService.subscribe(subscribeRequest, null);
          // const linkRequest = new LinkRequest();
          // linkRequest.setNearbyUserId(4)
          // linkRequest.setUserId(1); // TODO: update to not be hardcoded
          // lasnService.link(linkRequest, (payload) => {
          //   console.log(payload)
          // })
          console.log('Created stream!!');
          stream.on('data', (payload) => {
            const data = new SubscribeResponse(payload);
            console.log('PAYLOAD IS: ', payload.toObject())
            // console.log(data.toObject());
            // console.log(data.getUserSummariesList());
            // console.log('PAYLOAD', payload.getUserSummariesList())
          })
          stream.on(event => {
            console.log('event', event);
          })
          stream.on('error', (err) => {
            console.log(err);
          })
          stream.on('end', () => {
            console.log('stream: ending!!!')
          })
        }}
        >
          <Text style={styles.buttonText}>GRPC SUBSCRIBE</Text>
        </TouchableOpacity>
        {/* {
          props.scannedDevices.map((device) => {
            return <Text style={styles.buttonText}>Scanned Devices: {device}</Text>
          })
        } */}

      </View>
    </SafeAreaView>
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

const mapStateToProps = (state) => ({
  hasPermissions: state.permission.hasAllRequiredPermissions,
  bluetoothState: state.bluetooth.bluetoothState,
  scannedDevices: state.bluetooth.scannedDevices,
});
const mapDispatchToProps = (dispatch) => ({
  requestPremissions: () => dispatch({
    type: REQUEST_ALL_PERMISSIONS,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
