import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddMemberScreen from '../screens/AddMemberScreen';
import MembersScreen from '../screens/MembersScreen';
import UpdateMemberScreen from '../screens/UpdateMemberScreen';

const MainStackNavigator = createStackNavigator();


const MainNavigator = props => {
    return(
        <NavigationContainer>
            <MainStackNavigator.Navigator>
                <MainStackNavigator.Screen
                    name='AddMember'
                    component={AddMemberScreen}
                    options={{
                        headerShown: false
                    }}
                >
                </MainStackNavigator.Screen>
                <MainStackNavigator.Screen
                    name='Members'
                    component={MembersScreen}
                    options={{
                        headerShown: false
                    }}
                >
                </MainStackNavigator.Screen>
                <MainStackNavigator.Screen
                    name='UpdateMember'
                    component={UpdateMemberScreen}
                    options={{
                        headerShown: false
                    }}
                >
                </MainStackNavigator.Screen>
            </MainStackNavigator.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator;