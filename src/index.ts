import { unitsMap } from "./units";

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

const repeatingFractions = {
  [333]: '1/3',
  [666]: '2/3',
  [111]: '1/9',
  [166]: '1/6',
  [833]: '5/6'
} as { [key: string]: string };

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

function fixUnit(value: string | undefined, language: string) {
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

function parseIngredient(input: string, regexp: RegExp, language: string) {
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

export function parse(recipeString: string, language: string) {
  const unitMap = unitsMap.get(language);
  const units = unitMap?.[0] ?? {};
  const pluralUnits = unitMap?.[1] ?? {};
  const symbolUnits = unitMap?.[3] ?? {};
  const unitsSort = unitMap?.[4] ?? [];
  const variants = Object.keys(units).reduce<string[]>((acc, key) => {
    acc = [...acc, ...units[key].map((item) => (
      item.replace(".", "\\.").split(" ").join("\\s+")
    )).sort((a,b) => (
      a.length > b.length ? -1 : 1
    ))];
    return acc;
  }, []).join("|");

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

  let resultMatch = result.sort((x, y) => {
    const indexA = unitsSort.indexOf(fixUnit(x.groups?.unit, language) ?? "");
    const indexB = unitsSort.indexOf(fixUnit(y.groups?.unit, language) ?? "");

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
  const unit = fixUnit(resultMatch?.groups?.unit, language);

  let minQty = fixValue(fromQuantity, fromFraction);
  let maxQty = fixValue(toQuantity, toFraction);
  [minQty, maxQty] = [minQty ?? maxQty, maxQty ?? minQty];

  const quantity = [...new Set([minQty, maxQty])].filter(Number).join("-") || null;
  const {ingredient, extraInfo} = parseIngredient(recipeString, regexp, language);
  const unitPlural = unit ? pluralUnits[unit] ?? null : null;

  return {
    ingredient,
    extraInfo,
    quantity: quantity?.match(/-/) || quantity == null ? quantity : +quantity,
    unit,
    unitPlural,
    symbol: unit && symbolUnits[unit],
    minQty: minQty == null ? null : +minQty,
    maxQty: maxQty == null ? null : +maxQty,
  };
}

export function combine(ingredientArray: Ingredient[]) {
  const combinedIngredients = ingredientArray.reduce((acc, ingredient) => {
    const key = ingredient.ingredient + ingredient.unit; // when combining different units, remove this from the key and just use the name
    const existingIngredient = acc[key];

    if (existingIngredient) {
      return Object.assign(acc, {
        [key]: combineTwoIngredients(existingIngredient, ingredient),
      });
    } else {
      return Object.assign(acc, { [key]: ingredient });
    }
  }, {} as { [key: string]: Ingredient });

  return Object.keys(combinedIngredients)
    .reduce((acc, key) => {
      const ingredient = combinedIngredients[key];
      return acc.concat(ingredient);
    }, [] as Ingredient[])
    .sort(compareIngredients);
}

export function prettyPrintingPress(ingredient: Ingredient) {
  let quantity = "";
  let unit = ingredient.unit;
  if (ingredient.quantity) {
    const [whole, remainder] = ingredient.quantity.split(".");
    if (+whole !== 0 && typeof whole !== "undefined") {
      quantity = whole;
    }
    if (+remainder !== 0 && typeof remainder !== "undefined") {
      let fractional;
      if (repeatingFractions[remainder]) {
        fractional = repeatingFractions[remainder];
      } else {
        const fraction = "0." + remainder;
        const len = fraction.length - 2;
        let denominator = Math.pow(10, len);
        let numerator = +fraction * denominator;

        const divisor = gcd(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;
        fractional = Math.floor(numerator) + "/" + Math.floor(denominator);
      }

      quantity += quantity ? " " + fractional : fractional;
    }
    /* if (((+whole !== 0 && typeof remainder !== 'undefined') || +whole > 1) && unit) {
      unit = nounInflector.pluralize(unit);
    }*/
  } else {
    return ingredient.ingredient;
  }

  return `${quantity}${unit ? " " + unit : ""} ${ingredient.ingredient}`;
}

function gcd(a: number, b: number): number {
  if (b < 0.0000001) {
    return a;
  }

  return gcd(b, Math.floor(a % b));
}

// TODO: Maybe change this to existingIngredients: Ingredient | Ingredient[]
function combineTwoIngredients(
  existingIngredients: Ingredient,
  ingredient: Ingredient
): Ingredient {
  const quantity =
    existingIngredients.quantity && ingredient.quantity
      ? (
          Number(existingIngredients.quantity) + Number(ingredient.quantity)
        ).toString()
      : null;
  const minQty =
    existingIngredients.minQty && ingredient.minQty
      ? (
          Number(existingIngredients.minQty) + Number(ingredient.minQty)
        ).toString()
      : null;
  const maxQty =
    existingIngredients.maxQty && ingredient.maxQty
      ? (
          Number(existingIngredients.maxQty) + Number(ingredient.maxQty)
        ).toString()
      : null;
  return Object.assign({}, existingIngredients, { quantity, minQty, maxQty });
}

function compareIngredients(a: Ingredient, b: Ingredient) {
  if (a.ingredient === b.ingredient) {
    return 0;
  }
  return a.ingredient < b.ingredient ? -1 : 1;
}
