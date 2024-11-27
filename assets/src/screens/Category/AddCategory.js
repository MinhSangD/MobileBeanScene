import React,{useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity, Picker} from 'react-native';


import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';


export default function AddCategory({props,navigation}) {
    
    const[name,setName]=useState('');
    const[message,setMessage] = useState('')
    

    const addCat=()=>{
        console.log("add product button is clicked");

        var staff={
            name:name,
        }

        var url="https://localhost:7061/Category";
        var header=new Headers({});
        header.append('Content-Type','application/json');

        var options={
            method:'POST',
            headers:header,
            body:JSON.stringify(staff)
        }

        try{

            const response= fetch(url,options);
            console.log(response);

            setMessage('Category added successfully');
            setName('')
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
                        <Text style={MainStyle.titleText}>Add Category</Text>
                        <TouchableOpacity style={[{alignSelf: 'auto'},MainStyle.whiteButton]} onPress={()=>navigation.navigate('CategoryList')}>
                             <Text style={MainStyle}>Category List</Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={[MainStyle.formContainer,{marginTop:50}]}>
                        <TextInput placeholder='Category Name' style={MainStyle.textInput} value = {name} onChangeText={(name)=>setName(name)}></TextInput>

                        <TouchableOpacity style={MainStyle.orangeButton} onPress={addCat}>
                            <Text >Add Category</Text>
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