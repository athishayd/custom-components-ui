/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ScreenRect,
} from 'react-native';

import {Button} from 'react-native-elements';

const Onboarding = () => {
  //hardcoded to be removed
  const steps = [
    {
      title: 'Complete your profile',
      status: 'completed',
    },
    {
      title: 'Evaluate your leadership behaviour',
      status: 'completed',
    },
    {
      title: 'Request 360 Feedback',
      status: 'completed',
    },
    {
      title: 'Take the engagment survey',
      status: 'warning',
    },
    {
      title: 'Meet your executive coach',
      status: 'todo',
    },
    {
      title: 'Schedule your first coaching session',
      status: 'todo',
    },
  ];
  //hardcoded to be removed

  const [progress, setProgress] = useState(6);
  

  return (
    <>
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.stepsContainer}>
            <Text> Step 4 of 6 </Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[styles.progressBar, {width: progress * 16.6 + '%'}]}
              />
            </View>
            <View style={styles.wizardStepsContainer}>
              {steps.map((o, i) => {
                return (
                  <View style={styles.stepContainer} key={i}>
                    <Text
                      style={
                        (styles.stepTitle,
                        o.status === 'todo'
                          ? {color: '#C4C4C4'}
                          : {color: '#000000'})
                      }>
                      {o.title}
                    </Text>
                    <View style={[styles[o.status], styles.statusIcon]} />
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.callToAction}>
            <Text style={styles.callToActionH2}>
              Take the engagement survey
            </Text>
            <Text style={styles.callToActionH1}>
              Let us know how you feel about the role
            </Text>
            <Button
              buttonStyle={styles.btnStart}
              onPress={initStep}
              title="Start"
            />
          </View>
        </View>
      </View>
    </>
  );
};

function initStep() {
  //to do
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F3F3F3',
    fontFamily: 'OpenSans-Regular',
  },
  container: {
    margin: 16,
    display: 'flex',
    height: '90%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  stepsContainer: {
    padding: 16,
    flexGrow: 2,
    height: '80%',
  },
  progressBarContainer: {
    backgroundColor: '#F3F3F3',
    height: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  progressBar: {
    backgroundColor: '#2E9CCA',
    height: 8,
    borderRadius: 8,
  },
  wizardStepsContainer: {
    height: '95%',
    borderRadius: 8,
    display: 'flex',
    marginTop: 38,
  },
  stepContainer: {
    flexGrow: 1,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepTitle: {
    letterSpacing: 0.5,
    fontSize: 14,
    flexGrow: 1,
    fontFamily: 'OpenSans-Bold',
  },
  statusIcon: {
    height: 24,
    width: 24,
    borderRadius: 20,
  },
  completed: {
    backgroundColor: '#50B83C',
  },
  active: {
    backgroundColor: '#25274D',
  },
  warning: {
    backgroundColor: '#FFC107',
  },
  todo: {
    // backgroundColor: '#C4C4C4',
  },
  callToAction: {
    backgroundColor: '#25274D',
    height: 119,
    borderRadius: 12,
    padding: 16,
  },
  callToActionH2: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 18,
  },
  callToActionH1: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 0.5,
    lineHeight: 22,
  },
  btnStart: {
    backgroundColor: '#2E9CCA',
    color: '#FFFFFF',
    height: 32,
    width: 81,
    borderRadius: 16,
    fontSize: 12,
    padding: 0,
    letterSpacing: 0.75,
    lineHeight: 16,
    borderColor: '#2E9CCA',
    borderWidth: 1,
    marginTop: 11,
  },
});

export default Onboarding;
