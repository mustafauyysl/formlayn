import React,{Component} from 'react';
import { 
    View,
    StyleSheet, 
    FlatList, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Text,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Colors from '../constants/colors';
import Table from '../components/Table';
import {connect} from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import {bindActionCreators} from 'redux';
import * as usersActions from '../redux/actions/usersActions';
import Button from '../components/Button';
import XLSX from 'xlsx';
import { writeFile, readFile, DocumentDirectoryPath, DownloadDirectoryPath } from 'react-native-fs';
import Mailer from 'react-native-mail';


const DDP = DocumentDirectoryPath + '/';
const input = res => res;
const output = str => str;


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
        this.setState({ showAlert: true })
    }

    hideAlert = () => {
        this.setState({ showAlert: false })
    }

    deleteUserAlert = (id) => { 
        Alert.alert(
            "Uyarı!",
            "Üyeyi silmek istiyor musunuz?",
            [
              {
                text: "Hayır",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Evet", onPress: () => this.deleteUser(id) }
            ],
            { cancelable: false }
          );
      

    }   

    deleteUser = (id) => {
        this.props.actions.deleteUser(id);
        this.props.actions.getUsers();
    }

    exportFile = () => {
        var data = this.props.users;
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
        const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
        const file = DDP + 'Üyeler.xlsx';

        writeFile(file, output(wbout), 'ascii').then((res) => {
            this.handleEmail(file)
        }).catch((err) => { Alert.alert('Error: '+ err.message); });
    }

    handleEmail = (file) => {
        Mailer.mail({
          subject: 'Üyeleriniz',
          body: '<b>Üyeleriniz ektedir.</b>',
          isHTML: true,
          attachments: [{
            path: file,  // The absolute path of the file from which to read data.
            type: 'xlsx',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            // mimeType - use only if you want to use custom type
            name: '',   // Optional: Custom filename for attachment
          }]
        }, (error, event) => {
          Alert.alert(
            error,
            event,
            [
              {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
              {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
            ],
            { cancelable: true }
          )
        });
      }

    renderItem = (item) => {
        return(
            <View>
                <Table 
                    line={item.index+1}
                    nameSurname={item.item.nameSurname}
                    updateButton={() => this.updateMember(item.item)}
                    deleteButton={() => this.deleteUserAlert(item.item.id)}
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
                    <View style={styles.buttonContainer}>
                        <Button 
                            buttonBackgroundColor={Colors.primaryColor}
                            title='İndir'
                            icon='download'
                            onPress={() => this.exportFile()}
                        />
                        <Button 
                            buttonBackgroundColor={Colors.greenColor}
                            title='Yeni Üye'
                            icon='person'
                            onPress={() => this.props.navigation.navigate('AddMember')}
                        />
                    </View>

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
                            this.hideAlert();
                        }}
                        onConfirmPressed={() => {
                            this.deleteUser();
                        }}
                    />   

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
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
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