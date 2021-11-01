import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

//dimension
const windowWidth = Dimensions.get('window').width;

import {FavContext} from '../App';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Favourites = () => {
  let [data, setData] = useState([]);
  let [movieData, setMovieData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {state, dispatch} = useContext(FavContext);

  /*   useEffect(async () => {
    try {
      data = await AsyncStorage.getItem('people-fav');
      movieData = await AsyncStorage.getItem('movies-fav');
      if (data) {
        setData(JSON.parse(data));
      }
      if (movieData) {
        setMovieData(JSON.parse(movieData));
      }
      console.log(data);
      console.log(movieData);
    } catch (error) {
      console.log(error);
    }
  }, []); */

  /*   const removeFromFav = async () => {
    await AsyncStorage.removeItem('people-fav');
    onRefresh();
  };

  useEffect(() => {
    removeFromFav();
  }, []);

  const removeMoviesFromFav = async () => {
    await AsyncStorage.removeItem('movies-fav');
    onRefresh();
  };

  useEffect(() => {
    removeMoviesFromFav();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    data = await AsyncStorage.getItem('people-fav');

    if (data) {
      setData(JSON.parse(data));
    } else {
      setData([]);
    }

    movieData = await AsyncStorage.getItem('movies-fav');

    if (movieData) {
      setMovieData(JSON.parse(movieData));
    } else {
      setMovieData([]);
    }

    wait(2000).then(() => setRefreshing(false));
  }, []); */

  console.log(state);

  return (
    <ScrollView
    /* refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } */
    >
      {/* <View style={{backgroundColor: 'white', height: 'auto'}}>
        {data.length < 1 || data == null ? (
          <View>
            <Text>There is no people in favourites</Text>
          </View>
        ) : (
          state.map(item => {
            return (
              <View style={styles.peopleList}>
                <View key={item.key}>
                  <Image
                    source={require('../images/square2.png')}
                    style={styles.image}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                  <TouchableOpacity onPress={() => removeFromFav(item)}>
                    <Text style={styles.text}>Remove from favorites</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </View> */}
      {state.map(item => {
        return (
          <View style={styles.peopleList}>
            <View key={item.key}>
              <Image
                source={require('../images/square2.png')}
                style={styles.image}
              />
              <Text style={styles.text}>{item.content.title}</Text>
              <Text style={styles.text}>{item.content.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  dispatch({type: 'REMOVE_FROM_FAV', payload: item.id})
                }>
                <Text style={styles.text}>Remove from favorites</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      {/* <View style={{backgroundColor: 'white', height: 'auto'}}>
        {movieData.length < 1 || movieData == null ? (
          <View>
            <Text>There is no movies in favourites</Text>
          </View>
        ) : (
          movieData.map(item => {
            return (
              <View style={styles.peopleList}>
                <View key={item.key}>
                  <Image
                    source={require('../images/square2.png')}
                    style={styles.image}
                  />
                  <Text style={styles.text}>{item.title}</Text>
                  <TouchableOpacity onPress={() => removeMoviesFromFav(item)}>
                    <Text style={styles.text}>Remove from favorites</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </View> */}
    </ScrollView>
  );
};

export default Favourites;

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
    backgroundColor: 'white',
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
