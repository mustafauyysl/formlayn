import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import TableButton from '../components/TableButton';
import Colors from '../constants/colors';

const Table = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.amount}>{props.line}. </Text>
            <Text style={{ width: 130 }} numberOfLines={1}> {props.nameSurname}</Text>
            <View style={styles.buttonContainer}>
                <TableButton 
                    icon='open-outline'
                    backgroundColor={Colors.yellowColor}
                    onPress={props.updateButton}/>
                <TableButton 
                    icon='trash-outline'
                    backgroundColor={Colors.redColor}
                    onPress={props.deleteButton}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Platform.OS == 'android' ? 40 : 50,
        marginVertical: 2
    },
    amount: {
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 150,
        height: 10
    }
});

export default Table;