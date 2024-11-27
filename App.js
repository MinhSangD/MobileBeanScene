
import {  Text } from 'react-native';
import Login from './assets/src/screens/Login';
import MenuList from './assets/src/screens/Menu/MenuList'

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddMenu from './assets/src/screens/Menu/AddMenu'
import UpdateMenu from './assets/src/screens/Menu/UpdateMenu'
import MainStyle from './assets/src/Styles/MainStyle';
import StaffList from './assets/src/screens/Staff/StaffList'
import AddStaff from './assets/src/screens/Staff/AddStaff'
import UpdateStaff from './assets/src/screens/Staff/UpdateStaff'
import CategoryList from './assets/src/screens/Category/CategoryList';
import AddCategory from './assets/src/screens/Category/AddCategory';
import UpdateCategory from './assets/src/screens/Category/UpdateCategory';
import OrderList from './assets/src/screens/Order/OrderList';
import Report from './assets/src/screens/Report';
import Checkout from './assets/src/screens/Order/Checkout'
import Search from './assets/src/screens/Search'
import ShowOrders from './assets/src/screens/Order/ShowOrders';
const Stack=createStackNavigator();

const BottomTabs=createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptionstyle}>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="ManagerDashBoard" component={ManagerDashBoard} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="StaffDashBoard" component={StaffDashBoard} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Checkout" component={Checkout}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


function categoryScreens(){
  return(
    <Stack.Navigator screenOptions={screenOptionstyle}>
      <Stack.Screen name="CategoryList" component={CategoryList} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="AddCategory" component={AddCategory} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="UpdateCategory" component={UpdateCategory} options={{headerShown:false}}></Stack.Screen>
      
    </Stack.Navigator>
  )
}function menuScreens(){
  return(
    <Stack.Navigator screenOptions={screenOptionstyle}>
      <Stack.Screen name="MenuList" component={MenuList} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="AddMenu" component={AddMenu} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="UpdateMenu" component={UpdateMenu} options={{headerShown:false}}></Stack.Screen>
      
    </Stack.Navigator>
  )
}function staffScreens(){
  return(
    <Stack.Navigator screenOptions={screenOptionstyle}>
      <Stack.Screen name="StaffList" component={StaffList} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="AddStaff" component={AddStaff} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="UpdateStaff" component={UpdateStaff} options={{headerShown:false}}></Stack.Screen>
      
    </Stack.Navigator>
  )
}
function ManagerDashBoard(){
  return(
    <BottomTabs.Navigator screenOptions={screenOptionstyle}>
      <BottomTabs.Screen name="Menu" component={menuScreens}></BottomTabs.Screen>
      <BottomTabs.Screen name="Staff" component={staffScreens}></BottomTabs.Screen>
      <BottomTabs.Screen name="Category" component={categoryScreens}></BottomTabs.Screen>
      <BottomTabs.Screen name="Report" component={Report}></BottomTabs.Screen>
      <BottomTabs.Screen name="OrderList" component={OrderList}></BottomTabs.Screen>
      <BottomTabs.Screen name="Search" component={Search}></BottomTabs.Screen>
      <BottomTabs.Screen name="ShowOrders" component={ShowOrders}></BottomTabs.Screen>
    </BottomTabs.Navigator>
  )
}

const screenOptionstyle={
  headerRight:()=>(
    <Text style={MainStyle.headerStyleText}>Bean Scene</Text>
  ),
  tabBarActiveTintColor:'white',
  tabBarInactiveTintColor:'black'
}
function StaffDashBoard(){
  return(
    <BottomTabs.Navigator screenOptions={screenOptionstyle}>
      <BottomTabs.Screen name="OrderList" component={OrderList}></BottomTabs.Screen>
      <BottomTabs.Screen name="Search" component={Search}></BottomTabs.Screen>
      <BottomTabs.Screen name="ShowOrders" component={ShowOrders}></BottomTabs.Screen>
    </BottomTabs.Navigator>
  )
}