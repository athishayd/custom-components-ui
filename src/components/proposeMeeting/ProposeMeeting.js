import React, {useState, Fragment} from 'react';
import {StyleSheet, View, ScrollView, Text, Dimensions} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import _, {last} from 'lodash';
import {Button} from 'react-native-elements';

const ProposeMeeting = () => {
  // eslint-disable-next-line prettier/prettier
  const currentMonth = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
  //alert(currentMonth); //07
  const currentYear = new Date().getFullYear();
  const initialStartDate = getStartEndDate(currentYear, currentMonth, true);
  const initialEndDate = getStartEndDate(currentYear, currentMonth);
  const initialDisabledDates = getDisabledDates(
    initialStartDate,
    initialEndDate,
    [0, 6],
  );

  const timeSlotsToPopulate = [
    {id: 0, active: false, label: '9:00am'},
    {id: 1, active: false, label: '10:00am'},
    {id: 2, active: false, label: '11:00am'},
    {id: 3, active: false, label: '12:00pm'},
    {id: 4, active: false, label: '1:00pm'},
    {id: 5, active: false, label: '2:00pm'},
    {id: 6, active: false, label: '3:00pm'},
    {id: 7, active: false, label: '4:00pm'},
    {id: 8, active: false, label: '5:00pm'},
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [disabledDates, setDisabledDates] = useState(initialDisabledDates);
  const [timeSlot, setTimeSlot] = useState(timeSlotsToPopulate);

  const setCategory = (e) => {
    debugger;
    console.log(e);
  };

  return (
    <>
      <View style={styles.body}>
        <Text style={styles.heading}>
          Let’s propose a meeting time with your coach
        </Text>
        <Text style={styles.subheading}>
          Choose 3 options for your coach to choose from. We’ll run these by
          your coach and let you know what day and time they selected.
        </Text>
        <Text style={styles.bluehHeading}>Select Date</Text>
        <Calendar
          onMonthChange={(month) => onMonthChange(month)}
          current={new Date()}
          //   minDate={new Date()}
          style={styles.calendar}
          onDayPress={onDayPress}
          firstDay={1}
          textSectionTitleDisabledColor="#C4C4C4"
          disabledDaysIndexes={[5, 6]}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: '#2E9CCA',
              selectedTextColor: '#fff',
            },
            ...disabledDates,
          }}
          theme={{
            textDayFontWeight: '600',
            textMonthFontWeight: 'bold',
            textSectionTitleDisabledColor: '#d9e1e8',
            textDayHeaderFontWeight: '600',
            arrowColor: 'black',
            'stylesheet.day.basic': {
              base: {
                width: 20,
                height: 20,
                alignItems: 'center',
              },
              text: {
                fontSize: 12,
                lineHeight: 18,
                letterSpacing: 0.5,

                padding: 0,
              },
            },
            'stylesheet.calendar.header': {
              header: {
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 0,
                alignItems: 'center',
                shadowColor: 'rgba(159, 166, 193, 1)',
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 15,
                borderRadius: 10,
                height: 48,
                width: '104%',
                marginLeft: '-2%',
                marginBottom: 10,
              },
              dayHeader: {
                marginTop: 2,
                marginBottom: 20,
                width: 32,
                textAlign: 'center',
                color: '#333333',
                fontWeight: '600',
                fontSize: 12,
                lineHeight: 18,
                letterSpacing: 0.5,
              },
            },
          }}
        />
        <Text style={styles.bluehHeading}>Select Time</Text>
        <View style={styles.timeboxContainer}>
          {timeSlot.map((o, i) => {
            return (
              <Button
                key={i}
                id={i}
                buttonStyle={[
                  styles.timeSlotBtn,
                  o.active ? styles.timeSlotBtnActive : null,
                ]}
                titleStyle={[
                  styles.timeSlotTile,
                  o.active ? styles.timeSlotTitleActive : null,
                ]}
                title={o.label}
                onPressIn={() => onTimeSlotPress(o.id)}
              />
            );
          })}
        </View>
      </View>
    </>
  );

  function onTimeSlotPress(item) {
    let temp = [...timeSlot];
    temp.map((o) => (o.active = false));
    temp[item].active = true;
    setTimeSlot(temp);
  }

  function onMonthChange(month) {
    const selectedYear = month.year;
    let selectedMonth;

    if (month.month < 10) {
      selectedMonth = '0' + month.month;
    } else {
      selectedMonth = month.month;
    }

    const selectedMonthsStartDate = getStartEndDate(
      selectedYear,
      selectedMonth,
      true,
    );
    const selectedMonthsEndDate = getStartEndDate(selectedYear, selectedMonth);
    const datesToDisabled = getDisabledDates(
      selectedMonthsStartDate,
      selectedMonthsEndDate,
      [0, 6],
    );
    setDisabledDates(datesToDisabled);
  }
  function getDisabledDates(startDate, endDate, daysToDisable) {
    const disabledDates = {};
    const start = moment(startDate);
    const end = moment(endDate);
    for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
      if (_.includes(daysToDisable, m.weekday())) {
        disabledDates[m.format('YYYY-MM-DD')] = {disabled: true};
      }
    }
    return disabledDates;
  }
  function getStartEndDate(y, m, isStartDate) {
    if (isStartDate) {
      return y + '-' + m + '-' + '01';
    } else {
      const last = lastday(y, m);
      return y + '-' + m + '-' + last;
    }
  }
  function lastday(y, m) {
    return new Date(y, m, 0).getDate();
  }
  function onDayPress(day) {
    setSelectedDate(day.dateString);
  }
};
export default ProposeMeeting;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fbfbfb',
    fontFamily: 'OpenSans-Regular',
    flex: 1,
    padding: 20,
  },
  calendarContainer: {},
  calendar: {
    marginBottom: 10,
    marginTop: 20,
    fontSize: 10,
  },
  heading: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.5,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 24,
  },
  subheading: {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.4,
  },
  bluehHeading: {
    color: '#2E9CCA',
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.5,
    fontSize: 18,
    marginTop: 24,
  },
  timeboxContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeSlotBtn: {
    backgroundColor: '#F3F3F3',
    width: (Dimensions.get('window').width - 60) / 3,
    marginTop: 10,
    borderRadius: 8,
    height: 48,
  },
  timeSlotTile: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.5,
  },
  timeSlotBtnActive: {
    backgroundColor: '#2E9CCA',
  },
  timeSlotTitleActive: {
      color: '#fff',
  }
});
