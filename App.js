
import {  Text } from 'react-native';
import Login from './assets/src/screens/Login';
import MenuList from './assets/src/screens/Menu/MenuList'

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/AntDesign'; // Adjust the library based on your setup
import Entypo from '@react-native-vector-icons/entypo';

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name = "Login"component={Login} ></Stack.Screen>
          <Stack.Screen name="ManagerDashBoard" component={ManagerDashBoard} ></Stack.Screen>
          <Stack.Screen name="StaffDashBoard" component={StaffDashBoard} ></Stack.Screen>
          <Stack.Screen name="Checkout" component={Checkout}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


function categoryScreens(){
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoryList" component={CategoryList}></Stack.Screen>
      <Stack.Screen name="AddCategory" component={AddCategory} ></Stack.Screen>
      <Stack.Screen name="UpdateCategory" component={UpdateCategory} ></Stack.Screen>
      
    </Stack.Navigator>
  )
}function menuScreens(){
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MenuList" component={MenuList} ></Stack.Screen>
      <Stack.Screen name="AddMenu" component={AddMenu} ></Stack.Screen>
      <Stack.Screen name="UpdateMenu" component={UpdateMenu} ></Stack.Screen>
      
    </Stack.Navigator>
  )
}function staffScreens(){
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StaffList" component={StaffList} ></Stack.Screen>
      <Stack.Screen name="AddStaff" component={AddStaff} ></Stack.Screen>
      <Stack.Screen name="UpdateStaff" component={UpdateStaff} ></Stack.Screen>
      
    </Stack.Navigator>
  )
}
function ManagerDashBoard(){
  return(
    <BottomTabs.Navigator screenOptions={{ headerShown: false, tabBarActiveBackgroundColor: "#083944" }}>
    <BottomTabs.Screen name="Menu" component={menuScreens} options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome name="cutlery" color={focused ? "#EBC136" : "#083944"} size={24} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Staff"
      component={staffScreens}
      options={{
        tabBarIcon: ({ focused }) => (
          <Icon name="user" color={focused ? "#EBC136" : "#083944"} size={24} />
        ),
      }}
    />
      <BottomTabs.Screen name="Category" component={categoryScreens}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon name ="book" color={focused ? "#EBC136" : "#083944"} size={24} />
        ),
      }}
    />
      <BottomTabs.Screen name="Report" component={Report}
      options={{
        tabBarIcon: ({focused}) => (
          <Entypo name ="bar-graph" color={focused ? "#EBC136" : "#083944"} size={24} />
        ),
      }}
    />
      <BottomTabs.Screen name="OrderList" component={OrderList}options={{
        tabBarIcon: ({focused}) => (
          <Entypo name ="ticket" color={focused ? "#EBC136" : "#083944"} size={24} />
        ),
      }}
    />
      <BottomTabs.Screen name="Search" component={Search}options={{
        tabBarIcon: ({focused}) => (
          <Icon name ="search1" color={focused ? "#EBC136" : "#083944"} size={24} />
        ),
      }}
    />
      <BottomTabs.Screen name="ShowOrders" component={ShowOrders} options={{
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons name ="list-status" color={focused ? "#EBC136" : "#083944"} size={24} />
        ),
      }}
    />
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
    <BottomTabs.Navigator screenOptions={{ headerShown: false ,tabBarActiveBackgroundColor: "#083944" }} >
      <BottomTabs.Screen name="OrderList" component={OrderList} options={{
        tabBarIcon: ({focused}) => (
          <Entypo name ="ticket" color={focused ? "#EBC136" : "#083944"} size={24} />
        ),
      }}></BottomTabs.Screen>
      <BottomTabs.Screen name="Search" component={Search} options={{
        tabBarIcon: ({focused}) => (
          <Icon name ="search1" color={focused ? "#EBC136" : "#083944"} size={24} />
        ),
      }}></BottomTabs.Screen>
      <BottomTabs.Screen name="ShowOrders" component={ShowOrders} options={{
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons name ="list-status" color={focused ? "#EBC136" : "#083944"} size={24} />
        ),
      }}></BottomTabs.Screen>
    </BottomTabs.Navigator>
  )
}