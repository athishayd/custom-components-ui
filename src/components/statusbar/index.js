import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

const Statusbar = () => {
  return (
    <>
      <View style={styles.statusBarBackground}></View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBarBackground: {
    marginTop: Platform.OS === 'ios' ? 26 : 0,
    height: Platform.OS === 'ios' ? 28 : 220, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: 'white',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
});

export default Statusbar;
