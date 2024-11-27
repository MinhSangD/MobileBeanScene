import React,{useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity,Picker} from 'react-native';

import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';


import {useIsFocused} from "@react-navigation/native";

export default function UpdateCategory({route,navigation}) {


    const isFocused=useIsFocused();

    const product=route.params.item;

    const[name,setName]=useState(product.name);
    const[id,setID]=useState(product._id);
    const[message,setMessage]=useState('');

    

    const updateProduct=()=>{
        console.log("updateProduct method is clicked");

        var product={
            _id:id,
            name:name,
        }

        var url="https://localhost:7061/Category";
        var header=new Headers({});
        header.append('Content-Type','application/json');

        var options={
            method:'PUT',
            headers:header,
            body:JSON.stringify(product)
        }

        try{

            const response= fetch(url,options);
            console.log(response);

            setMessage('Product updated successfully');


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
                        <Text style={MainStyle.titleText}>Update Category</Text>
                        <TouchableOpacity style={[{alignSelf: 'auto'},MainStyle.whiteButton]} onPress={()=>navigation.navigate('CategoryList')}>
                             <Text style={MainStyle}>Category List</Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={[MainStyle.formContainer,{marginTop:50}]}>
                        <TextInput placeholder='Name' style={MainStyle.textInput} value = {name} onChangeText={(name)=>setName(name)}></TextInput>
                        <TouchableOpacity style={MainStyle.orangeButton} onPress={updateProduct}>
                            <Text >Update Category</Text>
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