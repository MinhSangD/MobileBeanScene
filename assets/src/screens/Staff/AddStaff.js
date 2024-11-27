import React,{useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity, Picker} from 'react-native';


import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';


export default function AddStaff({props,navigation}) {
    
    const [role,setRole]=useState('Manager');
    const[firstname,setFirstName]=useState('');
    const[lastname,setLastName]=useState('');
    const[password,setPassword]=useState('');
    const[email,setEmail] = useState('')
    const[username,setUsername] =useState('')
    const[message,setMessage] = useState('')
    

    const addStaff=()=>{
        console.log("add product button is clicked");

        var staff={
            firstname:firstname,
            lastname:lastname,
            password:password,
            username:username,
            email:email,
            role:role
        }

        var url="https://localhost:7061/Staff";
        var header=new Headers({Authorization: 'Basic ' + btoa("test:test")});
        header.append('Content-Type','application/json');

        var options={
            method:'POST',
            headers:header,
            body:JSON.stringify(staff)
        }

        try{

            const response= fetch(url,options);
            console.log(response);

            setMessage('Staff added successfully');
            setEmail('')
            setFirstName('')
            setLastName('')
            setPassword('')
            setRole('Manager')
            setUsername('')
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
                        <Text style={MainStyle.titleText}>Add Staff</Text>
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




{/* 
                        <Picker style={MainStyle.textInput} onValueChange={(category)=>setCategory(category)}>
                            {
                                categoryData?.map((item,key)=>(
                                    <Picker.Item label={item.name} value={item.name} key={key}></Picker.Item>
                                ))
                            }
                        </Picker> */}
                        <TouchableOpacity style={MainStyle.orangeButton} onPress={addStaff}>
                            <Text style={MainStyle.orangeButtonText}>Add Staff</Text>
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