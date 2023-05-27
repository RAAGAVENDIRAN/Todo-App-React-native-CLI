//Default Imports
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  StatusBar,
  useWindowDimensions,
  Text,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

//Third Party Imports

import AsyncStorage from '@react-native-async-storage/async-storage';

//Component Imports
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import Iconic from '../components/Iconic';

//actions
import {addUser} from '../features/actions';

function SignUp({navigation}) {
  //dispatcher
  const dispatch = useDispatch();

  //Selectors
  const users = useSelector(state => state.user.users);

  //state
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  //constants
  const {width, height} = useWindowDimensions();
  const id = Math.random() * Math.random();

  //Handlers

  //storing Data in ASync
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.mergeItem('@users', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  //validating email
  const validateEmail = text => {
    let re = /\S+@\S+\.\S+/;

    setEmail(text);

    if (re.test(text) || text == '') {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  //validating Password
  const checkPasswordValidity = value => {
    if (username.trim() === '') {
      return 'Username is compulsory';
    }

    if (username.length < 3) {
      return 'Username must be atleast 3 characters.';
    }

    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces';
    }

    const isContainsUpperCase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUpperCase.test(value)) {
      return 'Password must have at least one Uppercase Character.';
    }

    const isContainsLowerCase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowerCase.test(value)) {
      return 'Password must have at least one LowerCase Character.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8 - 16 Characters Long';
    }

    return null;
  };

  const handleLogin = () => {
    users.filter(item => {
      if (item.username === username || item.email === email) {
        ToastAndroid.show(
          'Username or email already exists',
          ToastAndroid.SHORT,
        );
      }
    });

    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword) {
      storeData({
        users: [
          ...users,
          {
            username: username,
            email: email,
            password: password,
            userId: id,
            joinedDate: new Date(),
          },
        ],
      });

      dispatch(
        addUser({
          user: {
            username: username,
            email: email,
            password: password,
            userId: id,
            joinedDate: new Date(),
          },
        }),
      );
      navigation.navigate({
        name: 'Login',
      });
    } else {
      alert(checkPassword);
    }
  };

  //fonts

  return (
    <ScrollView style={[styles.container]}>
      <View style={{height: height}}>
        <View style={{flex: 0.9}}>
          <View style={styles.topStyle}></View>
          <View style={styles.upperText}>
            <AppText
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 40,
                color: 'black',
              }}>
              Welcome
            </AppText>
            <AppText
              style={{
                fontFamily: 'Poppins-ExtraLight',
                fontSize: 20,
                color: 'black',
              }}>
              Create your Account.
            </AppText>
          </View>
          <View style={styles.middleText}>
            <Iconic
              name="account-circle-outline"
              size={30}
              height={70}
              placeholder="USER NAME"
              value={username}
              onChangeText={text => setUserName(text)}
            />
            <Iconic
              name="email-outline"
              size={30}
              height={70}
              placeholder="EMAIL"
              value={email}
              onChangeText={validateEmail}
            />
            <View style={styles.wrongText}>
              {checkValidEmail ? (
                <Text style={styles.textFailed}>Wrong Format Email</Text>
              ) : null}
            </View>

            <Iconic
              name="lock-outline"
              secureTextEntry={seePassword}
              onPress={() => setSeePassword(!seePassword)}
              onChangeText={text => setPassword(text)}
              size={30}
              height={70}
              placeholder="PASSWORD"
            />
          </View>

          <View style={styles.Last}>
            <AppButton
              style={styles.button}
              color="#B0DAFF"
              title="SIGN UP"
              onPress={handleLogin}
              size={18}
              font="Poppins-Bold"
              textColor="black"
            />
          </View>
        </View>
        <View style={styles.LastText}>
          <AppText style={{fontFamily: 'Poppins-Regular', color: 'black'}}>
            Already have an account?
            <AppText
              onPress={() => {
                navigation.goBack();
              }}
              style={{color: '#B0DAFF', fontFamily: 'Poppins-SemiBold'}}>
              Sign in
            </AppText>
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
}

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  upperText: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  middleText: {
    marginTop: 40,
    marginHorizontal: 15,
  },

  wrongText: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  textFailed: {
    color: 'red',
  },
  inputText: {
    margin: 10,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: 300,
    fontFamily: 'Poppins-Regular',
    shadowOpacity: 0.88,
    shadowRadius: 10,
    shadowOffset: {
      height: 20,
      width: 0,
    },
    elevation: 5,
  },
  Last: {
    marginTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: 30,
  },
  topStyle: {
    backgroundColor: '#B0DAFF',
    height: 150,
    borderBottomLeftRadius: 200,
  },
  button: {
    borderRadius: 10,
    width: '40%',
    backgroundColor: '#B0DAFF',
    borderRadius: 25,
  },
  LastText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SignUp;
