import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

export default StyleSheet.create({
logoTitle:{
    color:"#2F6672",
    fontFamily:"Open Sans Light",
    fontSize:24,
    fontWeight:'bold',
   
    
},
logoSubTitle:{
    color:"#4AA1B5",
    fontFamily:"Open Sans Light",
    fontSize:24,
    fontWeight:'bold',
},
logoContainer:{
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    
    marginBottom:10,
},container:{
    justifyContent:"flex-start",
},safeAreaView:{
    flex:1,
    backgroundColor:"#4AA1B5"
},
textInput:{
    height:40,
    borderRadius:50,
    backgroundColor:'#4AA1B5',
    width:wp("40%"),
    marginBottom:15,
    borderColor:"#083944",
    borderWidth:2,
    
},
orangeButton:{
    height:40,
   
    borderRadius:4,
    
    backgroundColor:'#2F6672',
    width:wp("40%"),
    alignItems: 'center',
    justifyContent: 'center',
    alignItems:"center",
},
formContainer:{
    
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
    
},buttonFormContainer:{
    
    width: '100%',
    height: '1%',
    justifyContent: 'center',
    alignItems: 'center'
    
},
headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    width:wp("100%"),
    backgroundColor:"#2F6672"

},whiteButton:{
    backgroundColor:"white",
    borderRadius:50,
    padding:10,
    
},titleText:{
    fontSize:24
},blueButton:{
    flexDirection:"row"
},orderListRightColumn:{
    width: wp("25%"),
    alignItems:'center',
    justifyContent:'center'
},orderListLeftColumn:{
    width: wp("60%")
},orderListRow:{
    flexDirection:'row',
    backgroundColor:'#f2f2f2',
    padding:15,
    borderBottomWidth:1,
    borderBottomColor:'grey'

},
itemListContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:wp("100%"),
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:"white"
},itemListText:{
    fontSize: 18,
    fontWeight:'bold'
},rowHorizontal:{
    flexDirection:'row',
    
},modalContainer:{
    justifyContent:'center',
    flex:1,
    alignItems:'center',
    backgroundColor:'rgba(8,57,68,0.75)'
},
modalContent:{
    backgroundColor:'white',
    padding:20,
    alignItems:'center'
},modalButton:{
    padding:10,
    backgroundColor:'#083944',
    marginRight:10,
    marginTop:10

},pageTitleContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:wp("100%"),
    
    padding:10
},contentContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:16
},
blueContainerShort:{
    backgroundColor:'#fff',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    height:40,
    width:wp("35%"),
    marginRight:10
},
cartContainerList:{
    flexDirection:'row',
    borderBottomColor:'white',
    borderBottomWidth:1,
    justifyContent:'space-between',
    paddingTop:10,
    paddingBottom:10,
    width:wp("80%")
},
})