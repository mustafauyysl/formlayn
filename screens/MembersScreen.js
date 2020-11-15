import React,{Component} from 'react';
import { 
    View,
    StyleSheet, 
    FlatList, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Colors from '../constants/colors';
import Table from '../components/Table';
import {connect} from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import {bindActionCreators} from 'redux';
import * as usersActions from '../redux/actions/usersActions';


class MembersScreen extends Component{
    state = {
        showAlert: false
    }

    componentDidMount = () => {
        this.props.actions.getUsers();
    }

    updateMember = (user) => {
        this.props.actions.selectUser(user);
        this.props.navigation.navigate('UpdateMember');
    }

    showAlert = () => {
        this.setState({ showAlert: !this.state.showAlert })
    }

    deleteUser = (id) => { 
        this.props.actions.deleteUser(id);
        this.setState({ showAlert: false });
        this.props.actions.getUsers();
    }   

    renderItem = (item) => {
        return(
            <View>
                <Table 
                    line={item.index+1}
                    nameSurname={item.item.nameSurname}
                    updateButton={() => this.updateMember(item.item)}
                    deleteButton={() => this.showAlert()}
                />
            
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Üyeyi silmek istiyor musunuz?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    confirmText="Evet"
                    cancelText='Hayır'
                    cancelButtonColor={Colors.redColor}
                    confirmButtonColor={Colors.greenColor}
                    onCancelPressed={() => {
                        this.showAlert();
                    }}
                    onConfirmPressed={() => {
                        this.deleteUser(item.item.id);
                    }}
                />   
            </View>

        )
    }

    render(){
        return(
            <LinearGradient
                start={{x: 0.0, y: 0.25}} end={{x: 1.0 , y: 1.0}}
                colors={[Colors.primaryColor, Colors.secondaryColor]}
                style={styles.container}>
                <Header title='Üyeler'/>
                <KeyboardAvoidingView 
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    style={styles.tableContainer}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <FlatList 
                            data={this.props.users}
                            keyExtractor={(item) => item.id}
                            renderItem={item => this.renderItem(item)}
                        />
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView> 
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    tableContainer: {
        width: '100%',
        height: 430
    },
});

function mapStateToProps(state) {
    return {
        users: state.usersListReducer,
        showDeleteAlert: state.deleteAlertVisibleReducer 
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            getUsers: bindActionCreators(usersActions.getUsers, dispatch),
            selectUser: bindActionCreators(usersActions.selectUser, dispatch),
            deleteUser: bindActionCreators(usersActions.deleteUser, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersScreen);