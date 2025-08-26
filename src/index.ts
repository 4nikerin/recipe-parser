const units: {
  [key: string]: {
    name: string;
    pluralName: string;
    symbol: string | null;
    synonyms: string[];
    sort: number;
  };
} = {
  'стакан': {
    name: 'стакан',
    pluralName: 'стаканы',
    symbol: null,
    synonyms: ['стакан', 'стакана', 'стаканов', 'cт', 'ст.'],
    sort: 1,
  },
  'зубчик': {
    name: 'зубчик',
    pluralName: 'зубчики',
    symbol: null,
    synonyms: ['зубчик', 'зубчика', 'зубчиков', 'зуб', 'зубка', 'зубков'],
    sort: 2,
  },
  'головка': {
    name: 'головка',
    pluralName: 'головки',
    symbol: null,
    synonyms: ['головка', 'головки', 'головок'],
    sort: 3,
  },
  'долька': {
    name: 'долька',
    pluralName: 'дольки',
    symbol: null,
    synonyms: ['долька', 'дольки', 'долек'],
    sort: 4,
  },
  'столовая ложка': {
    name: 'столовая ложка',
    pluralName: 'столовые ложки',
    symbol: 'ст. л.',
    synonyms: ['ст.л', 'ст. л', 'ст л.', 'ст л', 'ст. л.', 'ст.л.', 'ст. ложка', 'ст ложка', 'столовая ложка', 'столовая', 'столовой ложки', 'столовых ложек', 'ложка', 'ложки', 'ложек'],
    sort: 5,
  },
  'чайная ложка': {
    name: 'чайная ложка',
    pluralName: 'чайные ложки',
    symbol: 'ч. л.',
    synonyms: ['ч.л', 'ч. л', 'ч л.', 'ч л', 'ч. л.', 'ч.л.', 'ч. ложка', 'ч ложка', 'чайная ложка', 'чайн. ложка', 'чайная', 'чайной ложки', 'чайных ложек'],
    sort: 6,
  },
  'килограмм': {
    name: 'килограмм',
    pluralName: 'килограммы',
    symbol: 'кг',
    synonyms: ['кг', 'кг.', 'килограмм', 'килограмма', 'килограммов'],
    sort: 7,
  },
  'грамм': {
    name: 'грамм',
    pluralName: 'граммы',
    symbol: 'г',
    synonyms: ['г', 'г.', 'гр', 'гр.', 'грамм', 'грамма', 'граммов'],
    sort: 8,
  },
  'миллиграмм': {
    name: 'миллиграмм',
    pluralName: 'миллиграммы',
    symbol: 'мг',
    synonyms: ['мг', 'мг.', 'миллиграмм', 'миллиграмма', 'миллиграммов'],
    sort: 10,
  },
  'литр': {
    name: 'литр',
    pluralName: 'литры',
    symbol: 'л',
    synonyms: ['л', 'л.', 'литр', 'литра', 'литров'],
    sort: 11,
  },
  'миллилитр': {
    name: 'миллилитр',
    pluralName: 'миллилитры',
    symbol: 'мл',
    synonyms: ['мл', 'мл.', 'миллилитр', 'миллилитра', 'миллилитров'],
    sort: 12,
  },
  'пакет': {
    name: 'пакет',
    pluralName: 'пакеты',
    symbol: null,
    synonyms: ['пакет', 'пакета', 'пакетов', 'пакетик', 'пакетика', 'пакетиков'],
    sort: 13,
  },
  'щепотка': {
    name: 'щепотка',
    pluralName: 'щепотки',
    symbol: null,
    synonyms: ['щепотка', 'щепотки', 'щепоток', 'щеп', 'щеп.'],
    sort: 14,
  },
  'пучок': {
    name: 'пучок',
    pluralName: 'пучки',
    symbol: null,
    synonyms: ['пучок', 'пучка', 'пучков'],
    sort: 15,
  },
  'штука': {
    name: 'штука',
    pluralName: 'штуки',
    symbol: 'шт',
    synonyms: ['шт', 'шт.', 'штука', 'штуки', 'штук'],
    sort: 16,
  },
  'ломтик': {
    name: 'ломтик',
    pluralName: 'ломтики',
    symbol: null,
    synonyms: ['ломтик', 'ломтика', 'ломтиков'],
    sort: 17,
  },
  'банка': {
    name: 'банка',
    pluralName: 'банки',
    symbol: null,
    synonyms: ['банка', 'банки', 'банок'],
    sort: 18,
  },
  'упаковка': {
    name: 'упаковка',
    pluralName: 'упаковки',
    symbol: null,
    synonyms: ['упаковка', 'упаковки', 'упаковок'],
    sort: 19,
  },
  'кусок': {
    name: 'кусок',
    pluralName: 'куски',
    symbol: null,
    synonyms: ['кусок', 'куска', 'кусков', 'кусочков'],
    sort: 20,
  },
  'жменька': {
    name: 'жменька',
    pluralName: 'жменьки',
    symbol: null,
    synonyms: ['жменька', 'жменьки', 'жменек'],
    sort: 21,
  },
  'веточка': {
    name: 'веточка',
    pluralName: 'веточки',
    symbol: null,
    synonyms: ['веточка', 'веточки', 'веточек', 'ветка', 'ветки', 'веточек'],
    sort: 22,
  },
  'по вкусу': {
    name: 'по вкусу',
    pluralName: 'по вкусу',
    symbol: null,
    synonyms: ['по вкусу', 'на вкус', 'по желанию', 'сколько нужно', 'сколько угодно'],
    sort: 23,
  },
};

