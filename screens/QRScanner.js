import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

const HomeTabURL = 'https://qr.page/g/3hdPr0tgvug';

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    if (data === HomeTabURL) {
      navigation.navigate('Home', { scanned: true });
    } else {
      alert('Invalid QR code');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {!scanned && (
        <View style={styles.overlay}>
          <Image style={styles.qrCode} source={{ uri: HomeTabURL }} />
          <View style={styles.border} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7A2048',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  qrCode: {
    width: 200,
    height: 200,
  },
  border: {
    width: 220, // Adjust the width and height to match the QR code size
    height: 220,
    borderColor: 'orange', // Set the border color
    borderWidth: 2, // Set the border width
    position: 'absolute',
  },
});

export default QRScanner;