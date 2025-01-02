import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity,FlatList,Modal} from 'react-native';

import {Ionicons, AntDesign} from '@expo/vector-icons';

import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';

import {useIsFocused} from "@react-navigation/native";

export default function StaffList ({props,navigation}) {

    const [staffData,setStaffData] = useState([])
    const[modalVisibility,setModalVisibility]=useState(false);
    const[selectedStaff,setSelectedStaff]=useState(null);
    const isFocused=useIsFocused();
    const getStaff=async()=>{

        console.log("getProducts method is called");
        var url="https://localhost:7061/Staff";
        var header=new Headers({Authorization: 'Basic ' + btoa("test:test")});

        var options={
            method:'GET',
            headers:header
        }

        try{

            const response= await fetch(url,options);
            console.log(response);

            const data= await response.json();
            console.log(data);

            setStaffData(data);

        }
        catch(error){
            console.log("Error is: "+error.message);
        }
        
    }

    useEffect(()=>{
        if(isFocused){
        getStaff();
        }
    },[props,isFocused]);


const showDeleteModal=(staff)=>{
    console.log(staff);
    setModalVisibility(true);
    setSelectedStaff(staff);
}

const hideDeleteModal=()=>{
    setModalVisibility(false);
    setSelectedStaff(null);
}
const deleteConfirmed=async()=>{
    var url=`https://localhost:7061/Staff/${selectedStaff._id}`;
    var header=new Headers({Authorization: 'Basic ' + btoa("test:test")});
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
            getStaff();

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
                <View style={[MainStyle.pageTitleContainer,{justifyContent:"flex-end"}]}>
                    <TouchableOpacity style={[MainStyle.blueButton,{backgroundColor:"white",borderRadius:23}]} onPress={()=>navigation.navigate('AddStaff')} > 
                        <Text style={[MainStyle.titleText,{padding:10}]}>Add staff</Text>   
                    </TouchableOpacity>
                </View>

                <FlatList data={staffData} renderItem={({item})=>(
                    <View style={MainStyle.itemListContainer}>
                        <Text style={MainStyle.itemListText}>{item.firstname} {item.lastname}</Text>
                        <View style={[{justifyContent:"space-between"},MainStyle.rowHorizontal]}>
                            <TouchableOpacity onPress={()=>navigation.navigate('UpdateStaff',{item})}>
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
                    <Text style={MainStyle.modelText}>Are you sure you want to delete {selectedStaff && selectedStaff.firstname}?</Text>
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