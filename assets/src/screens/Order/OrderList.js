import { StatusBar } from 'expo-status-bar';
import { Text, View ,SafeAreaView,ScrollView, Dimensions ,TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';

import {Ionicons, AntDesign} from '@expo/vector-icons';

import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';

import {useIsFocused} from "@react-navigation/native";

import ProductOrder from "./ProductOrder"
import RenderCategory from '../../Components/RenderCategory';
export default function Orders({props,navigation,route}){
  const [productData,setProductData]=useState([]);
  const [categoryData,setCategoryData]=useState([]);
  const [orderDetails,setOrderDetails]=useState([]);

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

  const searchProductbyCat = async (cat) => {
    console.log("searchProductbyCat method is called");
    let url = `https://localhost:7061/Category/items`;
    if (cat) {
      url += `/${cat}`;
    }

    var header = new Headers({});
    var options = {
      method: 'GET',
      headers: header
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setProductData(data);
    } catch (error) {
      console.log("Error is: " + error.message);
    }
  };


    useEffect(()=>{
      if(route.params?.orderDetails){
        setOrderDetails(route.params?.orderDetails)
      }
        if(isFocused){
          getCategory();
        }
    },[props,isFocused,route.params?.orderDetails]);


  return (
    <SafeAreaView style={MainStyle.safeAreaView}>
        <ScrollView contentContainerStyle={MainStyle.container}>
            <View style={MainStyle.container}>
                <Header></Header>
                <View>
                  {
                  categoryData.map((category)=>{
                    console.log(category)
                    return(
                      <View>
                        <TouchableOpacity onPress={()=>navigation.navigate("ProductOrder",{ category: category.name })}>
                          <RenderCategory category = {category}/>
                        </TouchableOpacity>
                      </View>
                    )
                  })
                  }
                </View>
                
                {/* <View style={[MainStyle.pageTitleContainer,{justifyContent:"flex-end"}]}>
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
              </View> */}
            </View>
        </ScrollView>
    </SafeAreaView>
    
  );
}