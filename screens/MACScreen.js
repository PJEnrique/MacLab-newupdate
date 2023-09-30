import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MACScreen() {
  const [openTime, setOpenTime] = useState(null);
  const [closeTime, setCloseTime] = useState(null);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenTime = () => {
    setOpenTime(moment().format('h:mm A'));
  };

  const handleCloseTime = () => {
    setCloseTime(moment().format('h:mm A'));
  };


  return (
    <SafeAreaView className="flex-1 flex-row justify-center items-center">
       <View style={styles.container}>
      <Text style={styles.timerText}>Timer: {moment().startOf('day').seconds(timer).format('H:mm:ss')}</Text>
      <Button title="Set Open Time" onPress={handleOpenTime} />
      <Button title="Set Close Time" onPress={handleCloseTime} />
      {openTime && <Text style={styles.timeText}>Open Time: {openTime}</Text>}
      {closeTime && <Text style={styles.timeText}>Close Time: {closeTime}</Text>}
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  timeText: {
    fontSize: 18,
    marginVertical: 5,
  },
});