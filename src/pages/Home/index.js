import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  FlatList,
  PermissionsAndroid,
  StatusBar,
  Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import LottieView from 'lottie-react-native';
import MyTerbaik2 from '../../components/MyTerbaik2';
import MyTerbaik3 from '../../components/MyTerbaik3';
import MyDashboard from '../../components/MyDashboard';


export default function Home({ navigation }) {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [tipe, setTipe] = useState('');
  const [company, setCompany] = useState({});







  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);

      // navigation.navigate('ListDetail', {
      //   kode: obj.notification.title.toString().substring(0, 15)
      // })

      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'arnoldta', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });
    });





    getData('company').then(res => {
      setCompany(res);
    });

    getData('tipe').then(res => {
      setTipe(res);
    });


    getData('user').then(users => {
      console.log(users);
      setUser(users);


      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);

        axios
          .post(urlAPI + '/update_token.php', {
            id: users.id,
            token: res.token,
          })
          .then(res => {
            console.error('update token', res.data);
          });
      });


    });
    return unsubscribe;
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;


  const DataKategori = ({
    icon,
    nama,
    nama2,
    onPress,
    warna = colors.primary,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: warna,
          padding: 5,
          borderRadius: 10,
          width: windowWidth / 2.5,
          height: '100%',
          elevation: 5,
          justifyContent: 'center',
        }}>
        <View>
          <Icon
            type="ionicon"
            name={icon}
            color={colors.white}
            size={windowWidth / 5}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 30,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 30,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama2}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>

      <View
        style={{
          height: windowHeight / 9,
          padding: 10,
          marginBottom: 20,
          backgroundColor: colors.white,
          flexDirection: 'row',
          // borderBottomLeftRadius: 10,
          // borderBottomRightRadius: 10,
        }}>

        <View style={{ flex: 1, paddingTop: 10, flexDirection: 'row' }}>
          <View style={{ paddingLeft: 10, flex: 3 }}>

            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.primary,
                fontFamily: fonts.secondary[600],
              }}>
              Selamat datang,
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[600],
              }}>
              {user.posisi}
            </Text>

          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Account')}
            style={{
              flex: 1,

              padding: 10,
              justifyContent: 'center',
              alignItems: 'flex-end'


            }}>
            <Image
              source={{ uri: user.foto_user }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
          </TouchableOpacity>

        </View>

      </View>

      <MyCarouser />

      <TouchableOpacity style={{
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Icon type="font-awesome" name="refresh" color={colors.white} size={windowWidth / 20} />
        <Text style={{
          textAlign: 'center',
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 15,
          color: colors.white,
          left: 10
        }}>Jual sampah</Text>
      </TouchableOpacity>

      <View style={{
        padding: 10,
        flex: 1
      }}>


        <TouchableWithoutFeedback>
          <LottieView
            source={require('../../assets/sampah.json')}
            autoPlay
            loop
            style={{
              flex: 0.5,
              backgroundColor: colors.white,
            }}
          />
        </TouchableWithoutFeedback>
      </View>


    </SafeAreaView>
  );
}
