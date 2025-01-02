import { StatusBar } from 'expo-status-bar';
import { Text, View ,SafeAreaView,ScrollView, TextInput,TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';

import {Ionicons, AntDesign} from '@expo/vector-icons';

import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';

import {useIsFocused} from "@react-navigation/native";

import RenderProduct from '../../Components/RenderProduct';

export default function Orders({props,navigation,route}){
  const [productData,setProductData]=useState([]);
  const [orderDetails,setOrderDetails]=useState([]);

  const isFocused=useIsFocused();

    const getProducts=async()=>{

        console.log("getProducts method is called");
        var url="https://localhost:7061/Menu";
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

            setProductData(data);

        }
        catch(error){
            console.log("Error is: "+error.message);
        }
        
    }

    useEffect(()=>{
      if(route.params?.orderDetails){
        setOrderDetails(route.params?.orderDetails)
      }
        if(isFocused){
        getProducts();
        }
    },[props,isFocused,route.params?.orderDetails]);


  return (
    <SafeAreaView style={MainStyle.safeAreaView}>
        <ScrollView contentContainerStyle={MainStyle.container}>
            <View style={MainStyle.container}>
                <Header></Header>
                <View style={[MainStyle.pageTitleContainer,{justifyContent:"flex-end"}]}>
                  <TouchableOpacity style={[MainStyle.blueButton,{backgroundColor:"white",borderRadius:23}]} onPress={()=>navigation.navigate('Checkout',{orderDetails})} > 
                    <Text style={[MainStyle.titleText,{padding:10}]}>Checkout</Text>
                  </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
              <View>
                {
                  productData.map((singleProduct)=>{
                    console.log(singleProduct)
                    return(
                      <View>
                        <RenderProduct product={singleProduct} orderDetails={orderDetails} setOrderDetails={setOrderDetails}/>
                      </View>
                    )
                  })
                }
              </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    
  );
}