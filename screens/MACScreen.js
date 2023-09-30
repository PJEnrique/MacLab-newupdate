import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, StyleSheet, TextInput, Button } from 'react-native';

const MACScreen = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedPc, setSelectedPc] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(1500); // Initial time in seconds (25 minutes)
  const [customTime, setCustomTime] = useState('25');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let timer;

    if (isTimerRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      const timeUsed = 1500 - timeRemaining; // Calculate time used for the completed Pomodoro
      setHistory(prevHistory => [...prevHistory, { pc: selectedPc, timeUsed }]);
      setSelectedPc(null);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning, timeRemaining, selectedPc]);

  const handlePcPress = pc => {
    setSelectedPc(pc);
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    setTimeRemaining(customTime * 60); // Reset timer to the custom time in seconds
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleCustomTimeChange = input => {
    const value = parseInt(input, 10);
    setCustomTime(isNaN(value) ? '' : Math.max(1, value).toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.pcIconsContainer}>
        {[...Array(20).keys()].map(pc => (
          <Pressable
            key={pc}
            onPress={() => handlePcPress(pc + 1)}
            style={({ pressed }) => [
              styles.pcIcon,
              {
                backgroundColor: pressed ? 'gray' : selectedPc === pc ? 'green' : '#e0e0e0',
              },
            ]}
          >
            {({ pressed }) => (
              <Text style={[styles.pcIconText, { color: pressed ? 'white' : 'black' }]}>
                PC {pc + 1}
              </Text>
            )}
          </Pressable>
        ))}
      </View>

      {selectedPc !== null && (
        <View style={styles.timerContainer}>
          <TextInput
            style={styles.input}
            value={customTime}
            onChangeText={handleCustomTimeChange}
            placeholder="Enter time in minutes"
            keyboardType="numeric"
          />
          <Button title="Start Timer" onPress={() => setTimeRemaining(parseInt(customTime, 10) * 60)} />
          {isTimerRunning && (
            <>
              <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
              <Button title="Stop" onPress={handleStopTimer} color="red" />
            </>
          )}
        </View>
      )}

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>History:</Text>
        {history.map((item, index) => (
          <View key={index} style={styles.completedPomodoro}>
            <Text>{`PC ${item.pc + 1} - Time Used: ${formatTime(item.timeUsed)}`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pcIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pcIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  pcIconText: {
    color: 'black',
  },
  timerContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  timerText: {
    fontSize: 40,
    marginVertical: 10,
  },
  historyContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  completedPomodoro: {
    marginBottom: 5,
  },
});
export default MACScreen;