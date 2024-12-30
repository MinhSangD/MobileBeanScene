import { StatusBar } from 'expo-status-bar';
import { Text, View ,SafeAreaView,ScrollView, TextInput,TouchableOpacity, Picker} from 'react-native';
import React,{useEffect,useState} from 'react';

import {Ionicons, AntDesign} from '@expo/vector-icons';

import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';

import {useIsFocused} from "@react-navigation/native";

import RenderProduct from '../../Components/RenderProduct';
import { widthPercentageToDP } from 'react-native-responsive-screen';
export default function ShowOrders({props,navigation}) {
    const [OrderData,setOrderData]=useState([])
    const isFocused = useIsFocused()
    const [status,setStatus]=useState("")
    const [editableStatusOrderId, setEditableStatusOrderId] = useState(null)
    const [updatedStatusValue,setUpdatedStatusValue] = useState('')
    const getOrders = async()=>{
      var url =`https://localhost:7061/Orders`
      var header = new Headers({})
      var options={ 
      method : 'GET',
      headers : header
    }
    
    try { 
      const response = await fetch (url,options)
      const data = await response.json()
      setOrderData(data)
      
    }
    catch (error){
      console.log(error.message)
    }}
    useEffect(()=>{
      if(isFocused){
        getOrders()
      }
    },[props,isFocused])
    const UpdateOrderStatus = async (orderId, status)=>{
       var url =`https://localhost:7061/Orders/${orderId}/status`;
       var header = new Headers ({})
       header.append ('Content-Type','application/json');
       var options ={
        method:'Put',
        headers : header, 
        body:JSON.stringify(status)
       }
       try{ 
        const response = fetch (url, options)
  
       }
       catch(error){
        console.log(error.message)
       }
  
    }
    return (
      <SafeAreaView style={MainStyle.safeAreaView}>
          <ScrollView contentContainerStyle={MainStyle.container}>
              <View style={MainStyle.container}>
                  <Header></Header>
                  <View style = {MainStyle.pageTitleContainer}>
                      <Text style={MainStyle.titleText}>Order List</Text>
                  </View>
                  <View style= {{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style ={MainStyle.labelItem}>Order No</Text>
                    <Text style ={MainStyle.labelItem}>Date</Text>
                    <Text style ={MainStyle.labelItem}>Status</Text>
                  </View>
                  {
                    OrderData.map((item) =>{
                      const isEditable = editableStatusOrderId===item._id
                      return (
                        <View style={{justifyContent:'space-between',flexDirection:'row',borderBottomColor:'#083944',borderLeftColor:'rgba(0, 0, 0, 0)',borderTopColor:'rgba(0, 0, 0, 0)',borderRightColor:'rgba(0, 0, 0, 0)',borderWidth:3,marginBottom:3}}>
                            <Text style = {MainStyle.labelSmallItem}>{item.orderNo}</Text>
                            
                            <Text style = {[MainStyle.labelSmallItem,MainStyle.width30]}>{item.dateTime}</Text>
                            {
                              isEditable?(
                                
                                <View style={MainStyle.rowHorizontal}>
                                  <Picker
                                    selectedValue={updatedStatusValue || item.status} 
                                    onValueChange={(itemValue) => {
                                      setUpdatedStatusValue(itemValue || item.status); 
                                    }}
                                  >
                                    <Picker.Item label="In Progress" value="In Progress" />
                                    <Picker.Item label="Completed" value="Completed" />
                                  </Picker>
                                  <View style={MainStyle.rowHorizontal}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        
                                        UpdateOrderStatus(item._id, updatedStatusValue || item.status);
                                        setEditableStatusOrderId(null); 
                                        item.status = updatedStatusValue || item.status; 
                                      }}
                                    >
                                      <AntDesign name="save" color="white" size={18} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      onPress={() => {
                                        // Exit edit mode without saving
                                        setEditableStatusOrderId(null);
                                      }}
                                    >
                                      <AntDesign name="close" color="white" size={18} />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ):(
                                <TouchableOpacity onPress = {()=>{
                                  setEditableStatusOrderId(item._id);
  
                                }} style ={[ item.status =='In Progress'?{
                                  backgroundColor :"blue",
                                  height:40,
                                  padding: 3,
                                  alignItems:'center',
                                  width:widthPercentageToDP("30%")
                                }:item.status == 'Completed'?{
                                  backgroundColor:'green',
                                  height: 40,
                                  padding:3,
                                  alignItems:'center',
                                  width:widthPercentageToDP("30%")
                                }:
                                {}]}>
                                  <Text style = {MainStyle.labelSmallItem}>{item.status}</Text>
                                </TouchableOpacity>
                              )
                            }
                            
                        </View>
                      )
                    })
                  }
                  <StatusBar style="auto" />
              </View>
          </ScrollView>
      </SafeAreaView>
      
    );
  }