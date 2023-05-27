//default Imports
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

//Third-Party Imports

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//components Imports
import SearchToDo from '../components/SearchToDo';
import BottomButton from '../components/BottomButton';
import Listing from '../components/Listing';
import ListingPending from '../components/ListingPending';

//Component Imports
import AppText from '../components/AppText';

//actions
import {GET_TODO} from '../features/actions';

//Tab Navigator
const Tab = createMaterialTopTabNavigator();

//var
let findTab = 1;

function ToDoList({navigation}) {
  //dispatcher
  const dispatch = useDispatch();

  //selectors
  const user = useSelector(state => state.user.currentUser);
  const {completedTodo, pendingTodo} = useSelector(state => state.todo);
  const isFetched = useSelector(state => state.todo.isFetched);

  //constants
  const userId = user.userId;
  const username = user.username;

  //var
  let profile = user.profile;
  let completedTodoArr = [];
  let pendingTodoArr = [];
  let searchTodoArr = [];

  //states
  const [search, setSearch] = useState('');
  const [searchTodo, setSearchTodo] = useState(completedTodo);

  //Converting Objects to arrays
  Object.keys(completedTodo).filter(key => {
    completedTodoArr.push(completedTodo[key.toString()]);
  });

  Object.keys(pendingTodo).filter(key => {
    pendingTodoArr.push(pendingTodo[key.toString()]);
  });

  Object.keys(searchTodo).filter(key => {
    searchTodoArr.push(searchTodo[key.toString()]);
  });

  //Handlers

  //getdata from async storage
  useEffect(() => {
    if (!isFetched) {
      dispatch({
        type: GET_TODO,
        payload: {
          userId: userId,
        },
      });
    }
  }, [user]);

  //setting tab
  useEffect(() => {
    if (findTab == 1) {
      setSearchTodo(completedTodo);
    } else {
      setSearchTodo(pendingTodo);
    }
  }, [completedTodo, pendingTodo]);

  //fonts

  // Search function
  const Searching = newtext => {
    setSearch(newtext);

    if (Object.values(findTab ? completedTodo : pendingTodo).length) {
      let objSearch = Object.values(
        findTab ? completedTodo : pendingTodo,
      ).filter(item => {
        let itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        let textData = newtext.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setSearchTodo(objSearch);
    }
  };

  // setting the current tab array
  const setTab = tab => {
    if (tab == 1) {
      setSearchTodo(completedTodo);
    } else {
      setSearchTodo(pendingTodo);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <View style={styles.Headercontainer}>
          <View style={{flexDirection: 'row'}}>
            <View>
              {profile ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate({
                      name: 'Profile',
                    });
                  }}>
                  <Image source={{uri: profile}} style={styles.circle} />
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate({
                      name: 'Profile',
                    });
                  }}>
                  <Image
                    source={require('../assets/images/profile.png')}
                    style={styles.circle}
                  />
                </TouchableWithoutFeedback>
              )}
            </View>
            <AppText style={styles.HeaderText}>Hi {user.username}</AppText>
          </View>
          <View>
            <MaterialIcons
              name="restore-from-trash"
              style={styles.Headericon}
              size={40}
              color="black"
              onPress={() => {
                navigation.navigate({
                  name: 'Trash',
                });
              }}
            />
          </View>
        </View>

        <SearchToDo
          style={{backgroundColor: '#fff'}}
          value={search}
          placeholder={'Search Here'}
          onChangeText={Searching}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,

          tabBarStyle: {
            backgroundColor: '#F3F8FF',
            fonFamily: 'Poppins-Regular',
          },
        }}>
        <Tab.Screen
          listeners={({navigation, route}) => ({
            focus: e => {
              console.log('IN cOMPLETED');
              setTab(1);
              findTab = 1;
            },
            blur: e => {
              if (search !== '') Searching('');
            },
          })}
          options={{
            tabBarStyle: {
              backgroundColor: '#fff',
              labelStyle: {
                fontFamily: 'Poppins-Regular',
                fontSize: 30,
              },
            },
          }}
          name="Completed"
          children={() => {
            return (
              <Listing
                navigation={navigation}
                completedTodoArr={
                  findTab === 1 ? searchTodoArr : completedTodoArr
                }
              />
            );
          }}
        />
        <Tab.Screen
          listeners={({navigation, route}) => ({
            focus: e => {
              setTab(0);
              findTab = 0;
            },
            blur: e => {
              if (search !== '') Searching('');
            },
          })}
          name="Pending"
          children={() => {
            return (
              <ListingPending
                navigation={navigation}
                pendingTodoArr={findTab === 0 ? searchTodoArr : pendingTodoArr}
              />
            );
          }}
        />
      </Tab.Navigator>

      {search === '' ? (
        <BottomButton
          navigated={() => {
            navigation.navigate({
              name: 'InputModel',
            });
          }}
        />
      ) : null}
    </View>
  );
}

//StyleSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Top: {
    backgroundColor: '#B0DAFF',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },

  itemStyle: {
    padding: 10,
  },

  HeaderText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },

  circle: {
    height: 50,
    width: 50,
    backgroundColor: '#E4DCCF',
    borderRadius: 25,
  },

  Headercontainer: {
    paddingTop: 20,
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DesignText: {
    fontSize: 25,
    width: '80%',
    color: 'black',
    fontFamily: 'Poppins-BoldItalic',
  },
});

export default ToDoList;
