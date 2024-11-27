import React from 'react';
import MainStyle from '../Styles/MainStyle';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';

import {Entypo} from '@expo/vector-icons';

const RenderProduct=({product,orderDetails,setOrderDetails

})=>{
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
    return(
        <View style={MainStyle.orderListRow}>
            <View style={MainStyle.orderListLeftColumn}>
                <Text style={MainStyle.fontBoldBig}>{product.name}</Text>
                <Text>{product.description}</Text>
                <Text style={MainStyle.fontBold}>${product.price}</Text>
            </View>
            <View style={MainStyle.orderListRightColumn}>
                <View style={MainStyle.rowHorizontal}>
                    <TouchableOpacity style={[MainStyle.whiteButton,{padding:0,backgroundColor:"#4AA1B5"}]} onPress={()=>reduceQuantity(product)}>
                        <Entypo name="minus" size={20} color="#083944" />
                    </TouchableOpacity>
                    <Text style={{fontSize:15, padding:0}}>{getProductQuantity(product._id)}</Text>
                    <TouchableOpacity style={[MainStyle.whiteButton,{padding:0,backgroundColor:"#4AA1B5"}]} onPress={()=>addQuantity(product)}>
                     <Entypo name="plus" size={20} color="#083944" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default RenderProduct;