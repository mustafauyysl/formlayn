import React from 'react';
import { View, StyleSheet ,TextInput } from 'react-native';


const Input = (props) => {
        return (
            <View style={styles.container}>
                <TextInput 
                    value={props.value}
                    keyboardType={props.keyboardType}
                    style={styles.input}
                    placeholder={props.placeholder}
                    onChangeText={props.onChangeText}
                />
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 50
    },
    input: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 15,
        fontSize: 15,
        marginVertical: 5
    }
});

export default Input;