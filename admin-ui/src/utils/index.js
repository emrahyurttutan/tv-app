/**
 * @name turkishToUpper
 * @description turkishToUpper
 * @param {*} string
 */

export const turkishToUpper = string => {
  const letters = { i: "İ", ş: "Ş", ğ: "Ğ", ü: "Ü", ö: "Ö", ç: "Ç", ı: "I" };
  string = string.replace(/(([iışğüçö]))/g, function(letter) {
    return letters[letter];
  });
  return string.toUpperCase();
};

/**
 * @name turkishToLower
 * @description turkishToLower
 * @param {*} string
 */

export const turkishToLower = string => {
  const letters = { İ: "i", I: "ı", Ş: "ş", Ğ: "ğ", Ü: "ü", Ö: "ö", Ç: "ç" };
  string = string.replace(/(([İIŞĞÜÇÖ]))/g, function(letter) {
    return letters[letter];
  });
  return string.toLowerCase();
};

const escapeRegExp = str => {
  //eslint-disable-next-line
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

/**
 * @name replaceAll
 * @description replaceAll string içerisinde bütün alanları find ve replace değerlerine göre değiştirir.
 * @param {*} string
 */

export const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
};

/**
 * object gruplama
 * @param {*} key
 */
export const groupBy = key => array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }),
    {}
  );

/**
 * object array içerisinde arama yapar
 * @param {*} array
 * @param {*} key
 * @param {*} value
 */
export const findObjectByKey = (array, key, value) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
};

/**
 * Dışarıdan Gelen Text'i, Maksimum Harf Sayısına Göre Limitler. Eğer Limit'i Geçmiyorsa, Text Olduğu Gibi Döndürülür.
 * Eğer Geçiyor İse, Cümle Kısaltılıp Sonuna Nokta (...) Konulur.
 * @param {string} text - Herhangi Bir String Tipindeki Text
 * @param {number} wordCount - Maksimum Harf Sayısı
 */
export function strLimit(text, wordCount) {
  let lastText = text;
  if (text.length > wordCount) {
    lastText = text.substr(0, wordCount) + "...";
  }
  return lastText;
}
