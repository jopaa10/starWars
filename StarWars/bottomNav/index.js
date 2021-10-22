import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//screens
import Movies, {movieDetails} from '../screens/movies';
import Favourites from '../screens/favourites';
import People, {peopleDetails} from '../screens/people';
import {useNavigation} from '@react-navigation/core';

const StarWarsBottomNav = createBottomTabNavigator();

const BottomNavigation = () => {
  const navigation = useNavigation();
  return (
    <StarWarsBottomNav.Navigator>
      <StarWarsBottomNav.Screen
        name="Movies"
        component={movieDetails}
        options={{headerShown: false}}
      />
      <StarWarsBottomNav.Screen
        name="People"
        component={peopleDetails}
        options={{headerShown: false}}
      />
      <StarWarsBottomNav.Screen name="Favourites" component={Favourites} />
    </StarWarsBottomNav.Navigator>
  );
};

export default BottomNavigation;
