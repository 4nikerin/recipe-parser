import * as convert from "./convert";
import { unitsMap } from "./units";
import { repeatingFractions } from "./repeatingFractions";

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

export const lookBehind = "(?<!\\p{L})";
export const lookForward = "(?!\\p{L})";

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
    const indexA = unitsSort.indexOf(convert.fixUnit(x.groups?.unit, language) ?? "");
    const indexB = unitsSort.indexOf(convert.fixUnit(y.groups?.unit, language) ?? "");

    const aInA = indexA !== -1;
    const bInA = indexB !== -1;

    if (aInA && bInA) return indexA - indexB;
    if (aInA) return -1;
    if (bInA) return 1;
    return 0;
  })[0];

  const fromQuantity = convert.fixNumber(resultMatch?.groups?.fromQuantity);
  const fromFraction = convert.fixNumber(resultMatch?.groups?.fromFraction);
  const toQuantity = convert.fixNumber(resultMatch?.groups?.toQuantity);
  const toFraction = convert.fixNumber(resultMatch?.groups?.toFraction);
  const unit = convert.fixUnit(resultMatch?.groups?.unit, language);

  let minQty = convert.fixValue(fromQuantity, fromFraction);
  let maxQty = convert.fixValue(toQuantity, toFraction);
  [minQty, maxQty] = [minQty ?? maxQty, maxQty ?? minQty];

  const quantity = [...new Set([minQty, maxQty])].filter(Number).join("-") || null;
  const {ingredient, extraInfo} = convert.parseIngredient(recipeString, regexp, language);
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
