
import { Text, View,TouchableOpacity} from 'react-native';

import MainStyle from '../Styles/MainStyle';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';

export default function Header() {

    const navigation=useNavigation();
    const [name,setName]=useState('');
    const [role,setRole]=useState('');
  
    useEffect(()=>{
      loadStaffDetails();
    })
  
    const loadStaffDetails=async()=>{
      const details=await AsyncStorage.getItem('loginDetails');
      console.log(details);
  
      var jsonDetails=JSON.parse(details);
      console.log(jsonDetails);
  
      setName(jsonDetails.firstname+" "+jsonDetails.lastname);
      setRole(jsonDetails.role);
    }
  
    const logout=()=>{
       navigation.navigate("Login")
    }
    
    return (
      <View style={MainStyle.headerContainer}>
          <Text style={MainStyle.whiteText}>Welcome: {name} </Text>
          <Text style={MainStyle.whiteText}>Role: {role}</Text>
          <TouchableOpacity onPress={logout} style={MainStyle.whiteButton}>
              <Text style={MainStyle.whiteText}>Logout</Text>
          </TouchableOpacity>
         
      </View>
      
    );
  }