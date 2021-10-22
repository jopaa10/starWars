/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomNav from './bottomNav';
import {Text, View} from 'react-native';

const App = () => {
  let [text, setText] = useState();
  const [index, setIndex] = useState();

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/`)
      .then(res => res.json())
      .then(data => {
        console.log(data.results);
        const index = Math.floor(Math.random() * data.results.length);
        setIndex(index);
        setText(data.results[index].population);
        console.log(index);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <View style={{height: 20}}>
        <Text style={{color: 'black'}}>Planet population: {text}</Text>
      </View>
      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>
    </>
  );
};

export default App;
