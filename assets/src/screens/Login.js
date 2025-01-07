import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View ,SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity,Dimensions} from 'react-native';

import MainStyle from '../Styles/MainStyle';

import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrected import



export default function Login({navigation}) {
    const { width } = Dimensions.get('window');
    const[username,setUserName]=useState('');
    const[password,setPassword]=useState('');
    const[logo,setLogo] = useState("")
    const[error,setError]=useState('');

const submit=async()=>{
  

    if(username.length==0){
        setError("Please enter Username");
    }
    else if(password.length==0){
        setError("Please enter Password");
    }
    else{
        setError(" ");
        var url=`https://localhost:7061/Staff/${username}/${password}`;
        var header=new Headers({
            Authorization: 'Basic ' + btoa("test:test")
        });
        header.append('Content-Type','application/json');
    
        var options={
            method:'GET',
            headers:header
        }
    
        try{
            const response= await fetch(url,options);
            console.log(response);
            if(response.ok){
                const data=await response.json();
                console.log(data);

                await AsyncStorage.setItem('loginDetails',JSON.stringify(data));

                if(data.role.toLowerCase()=="manager"){
                    console.log('manager')
                   
                    navigation.navigate("ManagerDashBoard");
                    setUserName('')
                    setPassword('')
                }
                else if(data.role.toLowerCase()=="staff"){
                    setPassword("")
                    navigation.navigate("StaffDashBoard");
                    setUserName('')
                    setPassword('')
                }
            }
            else{
                setError("Username and password does not exist");
            }
    
        }
        catch(error){
            console.log(error.message);
        }
    }
}
useEffect(() => {
   
    if (width > 500) {
      setLogo(require('../images/logo/png/logo-primary-transparent.png')); 
    } else {
      setLogo(require('../images/symbol/png/symbol-primary-transparent.png')); 
    }
  }, [width]);
  return (
    <SafeAreaView style={MainStyle.safeAreaView}>
        <ScrollView contentContainerStyle={MainStyle.container}>
            

                <View style={MainStyle.logoContainer}>
                    <Image source={logo}></Image>

                    <Text style={MainStyle.logoTitle}>Bean Scene</Text>
                    <Text style={MainStyle.logoSubTitle}>Ordering System</Text>

                </View>
                <View style={MainStyle.formContainer}>
                   
                    <TextInput placeholder='Username' style={MainStyle.textInput} value ={username} onChangeText={(username)=>setUserName(username)}></TextInput>
                    <TextInput placeholder='Password' style={MainStyle.textInput} value = {password}secureTextEntry={true} onChangeText={(password)=>setPassword(password)}></TextInput>
                    
                </View>
                <View style={MainStyle.buttonFormContainer}>
                    <TouchableOpacity style={MainStyle.orangeButton} onPress={submit}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    
                        <View style={MainStyle.alignCenter}>
                            <Text style={MainStyle.blackText}>{error}</Text>
                        </View>
                </View>
                <StatusBar style="auto" />
          
        </ScrollView>
    </SafeAreaView>
    
  );
}