export interface Ingredient {
  ingredient: string;
  extraInfo: string | null;
  quantity: string | null;
  unit: string | null;
  unitPlural: string | null;
  symbol: string | null;
  minQty: string | null;
  maxQty: string | null;
}

export const ruSmall: { [key: string]: number } = {
  'ноль': 0,
  'один': 1,
  'одна': 1,
  'одно': 1,
  'два': 2,
  'три': 3,
  'четыре': 4,
  'пять': 5,
  'шесть': 6,
  'семь': 7,
  'восемь': 8,
  'девять': 9,
  'десять': 10,
  'одиннадцать': 11,
  'двенадцать': 12,
  'тринадцать': 13,
  'четырнадцать': 14,
  'пятьнадцать': 15,
  'шестьнадцать': 16,
  'семьнадцать': 17,
  'восемьнадцать': 18,
  'девятьнадцать': 19,
  'двадцать': 20,
  'тридцать': 30,
  'сорок': 40,
  'пятьдесят': 50,
  'шестьдесят': 60,
  'семьдесят': 70,
  'восемьдесят': 80,
  'девяносто': 90
};

export const ruMagnitude: { [key: string]: number } = {
  'сто': 100,
  'тысяча': 1000,
  'миллион': 1000000,
  'миллиард': 1000000000,
  'триллион': 1000000000000,
};

const prepositions = ['примерно', 'из', 'без', 'от', 'по', 'для', 'с', 'со', 'на', 'в', 'к', 'о', 'об', 'у', 'при', 'около'];

const lookBehind = "(?<!\\p{L})";
const lookForward = "(?!\\p{L})";

function romFraction(value: string) {
  // number comes in, for example: 1 1/3
  if (value && value.split(' ').length > 1) {
    const [whole, fraction] = value.replace(/(\s*и\s*)|(\s+)/g, " ").split(' ');
    const [a, b] = fraction.split('/');
    const remainder = parseFloat(a) / parseFloat(b);
    const wholeAndFraction = parseInt(whole) ? parseInt(whole) + remainder : remainder;
    return keepThreeDecimals(wholeAndFraction);
  } else if (!value || value.split('-').length > 1) {
    return value;
  } else {
    const [a, b] = value.split('/');
    return b ? keepThreeDecimals(parseFloat(a) / parseFloat(b)) : a;
  }
}

const unicodeObj: { [key: string]: string } = {
  '½': '1/2',
  '⅓': '1/3',
  '⅔': '2/3',
  '¼': '1/4',
  '¾': '3/4',
  '⅕': '1/5',
  '⅖': '2/5',
  '⅗': '3/5',
  '⅘': '4/5',
  '⅙': '1/6',
  '⅚': '5/6',
  '⅐': '1/7',
  '⅛': '1/8',
  '⅜': '3/8',
  '⅝': '5/8',
  '⅞': '7/8',
  '⅑': '1/9',
  '⅒': '1/10'
};

function fixNumber(quantity: string | undefined) {
  if (quantity?.match(/^\d+([\.,]\d+)?$/)) {
    return +(quantity ?? "").replace(/,+/g, ".") || null;
  }
  if (quantity && unicodeObj[quantity]) {
    return unicodeObj[quantity];
  }
  if (quantity && String(quantity).length) {
    return quantity;
  }
  return null;
};

function fixValue(quantity: string | number | null, fraction: string | number | null) {
  if (quantity == null && fraction == null) {
    return null;
  }
  return romFraction(`${quantity ?? ""} ${fraction ?? ""}`.replace(/\s+$/g, ""));
};

function fixUnit(value: string | undefined) {
  if (value) {
    for (const key of Object.keys(units)) {
      if (units[key].synonyms.includes(value)) {
        return key;
      }
    }
  }
  return null;
};

