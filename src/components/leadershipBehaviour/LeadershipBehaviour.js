/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Slider from 'react-native-slider';

const LeaderhipBehaviour = (props) => {
  const step = 1;
  const stepper = 25;
  const maxValue = 100;
  const previousScore = 20;
  
  const stepNumbers = Array.from({length: maxValue / stepper + 1}).fill(0);
  const blockwidthPrev = Dimensions.get('window').width - 39;
  let lastIntervalPos = (Dimensions.get('window').width - 39) / step;
  lastIntervalPos = (previousScore / maxValue) * blockwidthPrev - 15;

  const [value, setValue] = useState(0);
  const [left, setLeft] = useState(-15);
  const [showLowOpacity, setShowLowOpacity] = useState(false);

  return (
    <View style={styles.container}>
      {/* <View style={[styles.diamondShield, {left: 100, top: 34}]}>
        <View style={styles.diamondShieldTop} />
        <View style={styles.diamondShieldBottom} />
        <Text style={styles.txtValue}>{45}</Text>
      </View> */}

      {/* <View style={[styles.diamondShield, {left: left}]}>
        <View style={styles.diamondShieldTop} />
        <View style={styles.diamondShieldBottom} />
      </View> */}
      <View style={{position: 'relative'}}>
        {previousScore ? (
          <View
            style={[
              styles.oldThumb,
              {
                left: lastIntervalPos + 15,
                opacity: showLowOpacity ? 0.2 : 1,
              },
            ]}
          />
        ) : null}

        <View style={styles.imageViewContainer}>
          {previousScore ? (
            <View
              style={[
                styles.imageView,
                styles.oldimageView,
                {left: lastIntervalPos},
              ]}>
              <Image style={styles.image} source={require('./old-kite.png')} />
              <Text style={styles.txtValue}>{previousScore}</Text>
            </View>
          ) : null}

          <View style={[styles.imageView, {left: left}]}>
            <Image style={styles.image} source={require('./kite.png')} />
            <Text style={styles.txtValue}>{value}</Text>
          </View>
        </View>
        <Slider
          value={value}
          minimumValue={0}
          maximumValue={maxValue}
          step={step}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor="#49add6"
          onValueChange={(value) => {
            setValue(value);
            // const blockWidth = (Dimensions.get('window').width - 39) / 45;
            const blockWidth = (Dimensions.get('window').width - 39) / step;
            if (value === 0) {
              setLeft(-10);
            } else {
              setLeft((value / maxValue) * blockWidth - 15);
            }

            if (value >= previousScore + 5 || value <= previousScore - 5) {
              setShowLowOpacity(false);
            } else {
              setShowLowOpacity(true);
            }
          }}
        />
        <View style={styles.legendHolder}>
          {stepNumbers.map((o, i) => {
            return <Text style={styles.legend}> {i * stepper} </Text>;
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    height: 20,
    width: Dimensions.get('window').width - 30,
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  txtValue: {
    position: 'absolute',
    top: 15,
    //left: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 48,
  },
  oldThumb: {
    backgroundColor: '#BDBDBD',
    width: 16,
    height: 16,
    borderRadius: 50,
    zIndex: 1,
    position: 'absolute',
    top: 12,
  },
  lowOpacity: {
    opacity: 0.2,
  },
  track: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    borderColor: '#9a9a9a',
    shadowColor: 'black',
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#2E9CCA',
    position: 'absolute',
  },
  imageView: {
    position: 'absolute',
    top: -50,
    zIndex: 2,
  },
  oldImageView: {
    top: 50,
    zIndex: 9999999,
  },
  image: {
    left: -2,
  },
  oldimage: {
    left: -2,
    transform: [{rotate: '180deg'}],
  },
  imageViewContainer: {
    position: 'relative',
  },
  slider: {
    zIndex: -21,
  },
  legend: {},
  legendHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
    // backgroundColor: 'red',
    width: '98%',
    margin: 'auto',
    marginLeft: '3%',
  },
});

export default LeaderhipBehaviour;
