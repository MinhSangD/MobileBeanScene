import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity,FlatList,Modal} from 'react-native';

import {Ionicons, AntDesign} from '@expo/vector-icons';

import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';

import {useIsFocused} from "@react-navigation/native";

export default function CategoryList ({props,navigation}) {

    const [CategoryData,setCategoryData] = useState([])
    const[modalVisibility,setModalVisibility]=useState(false);
    const[selectedCategory,setSelectedCategory]=useState(null);
    const isFocused=useIsFocused();
    const getCategory=async()=>{

        console.log("getProducts method is called");
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

    useEffect(()=>{
        if(isFocused){
        getCategory();
        }
    },[props,isFocused]);


const showDeleteModal=(product)=>{
    console.log(product);
    setModalVisibility(true);
    setSelectedCategory(product);
}

const hideDeleteModal=()=>{
    setModalVisibility(false);
    setSelectedCategory(null);
}
const deleteConfirmed=async()=>{
    var url=`https://localhost:7061/Category/${selectedCategory._id}`;
    var header=new Headers({});
    header.append('Content-Type','application/json');

    var options={
        method:'Delete',
        headers:header
    }

    try{

        const response= await fetch(url,options);
        console.log(response);

        if(response.ok){
            console.log("product deleted");
            hideDeleteModal();
            getCategory();

        }

    }
    catch(error){
        console.log("Error is: "+error.message);
    }
}
    return(
        <SafeAreaView style={MainStyle.safeAreaView}>
        <ScrollView contentContainerStyle={MainStyle.container}>
            <View style={MainStyle.container}>
                <Header></Header>
                <View style={MainStyle.pageTitleContainer}>
                     <TouchableOpacity style={MainStyle.blueButton} onPress={()=>navigation.navigate('AddCategory')} > 
                        <Text style={MainStyle.titleText}>Add category</Text>
                        <Ionicons name={'add-circle'} size={35} color='#083944'/>
                    </TouchableOpacity>
                </View>

                <FlatList data={CategoryData} renderItem={({item})=>(
                    <View style={MainStyle.itemListContainer}>
                        <Text style={MainStyle.itemListText}>{item.name}</Text>
                        <View style={[{justifyContent:"space-between"},MainStyle.rowHorizontal]}>
                            <TouchableOpacity onPress={()=>navigation.navigate('UpdateCategory',{item})}>
                            <AntDesign name="edit" size={18} color='white'></AntDesign>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>showDeleteModal(item)}>
                            <AntDesign name="delete" size={18} color='white'></AntDesign>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}>
                </FlatList>
                <StatusBar style="auto" />
            </View>

          <Modal visible={modalVisibility} transparent>
            <View style={MainStyle.modalContainer}>
                <View style={MainStyle.modalContent}>
                    <Text style={MainStyle.modelText}>Are you sure you want to delete {selectedCategory && selectedCategory.name}?</Text>
                    <View style={MainStyle.rowHorizontal}>
                        <TouchableOpacity style={[MainStyle.modalButton ,{backgroundColor:'red'}]} onPress={deleteConfirmed}>
                            <Text style={MainStyle.whiteText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={MainStyle.modalButton} onPress={hideDeleteModal}>
                            <Text style={MainStyle.whiteText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
          </Modal>
        </ScrollView>
    </SafeAreaView>
    )
}