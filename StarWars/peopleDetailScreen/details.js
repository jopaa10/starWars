import React from 'react';
import {View, Text} from 'react-native';

const Details = ({route}) => {
  return (
    <View style={{backgroundColor: 'white', height: 700}}>
      <Text style={{color: 'black'}}>{route.params.user}</Text>
      <Text style={{color: 'black'}}>{route.params.hair}</Text>
    </View>
  );
};

export default Details;
