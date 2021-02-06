import React from 'react';
import {Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

Icon.loadFont();

const Button = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: props.buttonBackgroundColor,
          },
        ]}
        onPress={props.onPress}>
        <Icon name={props.icon} size={18} color="#fff" />
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: '35%',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
});

export default Button;
