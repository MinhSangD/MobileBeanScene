import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FloatingButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button,{flexDirection:'row'}]}>
        <Text>Checkout Now?</Text>
    
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#CC9E09',  // Button color
    borderRadius: 30,  // Rounded corners
    paddingVertical: 15,  // Vertical padding
    paddingHorizontal: 40,  // Horizontal padding
    elevation: 5,  // Shadow on Android
    shadowColor: '#EBC136',  // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },  // Shadow offset
    shadowOpacity: 0.2,  // Shadow opacity
    shadowRadius: 3,  // Shadow radius
  },
});

export default FloatingButton;