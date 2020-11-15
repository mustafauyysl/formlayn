import * as actionTypes from './actionTypes';
import { Platform } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const location = Platform.OS  == 'android' ? '~formlayn.db': 1;

var db = openDatabase({ name: 'formlayn.db', createFromLocation: location });

// GET USERS

export function getUsersSuccess(users){
    return { type: actionTypes.GET_USERS_SUCCESS, payload: users }
}

export function getUsers(){
    return function(dispatch) {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                var users = [];
                for(let i = 0; i < results.rows.length; i++)
                    users.push(results.rows.item(i));
                dispatch(getUsersSuccess(users));
            });
        });
    }
}


// ADD USER

export function addUser(studentId,nameSurname,email,phone,faculty,department){
    return function(dispatch){
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO users (studentId,nameSurname,email,phone,faculty,department) VALUES (?,?,?,?,?,?)',
            [
                studentId,
                nameSurname,
                email,
                phone,
                faculty,
                department
            ],
            (tx, results) => {
               if(results.rowsAffected > 0) {
                    dispatch(showAddAlert(true))
               }
            }
            )
        })
    }
}

// SELECT USER

export function selectUser(user){
    return { type: actionTypes.SELECT_USER, payload: user }
}

// UPDATE USER

export function updateUser(studentId, nameSurname, email, phone, faculty, department, id){
    return function(){
        db.transaction((tx) => {
            tx.executeSql('UPDATE users SET studentId=?, nameSurname=?, email=?, phone=?, faculty=?, department=? WHERE id=?',
                [
                    studentId,
                    nameSurname,
                    email,
                    phone,
                    faculty,
                    department,
                    id
                ],
                (tx, results) => {
                    if(results.rowsAffected > 0){
                        dispatch(showUpdateAlert(true))
                    }
                }
            )
        })
    }
}

// DELETE USER

export function deleteUser(id){
    return function(){
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM users WHERE id=?',[id],
            (tx,results) => {
            }
            )
        })
    }
}


// SHOW ADD ALERT

export function showAddAlert(isVisible){
    return { type: actionTypes.SHOW_ADD_ALERT, payload: isVisible }
}

// SHOW UPDATE ALERT 

export function showUpdateAlert(isVisible){
    return { type: actionTypes.SHOW_UPDATE_ALERT, payload: isVisible }
}
