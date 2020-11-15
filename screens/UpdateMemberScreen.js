import React,{Component} from 'react';
import { 
    View,
    StyleSheet, 
    FlatList, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header';
import Colors from '../constants/colors';
import AwesomeAlert from 'react-native-awesome-alerts';
import {connect} from 'react-redux';
import * as usersActions from '../redux/actions/usersActions';
import { bindActionCreators } from 'redux';


class UpdateMemberScreen extends Component{
    state = {
        studentId: this.props.user.studentId,
        nameSurname: this.props.user.nameSurname,
        email: this.props.user.email,
        phone: this.props.user.phone,
        faculty: this.props.user.faculty,
        department: this.props.user.department,
    }


    updateUser = () => {
        const actions = this.props.actions;
        const id = this.props.user.id;
        const {
            studentId,
            nameSurname,
            email,
            phone,
            faculty,
            department } = this.state;
        
        actions.updateUser(studentId,nameSurname,email,phone,faculty,department,id);
        actions.showUpdateAlert(true);
        actions.getUsers();

    }

    hideAlert = () => {
        this.props.actions.showUpdateAlert(false);
    }

    handleInputChange = (inputName, inputValue) => {
        this.setState(state => ({ 
          ...state,
          [inputName]: inputValue
        }))
      }

    render(){
        return(
            <LinearGradient
                start={{x: 0.0, y: 0.25}} end={{x: 1.0 , y: 1.0}}
                colors={[Colors.primaryColor, Colors.secondaryColor]}
                style={styles.container}>
                <Header title={this.props.user.nameSurname}/>
                <KeyboardAvoidingView 
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    style={styles.inputsContainer}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <Input 
                                keyboartType='numeric'
                                value={this.state.studentId}
                                onChangeText={value => this.handleInputChange('studentId',value)}
                            />
                            <Input 
                                value={this.state.nameSurname}
                                onChangeText={value => this.handleInputChange('nameSurname', value)}
                            />
                            <Input 
                                keyboartType='numeric'
                                value={this.state.phone}
                                onChangeText={value => this.handleInputChange('phone', value)}
                            />
                            <Input 
                                value={this.state.email}
                                onChangeText={value => this.handleInputChange('email', value)}
                            />
                            <Input 
                                value={this.state.faculty}
                                onChangeText={value => this.handleInputChange('faculty', value)}
                            />
                            <Input 
                                value={this.state.department}
                                onChangeText={value => this.handleInputChange('department', value)}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.buttonContainer}>
                        <Button 
                            buttonBackgroundColor={Colors.greenColor}
                            icon='checkmark-done'
                            title='Güncelle'
                            onPress={() => this.updateUser()}/>
                        <Button 
                            buttonBackgroundColor={Colors.redColor}
                            icon='people'
                            title='Üyeler'
                            onPress={() => this.props.navigation.navigate('Members')}/>
                    </View>
                </KeyboardAvoidingView>

                <AwesomeAlert
                        show={this.props.showUpdateAlert}
                        showProgress={false}
                        title="Bilgiler güncellendi!"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="Tamam"
                        confirmButtonColor={Colors.greenColor}
                        onConfirmPressed={() => {
                            this.hideAlert();
                        }}
                    />
                
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
    inputsContainer: {
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    }
});

function mapStateToProps(state){
    return {
        user: state.selectUserReducer,
        showUpdateAlert: state.updateAlertVisibleReducer
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            updateUser: bindActionCreators(usersActions.updateUser, dispatch),
            showUpdateAlert: bindActionCreators(usersActions.showUpdateAlert,dispatch),
            getUsers: bindActionCreators(usersActions.getUsers, dispatch)
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UpdateMemberScreen);