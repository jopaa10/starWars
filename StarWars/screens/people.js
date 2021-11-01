import 'react-native-gesture-handler';
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//dimension
const windowWidth = Dimensions.get('window').width;

//navigation hook
import {useNavigation} from '@react-navigation/native';

//stack nav
const peopleStack = createStackNavigator();

import Details from '../peopleDetailScreen/details';

import {FavContext} from '../App';

export const peopleDetails = () => (
  <peopleStack.Navigator>
    <peopleStack.Screen name="People" component={People} />
    <peopleStack.Screen name="Details" component={Details} />
  </peopleStack.Navigator>
);

const People = () => {
  const [peopleData, setPeopleData] = useState([]);
  const [search, setSearch] = useState('');
  const [favourites, setFavourites] = useState([]);

  const {state, dispatch} = useContext(FavContext);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPeopleData(data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addToFav = async person => {
    let newFavList = [...favourites, person];
    setFavourites(newFavList);

    await AsyncStorage.setItem('people-fav', JSON.stringify(newFavList));
  };

  /* useEffect(() => {
    let peopleFav = AsyncStorage.getItem('people-fav');
    console.log(peopleFav);
  }, []); */

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize={'none'}
          clearButtonMode={'always'}
          value={search}
          onChangeText={text => setSearch(text)}
          placeholder="Search"
          placeholderTextColor={'black'}
        />
      </View>
      <ScrollView style={styles.peopleContainer}>
        {peopleData
          .filter(item => {
            if (search == '') {
              return item;
            } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
              return item;
            }
          })
          .map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() =>
                  navigation.navigate('Details', {
                    user: item.name,
                    hair: item.hair_color,
                  })
                }>
                <View style={styles.peopleList}>
                  <View key={item.key}>
                    <Image
                      source={require('../images/square2.png')}
                      style={styles.image}
                    />
                    <Text style={styles.text}>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        dispatch({type: 'ADD_TO_FAV', payload: {content: item}})
                      }>
                      <Text style={styles.text}>Add to favorites</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      {/* 
      <FavouritesPeople favouritesPeople={favourites} /> */}
    </>
  );
};
export default People;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#fff',
    padding: 2,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  peopleContainer: {
    backgroundColor: '#fff',
    flex: 1,
    width: windowWidth,
  },
  peopleList: {
    width: windowWidth * 0.8,
    height: 'auto',
    paddingVertical: windowWidth * 0.1,
    marginVertical: windowWidth * 0.1,
    marginHorizontal: windowWidth * 0.1,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    alignContent: 'center',
  },
  image: {
    borderColor: 'black',
    borderWidth: 1,
    width: windowWidth * 0.7,
    height: 250,
  },
  text: {
    textAlign: 'center',
    paddingTop: windowWidth * 0.05,
    color: 'black',
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
  },
});
