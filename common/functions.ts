import { message } from 'antd';

export const convertToHighlightText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    '<span>' +
    parts.map(
      (part) =>
        `<span class=${part.toLowerCase() === highlight.toLowerCase() ? 'hl' : ''}>${part}</span>`
    ) +
    '</span>'
  ).replaceAll(',', '');
};

export const isStrEmpty = (str: string) => {
  return (
    typeof str !== 'string' ||
    str === undefined ||
    str === null ||
    str.length === 0 ||
    str.trim().length === 0
  );
};

export const changeToSlug = (str: string) => {
  if (isStrEmpty(str)) {
    return null;
  } else {
    str = str.toLowerCase();
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    str = str.replace(/([^0-9a-z-\s])/g, '');
    str = str.replace(/(\s)+(-)(\s+)/g, '-');
    str = str.replace(/(\s+)/g, '-');
    str = str.replace(/ /g, '-');
    str = str.replace(/^-+/g, '');
    str = str.replace(/-+$/g, '');
    return str;
  }
};

export const handlerMessage = (err: string, type: 'error' | 'success' | 'warning') => {
  message[type](err || 'Oops! An error occurred!');
};

export const formatNumber = (value: number, unit?: string, messErr?: string) => {
  if (Number.isFinite(value)) return (unit || '') + new Intl.NumberFormat('ja-JP').format(value);
  else return messErr || '';
};

export const decimalPrecision = (number: number, place: number) => {
  return parseFloat(number.toFixed(place));
};

export const fullScreen = (elem: any) => {
  const document: any = window.document;
  if (
    (document.fullScreenElement !== undefined && document.fullScreenElement === null) ||
    (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) ||
    (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
    (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)
  ) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};

export const isUUID = (input: string, version?: '1' | '2' | '3' | '4' | '5') => {
  const uuid_patterns = {
    1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  };

  if (version) {
    return uuid_patterns[version].test(input);
  } else {
    return Object.values(uuid_patterns).some((pattern) => pattern.test(input));
  }
};

export const createFakeArray = (dataItem: Object, length: number) => {
  let arr: any[] = [];
  Array.from({ length }).map(() => {
    arr.push(dataItem);
  });
  return arr;
};

export const getNewObjByFields = (obj: any, fields: string[]) => {
  if (!obj || !Object.keys(obj).length) return;

  let newObj: any = {};
  for (const key of fields) {
    newObj[key] = obj[key];
  }
  return newObj;
};

export const convertToInternationalCurrencySystem = (labelValue: number) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
    : Math.abs(Number(labelValue));
};

export const searchDebounce = (func: (e: any) => void, timeout = 300) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

// Delete key null, undefined Object
export const deleteItemInObject = (object: object[] | any) => {
  Object.keys(object).forEach((key) =>
    object[key] === null || object[key] === undefined ? delete object[key] : {}
  );

  return object;
};
