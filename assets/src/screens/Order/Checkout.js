import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View ,SafeAreaView,ScrollView,TouchableOpacity,TextInput, Pressable,Picker} from 'react-native';

import {Ionicons, AntDesign} from '@expo/vector-icons';

import MainStyle from '../../Styles/MainStyle';

import Header from '../../Layouts/Header';
import {Entypo} from '@expo/vector-icons';


export default function Checkout({route,navigation}) {
  const[orderDetails,setOrderDetails] = useState(
    route.params.orderDetails || []
  )
  const [table,setTable] = useState("")
  const [tableData,setTableData] = useState([])
  const[notes,setNotes]=useState('');
  const[name,setName]=useState('');
  const[currentDateTime,setCurrentDateTime]=useState();


  const options={
    weekday:'long',
    day:'numeric',
    month:'long',
    year:'numeric'
  }

  useEffect(()=>{

    const formattedDateTime=new Date().toLocaleDateString('en-Us',options);
    console.log(formattedDateTime);
    setCurrentDateTime(formattedDateTime);
    getTables();
  },[]);

  const reduceQuantity=(orderedProduct)=>{
    console.log("- button is clicked");

    const checkIfProductAlreadyExist=orderDetails.find((product)=>product._id===orderedProduct._id);

    if(checkIfProductAlreadyExist){
        if(checkIfProductAlreadyExist.quantity>1){
            console.log("Product already exist in the cart - if");
            checkIfProductAlreadyExist.quantity-=1;
            setOrderDetails([...orderDetails]);
        }
        else{
            console.log("Product already exist in the cart - else");
            checkIfProductAlreadyExist.quantity=0;
            setOrderDetails([...orderDetails]);
            setOrderDetails(orderDetails.filter((product)=>product._id!==orderedProduct._id));
        }
    }
    
    console.log(orderDetails);
}

const addQuantity=(orderedProduct)=>{
    console.log("+button is clicked");
    const checkIfProductAlreadyExist=orderDetails.find((product)=>product._id===orderedProduct._id);

    //console.log(checkIfProductAlreadyExist);

    if(checkIfProductAlreadyExist){
        //console.log("Product already exist in the cart");
        checkIfProductAlreadyExist.quantity+=1;
        setOrderDetails([...orderDetails]);
    }
    else{
        //console.log("Product does not already exist in the cart");
        setOrderDetails([...orderDetails,{...orderedProduct,quantity:1}]);
       
    }
    console.log(orderDetails);
}

const getProductQuantity=(productId)=>{
  console.log(orderDetails);
  const result=orderDetails.find((product)=>product._id===productId);
  console.log(result);
  return result?result.quantity:0;
}

const emptyOrder=()=>{
 setOrderDetails([]);

 navigation.navigate({name:'Take Orders', params: {orderDetails:[]}})

}
const getTables=async()=>{
  var url = 'https://localhost:7061/Table'
  var header = new Headers({})
  var options={
    method : 'Get',
    headers: header,
    
  }
  try{

    const response= await fetch(url,options);
    console.log(response);

    const data= await response.json();
    console.log(data);
        
    setTableData(data);

}
catch(error){
    console.log("Error is: "+error.message);
}
}
const addToOrder=async ()=>{
  console.log("buy button is clicked");

  const order = {
    name: name,
    note: notes,
    dateTime: currentDateTime,
    table:table,
    status: "In Progress",
    menuIds: orderDetails.map((item) => ({
        _id: item._id,  // Assuming item._id exists, as it comes from the cart
        quantity: item.quantity
    }))
};

  console.log(order)

  var url="https://localhost:7061/Orders";
  var header=new Headers({});
  header.append('Content-Type','application/json');

  var options={
      method:'POST',
      headers:header,
      body:JSON.stringify(order)
  }

  try{

      const response= await fetch(url,options);
      console.log(response)
      console.log('Order added successfully');
      navigation.navigate({name:'OrderList', params: {orderDetails:[]}})

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
                    <Text style={MainStyle.titleText}>Orders List</Text>
                    <TouchableOpacity style={MainStyle.whiteButton} onPress={()=>navigation.navigate({name:"OrderList",params:{orderDetails:orderDetails}})}>
                         <Text >Continue Shopping</Text>
                    </TouchableOpacity>
                </View>

                <View style={MainStyle.contentContainer}>
                   <Text style={{fontSize:30}}>Items in Cart</Text>
                   <View>
                    {
                      orderDetails.map((item)=>(
                        <View style={MainStyle.cartContainerList}>
                          <Text style={MainStyle.whiteText}>{item.name}</Text>
                          <View style={MainStyle.orderListRightColumn}>
                            <View style={[MainStyle.rowHorizontal,{flex:1}]}>
                                <TouchableOpacity style={MainStyle.minusOrangeContainer} onPress={()=>reduceQuantity(item)}>
                                    <Entypo name="minus" size={20} color="#fff" />
                                </TouchableOpacity>
                                <Text style={MainStyle.itemQuantity}>{getProductQuantity(item._id)}</Text>
                                <TouchableOpacity style={MainStyle.plusOrangeContainer} onPress={()=>addQuantity(item)}>
                                <Entypo name="plus" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>

                      ))
                    }
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Picker style={MainStyle.textInput} onValueChange={(table)=>setTable(table)}>
                            {
                                tableData?.map((item,key)=>(
                                    <Picker.Item label={item.code} value={item.code} key={key}></Picker.Item>
                                ))
                            }
                        </Picker>
                        
                      <TextInput multiline placeholder="Enter notes" style={[MainStyle.textInput,{minHeight:101,borderRadius:5}]}  numberOfLines={4} onChangeText={(notes)=>setNotes(notes)}></TextInput>
                      <TextInput placeholder="Enter name here (optional)" style={MainStyle.textInput} onChangeText={(name)=>setName(name)}></TextInput>
                    </View>
                    <View style={MainStyle.rowHorizontal}>
                      <Pressable style={[MainStyle.blueContainerShort,{backgroundColor:"#2F6672"}]} onPress={addToOrder}>
                        <Text >Buy</Text>
                      </Pressable>
                      <Pressable style={MainStyle.blueContainerShort} onPress={emptyOrder}>
                        <Text >Empty Order</Text>
                      </Pressable>
                    </View>
                   </View>
                   
                </View>
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    </SafeAreaView>
    
  );
}