import React,{useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity, Picker} from 'react-native';


import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';


export default function AddProduct({props,navigation}) {

    const [categoryData,setCategoryData]=useState([]);
    const[name,setName]=useState('');
    const[description,setDescription]=useState('');
    const[price,setPrice]=useState('');
    const[stock,setStock]=useState('');
    const[category,setCategory]=useState('');
    const[message,setMessage]=useState('');
    

    useEffect(()=>{
        getCategories();
    },[]);


    const getCategories=async()=>{

        console.log("getCategories method is called");
        var url="https://localhost:7061/Category";
        var header=new Headers({});

        var options={
            method:'GET',
            headers:header
        }

        try{

            const response= await fetch(url,options);
            console.log(response);

            const data= await response.json();
            console.log(data);

            setCategoryData(data);

           

        }
        catch(error){
            console.log("Error is: "+error.message);
        }
    }

    const addProduct=()=>{
        console.log("add product button is clicked");

        var product={
            name:name,
            description:description,
            price:price,
            stock:stock,
            category:category
        }

        var url="https://localhost:7061/Menu";
        var header=new Headers({});
        header.append('Content-Type','application/json');

        var options={
            method:'POST',
            headers:header,
            body:JSON.stringify(product)
        }

        try{

            const response= fetch(url,options);
            console.log(response);

            setMessage('Product added successfully');

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
                        <Text style={MainStyle.titleText}>Add Product</Text>
                        <TouchableOpacity style={[{alignSelf: 'auto'},MainStyle.whiteButton]} onPress={()=>navigation.navigate('MenuList')}>
                             <Text style={MainStyle}>Menu List</Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={[MainStyle.formContainer,{marginTop:50}]}>
                        <TextInput placeholder='Name' style={MainStyle.textInput} onChangeText={(name)=>setName(name)}></TextInput>
                        <TextInput placeholder='Description' multiline style={[MainStyle.textInput,{minHeight:101,borderRadius:5}]} onChangeText={(description)=>setDescription(description)}></TextInput>
                        <TextInput placeholder='Price' style={MainStyle.textInput} onChangeText={(price)=>setPrice(price)}></TextInput>
                        <TextInput placeholder='Stock' style={MainStyle.textInput} onChangeText={(stock)=>setStock(stock)}></TextInput>

                        <Picker style={MainStyle.textInput} onValueChange={(category)=>setCategory(category)}>
                            {
                                categoryData?.map((item,key)=>(
                                    <Picker.Item label={item.name} value={item.name} key={key}></Picker.Item>
                                ))
                            }
                        </Picker>
                        <TouchableOpacity style={MainStyle.orangeButton} onPress={addProduct}>
                            <Text >Add Product</Text>
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