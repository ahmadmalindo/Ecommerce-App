import { Alert } from "react-native";

export const Nontification = (val) => {
    Alert.alert("Perhatian", val)
}

export const statusDashboard = [200, 201, 202]

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

