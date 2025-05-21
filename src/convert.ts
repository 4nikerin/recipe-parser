// import { numbersMap } from './numbers';
import { unitsMap } from "./units";
import { lookBehind, lookForward } from "./index";

function convertFromFraction(value: string) {
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

// function text2num(s: string, language: string) {
//   const a = s.toString().split(/[\s-]+/);
//   let values: number[] = [0, 0];
//   a.forEach(x => {
//     values = feach(x, values[0], values[1], language)
//   });
//   if (values[0] + values[1] < 0)
//     return null
//   else
//     return values[0] + values[1];
// }

// function feach(w: string, g: number, n: number, language: string) {
//   let number = numbersMap.get(language)
//   let small = number[0]
//   let magnitude = number[1]
//   var x = small[w];
//   if (x != null) {
//     g = g + x;
//   }
//   else if (100 == magnitude[w]) {
//     if (g > 0)
//       g = g * 100;
//     else
//       g = 100
//   }
//   else {
//     x = magnitude[w];
//     if (x != null) {
//       n = n + g * x
//       g = 0;
//     }
//     else
//       return [-1, -1]

//   }
//   return [g, n]
// }

export function fixNumber(quantity: string | undefined) {
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

export function fixValue(quantity: string | number | null, fraction: string | number | null) {
  if (quantity == null && fraction == null) {
    return null;
  }
  return convertFromFraction(`${quantity ?? ""} ${fraction ?? ""}`.replace(/\s+$/g, ""));
};

export function fixUnit(value: string | undefined, language: string) {
  if (value) {
    const unit = unitsMap.get(language);
    const units = unit?.[0] ?? {};

    for (const key of Object.keys(units)) {
      if (units[key].includes(value)) {
        return key;
      }
    }
  }
  return null;
};

export function parseIngredient(input: string, regexp: RegExp, language: string) {
  const unitMap = unitsMap.get(language);
  const prepositions = unitMap?.[2] ?? [];
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
