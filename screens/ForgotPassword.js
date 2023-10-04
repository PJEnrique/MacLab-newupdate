import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { sendPasswordResetEmail } from 'firebase/auth';  
import { getAuth } from 'firebase/auth';  

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    const authInstance = getAuth();  
    try {
      await sendPasswordResetEmail(authInstance, email); 
      setResetSent(true);
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.header}>Forgot Password</Text>
      {!resetSent ? (
        <>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Button
            title="Reset Password"
            onPress={handleResetPassword}
            buttonStyle={styles.button}
          />
        </>
      ) : (
        <Text>
          Password reset email sent. Check your email to reset your password.
        </Text>
      )}
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate('Login')}
        type="clear"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,

  },
});

export default ForgotPassword;