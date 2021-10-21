import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

export const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMoviesData(data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {moviesData.map(item => {
        return (
          <View key={item.key}>
            <Text style={{color: 'black'}}>
              {item.title}, {item.director}, {item.release_date},{' '}
              {item.producer}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
export default Movies;
