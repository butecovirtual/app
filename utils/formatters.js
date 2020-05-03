import moment from 'moment';
import 'moment-timezone';

export const normalizeCpf = cpf => {
  const x = cpf
    .replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);

  return !x[2]
    ? x[1]
    : x[1] +
        "." +
        (!x[3] ? x[2] : x[2] + ".") +
        x[3] +
        (x[4] ? "-" + x[4] : "");
};

export const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, "");
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 2) {
      return `(${onlyNums}) `;
    }
    if (onlyNums.length === 7) {
      return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
    }
  }
  if (onlyNums.length <= 2) {
    return onlyNums;
  }
  if (onlyNums.length <= 7) {
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
  }
  if (onlyNums.length === 10) {
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 6)}-${onlyNums.slice(
      6,
      10
    )}`;
  }
  return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(
    7,
    11
  )}`;
};

export const removeCharsCPF = cpf => cpf.replace(/[^a-zA-Z0-9]/g, "");

export const formatUsername = username => username.replace(/[^a-z0-9]/g, "");

export const removeCharsMobile = mobile => mobile.replace(/[^0-9]/g, "");

export const removeCharsCurrency = currency => currency.replace(/[^0-9,]/g, "").replace(',','.');

export const removeAcentos = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const normalizeBoard = board => {
  const x = board.replace(/\D/g, "").match(/(\d{0,3})(\d{0,4})/);
  return !x[2] ? x[1] : x[2];
};

export const formatNumberToCurrency = value => value && value.toFixed(2).replace('.',',')

export const formatTimestampToDate = (timestamp, time = true) => {
  const format = time ? 'DD/MM/YYYY [às] HH:mm' : 'DD/MM/YYYY';
  return timestamp ? moment(timestamp).tz('America/Sao_Paulo').format(format) : '';
}

export const formatLicensePlate = value => {
  return value ? value.substring(0,3) + '-' + value.substring(3) : ""
}
