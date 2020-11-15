import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TableButton = (props) => {
    return(
        <TouchableHighlight 
            style={[styles.container,
                {
                    backgroundColor: props.backgroundColor
                }]}
            onPress={props.onPress}
            underlayColor='transparent'>
            <Icon name={props.icon} color='#fff'/>
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    }
});
export default TableButton;