import React from 'react';
import MainStyle from '../Styles/MainStyle';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';

import {Entypo} from '@expo/vector-icons';

const RenderCategory=({category,orderDetails,setOrderDetails})=>{

return(
    
        <View style={MainStyle.orderListRow}>
            
            <View style={MainStyle.orderListLeftColumn}>
                <Text style={MainStyle.fontBoldBig}>{category.name}</Text>
            </View>
            <View style={MainStyle.orderListRightColumn}>
                <View style={MainStyle.rowHorizontal}>
                    <Entypo name ="arrow-with-circle-right" size ={45}></Entypo>
                </View>
            </View>
            
        </View>
 
    )
}

export default RenderCategory;
