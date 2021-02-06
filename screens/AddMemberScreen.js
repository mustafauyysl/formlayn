import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header';
import inputTypes from '../constants/inputTypes';
import Colors from '../constants/colors';
import AwesomeAlert from 'react-native-awesome-alerts';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../redux/actions/usersActions';

class AddMemberScreen extends Component {
  state = {
    studentId: '',
    nameSurname: '',
    email: '',
    phone: '',
    faculty: '',
    department: '',
  };

  addUser = () => {
    const {
      studentId,
      nameSurname,
      email,
      phone,
      faculty,
      department,
    } = this.state;

    this.props.actions.addUser(
      studentId,
      nameSurname,
      email,
      phone,
      faculty,
      department,
    );
    this.setState({
      studentId: '',
      nameSurname: '',
      email: '',
      phone: '',
      faculty: '',
      department: '',
    });
  };

  hideAlert = () => {
    this.props.actions.showAddAlert(false);
  };

  handleInputChange = (inputName, inputValue) => {
    this.setState((state) => ({
      ...state,
      [inputName]: inputValue,
    }));
  };

  renderItem = (item) => {
    return (
      <Input
        placeholder={item.placeholder}
        keyboardType={item.keyboardType}
        value={eval(item.value)}
        onChangeText={(value) => this.handleInputChange(item.name, value)}
      />
    );
  };

  render() {
    return (
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 1.0, y: 1.0}}
        colors={[Colors.primaryColor, Colors.secondaryColor]}
        style={styles.container}>
        <Header title="Yeni Üye Al" />
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.inputsContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              scrollEnabled={false}
              data={inputTypes}
              keyExtractor={(item) => item.id}
              renderItem={(item) => this.renderItem(item.item)}
            />
          </TouchableWithoutFeedback>
          <View style={styles.buttonContainer}>
            <Button
              buttonBackgroundColor={Colors.greenColor}
              icon="checkmark-done"
              title="Üye Ekle"
              onPress={() => this.addUser()}
            />
            <Button
              buttonBackgroundColor={Colors.redColor}
              icon="people"
              title="Üyeler"
              onPress={() => this.props.navigation.navigate('Members')}
            />
          </View>
        </KeyboardAvoidingView>

        <AwesomeAlert
          show={this.props.showAddAlert}
          showProgress={false}
          title="Yeni üyeniz alındı!"
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputsContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

function mapStateToProps(state) {
  return {
    showAddAlert: state.addAlertVisibleReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addUser: bindActionCreators(usersActions.addUser, dispatch),
      showAddAlert: bindActionCreators(usersActions.showAddAlert, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberScreen);
