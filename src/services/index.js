import moment from 'moment';
import { PermissionsAndroid, Platform, Share, ToastAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
const hasPermissionIOS = async () => {
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Permission denied');
  }

  if (status === 'disabled') {
    Alert.alert('Permission disabled');
  }

  return false;
};
const SERVICES = {
  getFormData: object => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  },
  _returnError: error => {
    console.log('type of code: ', error?.code);
    console.log('type of message: ', error?.message);
    if (typeof error === 'string') {
      return error;
    }
    return error?.code || error?.message;
  },
  _capitalizeFirst: str => str?.charAt(0)?.toUpperCase() + str?.slice(1),
  _returnStringify: data => JSON.stringify(data),
  _share: async (description = '', url) => {
    try {
      console.log('url::', url);
      const result = await Share.share({
        // message:description?description:url,
        // url: url,
        message: description, // + ' ' + createText(description),
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // console.log(error.message);
    }
  },
  _get_current_location: async (
    onSuccess = position => {},
    onError = error => {},
  ) => {
    try {
      const flag = await SERVICES._requestLocationPermission();
      if (flag) {
        Geolocation.getCurrentPosition(onSuccess, onError, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  },

  _returnAddress: addressObject => {
    console.log('addressObject:', addressObject.results[0]);
    let returnAddress = {
      street_number: null,
      street_address: null,
      fulladdress: addressObject?.results[0]?.formatted_address,
      geoCode: {
        ...addressObject.results[0]?.geometry?.location,
      },
      place_id: addressObject.results[0]?.place_id,
    };
    addressObject.results?.forEach(element => {
      element?.address_components?.forEach(item => {
        if (item.types.some(el => el === 'administrative_area_level_1')) {
          returnAddress = {...returnAddress, province: item.long_name};
        } else if (
          item.types.some(el => el === 'administrative_area_level_2')
        ) {
          returnAddress = {...returnAddress, district: item.long_name};
        } else if (
          item.types.some(el => el === 'administrative_area_level_3')
        ) {
          returnAddress = {...returnAddress, tehsil: item.long_name};
        } else if (item.types.some(el => el === 'locality')) {
          returnAddress = {...returnAddress, city: item.long_name};
        } else if (item.types.some(el => el === 'sublocality')) {
          returnAddress = {...returnAddress, area: item.long_name};
        } else if (item.types.some(el => el === 'street_address')) {
          returnAddress = {
            ...returnAddress,
            street_address: item.long_name || null,
          };
        } else if (item.types.some(el => el === 'street_number')) {
          returnAddress = {
            ...returnAddress,
            street_number: item.long_name || null,
          };
        } else if (item.types.some(el => el === 'country')) {
          returnAddress = {
            ...returnAddress,
            country: item.long_name || null,
            country_short_name: item?.short_name,
          };
        }
      });
    });
    return returnAddress;
  },
  _requestLocationPermission: async () => {
    try {
      if (Platform.OS === 'ios') {
        const hasPermission = await hasPermissionIOS();
        return hasPermission;
      }
      if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
      }

      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show('Permission denied', ToastAndroid.LONG);
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show('Permission disabled', ToastAndroid.LONG);
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  serialize: obj => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  },
  _removeEmptyKeys: payload => {
    const obj = payload;
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  },
  // _returnImageCamera: async () => {
  //   try {
  //     let image = await ImagePicker.openCamera({
  //       width: 1000,
  //       height: 800,
  //       cropping: true,
  //       includeBase64: false,
  //       compressImageQuality: 0.5,
  //       compressImageMaxWidth: 1500,
  //       compressImageMaxHeight: 1000,
  //     });
  //     return {
  //       uri:
  //         Platform.OS === 'android'
  //           ? image?.path
  //           : image?.path.replace('file://', ''),
  //       name: image?.filename,
  //       type: image?.mime,
  //     };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // },
  // _returnImageGallery: async () => {
  //   try {
  //     let image = await ImagePicker.openPicker({
  //       width: 1000,
  //       height: 800,
  //       cropping: true,
  //       includeBase64: false,
  //       compressImageQuality: 0.5,
  //       compressImageMaxWidth: 1500,
  //       compressImageMaxHeight: 1000,
  //     });
  //     return {
  //       uri:
  //         Platform.OS === 'android'
  //           ? image?.path
  //           : image?.path.replace('file://', ''),
  //       name: image?.filename,
  //       type: image?.mime,
  //     };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // },
  getHourView: (date = moment().format('YYYY-MM-DD'), hour_range = 1) => {
    let list = [];
    for (let index = 0; index < 24; index = index + hour_range) {
      if (index < 10) {
        list.push({
          time: `0${index}:00`,
          social: [],
          work: [],
          date: `${date} 0${index}:00`,
        });
      } else {
        list.push({
          time: `${index}:00`,
          social: [],
          work: [],
          date: `${date} ${index}:00`,
        });
      }
    }
    return list;
  },
  getMinutesDiff: (a, b) => moment(b).diff(a, 'm'),
  getMinutesDiff: (a, b) => moment(b).diff(a, 'm'),
  getMinutesOfHHMM: (b, a) =>
    moment(`${moment().format('YYYY-MM-DD')} ${b}`).diff(
      `${moment().format('YYYY-MM-DD')} ${a}`,
      'm',
    ),
  isSameHour: (a, b, range = 1) => {
    return (
      moment(a).hour() <= moment(b, 'HH').hour() &&
      moment(a).add(range, 'h').hour() >= moment(b, 'HH').hour()
    );
  },
  isTimeBW: (ea, eb, sx, sy) => {
    const estart_time = moment(ea, 'YYYY-MM-DD HH:mm');
    const eend_time = moment(eb, 'YYYY-MM-DD HH:mm');
    const sstart_time = moment(sx, 'YYYY-MM-DD HH:mm');
    const send_time = moment(sy, 'YYYY-MM-DD HH:mm');
    console.log('estart_time', ea);
    console.log('eend_time', eb);
    console.log('sstart_time', sx);
    console.log('send_time', sy);
    return estart_time >= sstart_time && eend_time <= send_time;
    // var start_date = moment(start_date, 'YYYY-MM-DD HH:mm');
    // var end_date = moment(end_date, 'YYYY-MM-DD HH:mm');
    // var start_date = moment(start_date, 'YYYY-MM-DD HH:mm');
    // var end_date = moment(end_date, 'YYYY-MM-DD HH:mm');

    // estart_time >=sstart_time and eend_time <=send_time
    // 2:00     >=1:00        and  5:00    <= '6:00'
  },
  isTimeBW2: (estart_time, eend_time, sstart_time, send_time) => {
    console.log(estart_time, eend_time, sstart_time, send_time);
    return estart_time >= sstart_time && eend_time <= send_time;
  },
  isDateBW: (compare_date, start_date, end_date) => {
    compare_date = moment(compare_date, 'YYYY-MM-DD HH:mm');
    var start_date = moment(start_date, 'YYYY-MM-DD HH:mm');
    var end_date = moment(end_date, 'YYYY-MM-DD HH:mm');
    return (
      compare_date.isBetween(start_date, end_date) ||
      compare_date.isSame(start_date) ||
      compare_date.isSame(end_date)
    );
  },
  getUUID: () => uuid?.v4()?.toString(),
  getDays: date => {
    let curr = new Date(date);
    const daysOfYear = [];
    for (let d = 0; d < 10; d++) {
      daysOfYear.push({date: moment(curr).format('YYYY-MM-DD')});
      curr.setDate(curr.getDate() + 1);
    }
    return daysOfYear;
  },
};

export default SERVICES;
