import { Alert } from "react-native";

export const Nontification = (val, action) => {
    Alert.alert("Perhatian", val, action)
}

export const inputNominal = (angka, prefix) => {
    var number_string   = angka.replace(/[^,\d]/g, '').toString(),
        split           = number_string.split(','),
        sisa            = split[0].length % 3,
        rupiah          = split[0].substr(0, sisa),
        ribuan          = split[0].substr(sisa).match(/\d{3}/gi);

    if(ribuan){
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp ' + rupiah : '');
}

export const currencyFloat = (number) => {
    let num = parseFloat(number)
    if(!isNaN(num)){
        if(num.toString().indexOf('.') != -1){
            return 'Rp ' + num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        } else {
            var rupiah = '';
            var numrev = num.toString().split('').reverse().join('');
            for (var i = 0; i < numrev.length; i++) if (i % 3 == 0) rupiah += numrev.substr(i, 3) + '.';

            let ret = rupiah.split('', rupiah.length - 1).reverse().join('')

            if(ret < 0){
                return '- Rp ' + ret.replace('-', '')
            } else {
                return 'Rp ' + ret
            }
        }
    } else {
        return 0
    }
}

export const formatCountDown = (time) => {
    const minutes = Math.floor(time / 60);

    let minute_time = 0

    if (minutes < 10) {
        minute_time = `0${minutes}`
    }
    else {
        minute_time = minutes
    }

    const seconds = time % 60;

    let seconds_time = 0

    if (seconds < 10) {
        seconds_time = `0${seconds}`
    }
    else {
        seconds_time = seconds
    }

    return `${minute_time} : ${seconds_time}`
}

export const formatCountDownHour = (time) => {
    var hours = parseInt(time / (60 * 60), 10) % 24;
    var minutes = parseInt(time / 60, 10) % 60;
    var seconds = Math.floor(time % 60);

    let hour_time = 0

    if (hours < 10) {
        hour_time = `0${hours}`
    }
    else {
        hour_time = hours
    }

    let minute_time = 0

    if (minutes < 10) {
        minute_time = `0${minutes}`
    }
    else {
        minute_time = minutes
    }

    let seconds_time = 0

    if (seconds < 10) {
        seconds_time = `0${seconds}`
    }
    else {
        seconds_time = seconds
    }

    return {
        hour_time,
        minute_time,
        seconds_time
    }
}

export const listsStatus = {
    'pending': '1',
    'processing': '2',
    'shipped': '3',
    'delivered': '4',
    'cancelled': '5',
    'unpaid': '6',
    'paid': '7',
    'refunded': '8'
  };