function parseIngredient(input: string, regexp: RegExp) {
  const prepositionsRegexp = new RegExp("\\(\\s*" + lookBehind + "(" + prepositions.map((item) => (
    item.split(" ").join("\\s+")
  )).join("|") + ")" + lookForward + "\\s*\\)", "gui");

  const value = input.replace(regexp, '');

  // Находим все скобочные пояснения и собираем их в массив
  const parenthesisMatches = value.match(/\(([^()]+)\)/g);
  const parenthesisMatchesValue = parenthesisMatches?.reduce<string[]>((acc, s) => {
    const val = s.replace(prepositionsRegexp, '').replace(/^\(|\)$/g, "");
    if (val.trim().length) {
      acc.push(val);
    }
    return acc;
  }, []).join('; ');
  const extraInfo = parenthesisMatchesValue
    ? `(${parenthesisMatchesValue})` || null
    : null;

  // Удаляем все скобки из строки
  const withoutParenthesis = value.replace(/\([^()]*\)/g, '');

  const ingredient = withoutParenthesis
    .replace(regexp, '')
    .replace(/\s*[-–—:]\s*$|\s+/g, ' ')
    .replace(/[«»]/g, '"')
    .trim()
    .toLowerCase();

  return {
    ingredient,
    extraInfo,
  };
}

function keepThreeDecimals(val: number) {
  const strVal = val.toString();
  return strVal.split('.')[0] + '.' + strVal.split('.')[1].substring(0, 3);
}

export function parse(recipeString: string) {
  const variants = Object.keys(units).reduce<string[]>((acc, key) => {
    acc = [...acc, ...units[key].synonyms.map((item) => (
      item.replace(".", "\\.").split(" ").join("\\s+")
    ))];
    return acc;
  }, []).sort((a,b) => (
    a.length > b.length ? -1 : 1
  )).join("|");

  const numberMask = "[\u00BC-\u00BE\u2150-\u2189]|\\d+(?:[\\.,\\/]\\d*)?";
  const separatorQuantAndFr = "\\s*(" + lookBehind + "и" + lookForward + ")?\\s*";

  const fromQuantityMask = "(?<fromQuantity>" + numberMask + ")";
  const fromFractionMask = "(?<fromFraction>" + numberMask + ")?";
  const toQuantityMask = "(?<toQuantity>" + numberMask + ")";
  const toFractionMask = "(?<toFraction>" + numberMask + ")?";
  const unitMask = lookBehind + "(?<unit>" + variants + ")?" + lookForward;

  const regexp = new RegExp("(?:(?<ignoreQuantity>по\\s*)?" + fromQuantityMask + separatorQuantAndFr + fromFractionMask + "\\s*(?:[-–—]|или)?\\s*(?:" + toQuantityMask + separatorQuantAndFr + toFractionMask + ")?(?:(?:\\s|[^\\p{L}])*?(?<unit>(?<!" + variants + ")" + variants + ")" + lookForward + ")?)|(?:" + unitMask + ")", "gui");

  const result = [...recipeString.matchAll(regexp)].filter((item) => (
    !item.groups?.ignoreQuantity
    && !Object.values(item.groups ?? {}).every((value) => value == null)
  ));

  const unitsSort = Object.values(units)
    .sort((a, b) => (a.sort > b.sort ? 1 : -1))
    .map((item) => item.name);
  let resultMatch = result.sort((x, y) => {
    const indexA = unitsSort.indexOf(fixUnit(x.groups?.unit) ?? "");
    const indexB = unitsSort.indexOf(fixUnit(y.groups?.unit) ?? "");

    const aInA = indexA !== -1;
    const bInA = indexB !== -1;

    if (aInA && bInA) return indexA - indexB;
    if (aInA) return -1;
    if (bInA) return 1;
    return 0;
  })[0];

  const fromQuantity = fixNumber(resultMatch?.groups?.fromQuantity);
  const fromFraction = fixNumber(resultMatch?.groups?.fromFraction);
  const toQuantity = fixNumber(resultMatch?.groups?.toQuantity);
  const toFraction = fixNumber(resultMatch?.groups?.toFraction);
  const unit = fixUnit(resultMatch?.groups?.unit);

  let minQty = fixValue(fromQuantity, fromFraction);
  let maxQty = fixValue(toQuantity, toFraction);
  [minQty, maxQty] = [minQty ?? maxQty, maxQty ?? minQty];

  const quantity = [...new Set([minQty, maxQty])].filter(Number).join("-") || null;
  const {ingredient, extraInfo} = parseIngredient(recipeString, regexp);
  const unitPlural = unit ? units[unit].pluralName ?? null : null;

  return {
    ingredient,
    extraInfo,
    quantity: quantity?.match(/-/) || quantity == null ? quantity : +quantity,
    unit,
    unitPlural,
    symbol: unit && units[unit].symbol,
    minQty: minQty == null ? null : +minQty,
    maxQty: maxQty == null ? null : +maxQty,
  };
}
