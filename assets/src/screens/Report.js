import { StatusBar } from 'expo-status-bar';
import { Text, View ,SafeAreaView,ScrollView, Dimensions} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import {Ionicons, AntDesign} from '@expo/vector-icons';

import MainStyle from '../Styles/MainStyle';

import Header from '../Layouts/Header';
import { useIsFocused } from '@react-navigation/native';
import { useEffect ,useState} from 'react';


export default function Report({props,navigation}) {
  const [orderDataa,setOrderData] = useState([])
  const isFocused = useIsFocused();
  const [totalSale, setTotalSale] = useState()
  const header = new Headers({})
  useEffect(() =>
  {if (isFocused)getOrders()
    
  },[props,isFocused])
 
  const getOrders = async()=>{var options={ 
    method : 'GET',
    
    headers : header
  }
  var url ="https://localhost:7061/Orders"
  try { 
    const response = await fetch (url,options)
    const data = await response.json()
    setOrderData(data)
  }
  catch (error){
    console.log(error.message)
  }}
  
  const chartConfig = {
    backgroundColor :"white",
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    decimalPlaces:2,
    color:(opacity = 0 ) =>`rgba(0,0,0,${opacity})`,
    style:{
      borderRadius:16
    },
    propsForLabels:{
      fontSize:14
    },
    decimalPlaces:0

  }
  const calculateSalesBasedOnDay = () =>{
    const dailySales =[]
    orderDataa.forEach((order)=>{
      const date= order.dateTime.split(',')[0]
      if (dailySales[date]){
        dailySales[date]++
      }else{
        dailySales[date] = 1
      }
    })
    return dailySales
  }
  const formatWeeklySalesData=()=>{
    const daysOfWeek=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    const dailySalesCount = calculateSalesBasedOnDay()
    const labels = Object.keys(dailySalesCount).sort(
      (a,b) =>daysOfWeek.indexOf(a)-daysOfWeek.indexOf(b)
    )
    const data = labels.map((date)=>dailySalesCount[date])
    
    return{
      labels,
      datasets:[{data}]
    }
    
  }
  const calculateedOrderStatusCount = (status) =>{
    const count = orderDataa.filter((order)=>order.status===status).length
    return count
  }
 
  const completedCount = calculateedOrderStatusCount("Completed")
  const inProgress = calculateedOrderStatusCount("In Progress")
  const orderActitity ={
    labels:["Completed","In Progress"],
    datasets:[{data:[completedCount,inProgress]}]
  }
  const weeklyStatusData = formatWeeklySalesData()
  return (
    <SafeAreaView style={MainStyle.safeAreaView}>
        <ScrollView contentContainerStyle={MainStyle.container}>
            <View style={MainStyle.container}>
                <Header></Header>
                  <View>
                    <Text>Weekly order status</Text>
                  </View>
                  <View><Text>{orderDataa.length} Orders so far!</Text></View>
                <ScrollView horizontal>
                <BarChart data = {weeklyStatusData}  height ={220} chartConfig = {chartConfig} width={Dimensions.get("window").width > 500? Dimensions.get("window").width :Dimensions.get("window").width* 1.5} fromZero/>
                </ScrollView>
                <View><Text>{inProgress} in progress and {completedCount} completed</Text></View>
                <View>
                <BarChart data = {orderActitity} height ={220} chartConfig = {chartConfig} width={Dimensions.get("window").width > 500? Dimensions.get("window").width :Dimensions.get("window").width* 1.5} fromZero/>                    
                </View>
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    </SafeAreaView>
    
  );
}