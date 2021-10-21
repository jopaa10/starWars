import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//screens
import Movies from '../screens/movies';
import Favourites from '../screens/favourites';
import People from '../screens/people';

const StarWarsBottomNav = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <StarWarsBottomNav.Navigator>
      <StarWarsBottomNav.Screen name="Movies" component={Movies} />
      <StarWarsBottomNav.Screen name="People" component={People} />
      <StarWarsBottomNav.Screen name="Favourites" component={Favourites} />
    </StarWarsBottomNav.Navigator>
  );
};

export default BottomNavigation;
