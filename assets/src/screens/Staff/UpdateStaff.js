import React,{useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity,Picker} from 'react-native';

import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';


import {useIsFocused} from "@react-navigation/native";

export default function UpdateStaff({route,navigation}) {

    const isFocused=useIsFocused();

    const staff=route.params.item;
    const [role,setRole]=useState(staff.role);
    const[firstname,setFirstName]=useState(staff.firstname);
    const[lastname,setLastName]=useState(staff.lastname);
    const[password,setPassword]=useState(staff.password);
    const[email,setEmail] = useState(staff.email)
    const[username,setUsername] =useState(staff.username)
    const[message,setMessage] = useState('')
    const[id,setID]=useState(staff._id);

    const updateStaff=()=>{
        console.log("updatestaff method is clicked");

        var staff={
            _id:id,
            firstname:firstname,
            lastname:lastname,
            password:password,
            username:username,
            email:email,
            role:role
        }

        console.log(staff)
        var url="https://localhost:7061/Staff";
        var header=new Headers({Authorization: 'Basic ' + btoa("test:test")});
        header.append('Content-Type','application/json');

        var options={
            method:'PUT',
            headers:header,
            body:JSON.stringify(staff)

        }

        try{

            const response= fetch(url,options);
            console.log(response);

            setMessage('staff updated successfully');


        }
        catch(error){
            console.log("Error is: "+error.message);
        }
    }
    return (
        <SafeAreaView style={MainStyle.safeAreaView}>
            <ScrollView contentContainerStyle={MainStyle.container}>
                <View style={MainStyle.container}>
                    <Header></Header>
                    <View style={MainStyle.pageTitleContainer}>
                        <Text style={MainStyle.titleText}>Update Staff</Text>
                        <TouchableOpacity style={[{alignSelf: 'auto'},MainStyle.whiteButton]} onPress={()=>navigation.navigate('StaffList')}>
                             <Text style={MainStyle}>Staff List</Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={[MainStyle.formContainer,{marginTop:50}]}>

                        <TextInput placeholder='First Name' style={MainStyle.textInput} value = {firstname} onChangeText={(firstname)=>setFirstName(firstname)}></TextInput>
                        <TextInput placeholder='Last Name' style={MainStyle.textInput} value = {lastname} onChangeText={(lastname)=>setLastName(lastname)}></TextInput>
                        <TextInput placeholder='Role' style={MainStyle.textInput} value = {role}onChangeText={(role)=>setRole(role)}></TextInput>
                        <TextInput placeholder='Password' style={MainStyle.textInput} value ={password}onChangeText={(password)=>setPassword(password)}></TextInput>
                        <TextInput placeholder='Username' style={MainStyle.textInput} value = {username} onChangeText={(username)=>setUsername(username)}></TextInput>
                        <TextInput placeholder='Email' style={MainStyle.textInput} value ={email} onChangeText={(email)=>setEmail(email)}></TextInput>

                        <TouchableOpacity style={MainStyle.orangeButton} onPress={updateStaff}>
                            <Text >Update staff</Text>
                        </TouchableOpacity>
    
                        <View style={MainStyle.alignCenter}>
                            <Text style={MainStyle.blackText}>{message}</Text>
                        </View>
                    </View>
    
                    
                    <StatusBar style="auto" />
                </View>
            </ScrollView>
        </SafeAreaView>
        
      );
    }
    