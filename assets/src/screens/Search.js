import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, TextInput, FlatList, Picker, TouchableOpacity } from 'react-native';

import MainStyle from '../Styles/MainStyle';
import Header from '../Layouts/Header';

export default function Search() {
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    console.log("getCategories method is called");
    var url = "https://localhost:7061/Category";
    var header = new Headers({});
    var options = {
      method: 'GET',
      headers: header
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setCategoryData(data);
    } catch (error) {
      console.log("Error is: " + error.message);
    }
  };

  const searchProduct = async (text, cat) => {
    console.log("searchProduct method is called");
    let url = `https://localhost:7061/Menu`;
    if (text && cat) {
      url += `/${text}/${cat}`;
    } else if (text) {
      url += `/${text}`;
    } else if (cat) {
      url += `/${null}/${cat}`;
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

  return (
    <SafeAreaView style={MainStyle.safeAreaView}>
      <ScrollView contentContainerStyle={MainStyle.container}>
        <View style={MainStyle.container}>
          <Header />
          <View style={MainStyle.rowHorizontal}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                placeholder="Product name"
                style={MainStyle.textInput}
                onChangeText={(text) => setText(text)}
              />
            </View>
            <Picker
              style={MainStyle.textInput}
              onValueChange={(category) => setCategory(category)}
            >
              {categoryData?.map((item, key) => (
                <Picker.Item label={item.name} value={item.name} key={key} />
              ))}
              <Picker.Item label={"All Category"} value={" "} />
            </Picker>
            <TouchableOpacity
              style={[MainStyle.orangeButton, { width: 100 }]}
              onPress={() => {
                if (!text && category && category.trim() !== "") {
                  searchProductbyCat(category); // Search by category only
                } else {
                  searchProduct(text, category); // Search by text and category
                }
              }}// this if part was created by me and modified by ChatGPT (category.trim() !== "")
            >
              <Text>Search for Item</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={productData}
            renderItem={({ item }) => (
              <View style={[MainStyle.rowHorizontal, { justifyContent: 'space-between' }]}>
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
              </View>
            )}
          />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
