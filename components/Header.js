import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 50
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default Header;