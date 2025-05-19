type Units = { [key: string]: string[] }
type PluralUnits = { [key: string]: string }
type NameToSymbol = { [key: string]: string }

export const engUnits: Units = {
  bag: ['bag', 'bags'],
  box: ['box'],
  can: ['can'],
  cup: ['cup', 'c', 'c.', 'C', 'Cups'],
  clove: ['clove'],
  gallon: ['gallon', 'gal'],
  ounce: ['ounce', 'oz', 'oz.'],
  pint: ['pint', 'pt', 'pts', 'pt.'],
  pound: ['pound', 'lb', 'lb.', 'lbs', 'lbs.', 'Lb', 'Lbs'],
  quart: ['quart', 'qt', 'qt.', 'qts', 'qts.'],
  tablespoon: ['tbs', 'tbsp', 'tbspn', 'T', 'T.', 'Tablespoons', 'Tablespoon'],
  teaspoon: ['teaspoon', 'tsp', 'tspn', 't', 't.'],
  gram: ['gram', 'g', 'g.'],
  kilogram: ['kilogram', 'kg', 'kg.', 'Kg', 'Kg.'],
  liter: ['liter', 'l', 'l.', 'lt', 'Lt', 'LT', 'L', 'L.'],
  milligram: ['milligram', 'mg', 'mg.'],
  milliliter: ['milliliter', 'ml', 'ml.', 'mL', 'mL.'],
  package: ['package', 'pkg', 'pkgs'],
  stick: ['stick', 'sticks'],
  piece: ['piece', 'pcs', 'pcs.'],
  pinch: ['pinch'],
  small: ['Small'],
  slice: ['slice'],
  medium: ['Medium'],
  large: ['large', 'Large'],
};

export const engPluralUnits: PluralUnits = {
  cup: 'cups',
  gallon: 'gallons',
  ounce: 'ounces',
  pint: 'pints',
  pound: 'pounds',
  quart: 'quarts',
  tablespoon: 'tablespoons',
  teaspoon: 'teaspoons',
  gram: 'grams',
  kilogram: 'kilograms',
  liter: 'liters',
  milligram: 'milligrams',
  milliliter: 'milliliters',
  clove: 'cloves',
  bag: 'bags',
  box: 'boxes',
  pinch: 'pinches',
  can: 'cans',
  slice: 'slices',
  piece: 'pieces'
};

export const engNameToSymbol: NameToSymbol = {
  cup: 'c',
  gallon: 'gal',
  ounce: 'oz',
  pint: 'pt',
  pound: 'lb',
  quart: 'qt',
  tablespoon: 'tbs',
  teaspoon: 'tsp',
  gram: 'g',
  kilogram: 'kg',
  liter: 'lt',
  milligram: 'mg',
  milliliter: 'ml',
  clove: '',
  bag: '',
  box: '',
  pinch: '',
  can: '',
  slice: '',
  piece: ''
};

export const engPreposition = ['of'];

export const itaUnits: Units = {
  barattolo: ['barattolo', 'barattoli'],
  bicchiere: ['bicchiere'],
  bottiglia: ['bottiglie', 'bottiglia'],
  bustina: ['bustina', 'bustine'],
  cubetto: ['cubetto', 'cubetti'],
  cucchiaio: ['cucchiai', 'cucchiaio'],
  cucchiaino: ['cucchiaini', 'cucchiaino'],
  confezione: ['confezioni', 'confezione'],
  grammo: ['g', 'g\\.', 'gr\\.', 'gr', 'grammi', 'grammo'],
  chilogrammo: ['kg.', 'kg', 'kilogrammo', 'chilogrammi', 'kilogrammo', 'chilogrammo'],
  fetta: ['fetta', 'fette'],
  fettina: ['fettina', 'fettine'],
  fogliolina: ['fogliolina', 'foglioline'],
  foglia: ['foglie', 'foglia'],
  foglio: ['fogli', 'foglio'],
  gambo: ['gambo', 'gambi'],
  litro: ['l\\.', 'l', 'lt', 'litro'],
  mazzo: ['mazzo', 'mazzi'],
  mazzetto: ['Mazzetto', 'mazzetti', 'mazzetto'],
  lattina: ['Lattina', 'lattina'],
  milligrammo: ['mg.', 'mg', 'milligrammo'],
  millilitro: ['ml', 'ml\\.', 'millilitro'],
  panetto: ['Panetto', 'panetti', 'panetto'],
  pacco: ['pkg', 'pkgs', 'pacchetto', 'pacco'],
  pezzo: ['pezzo', 'pcs', 'pcs.', 'pezzi'],
  pizzico: ['pizzico', 'pizzichi'],
  tazza: ['tazza', 'tazzina', 'tazzine'],
  sacco: ['sacco', 'sacchi'],
  spicchio: ['spicchio', 'spicchi'],
  scatola: ['scatola', 'scatole'],
  vasetto: ['vasetto', 'vasetti'],
  filo: ['filo'],
  ciuffo: ['ciuffo'],
  scatoletta: ['scatoletta'],
  manciata: ['manciata'],
  rametto: ['rametto', 'rametti'],
  rotolo: ['rotolo'],
  pugno: ['pugno', 'pugni'],
  bicchierino: ['bicchierino'],

  //noce: ['noce'],
};

export const itaPluralUnits: PluralUnits = {
  barattolo: 'barattoli',
  bicchiere: 'bicchieri',
  bustina: 'bustine',
  bottiglia: 'bottiglie',
  cubetto: 'cubetti',
  gambo: 'gambi',
  tazza: 'tazze',
  quarto: 'quarti',
  cucchiaio: 'cucchiai',
  cucchiaino: 'cucchiaini',
  confezione: 'confezioni',
  grammo: 'grammi',
  chilogrammo: 'chilogrammi',
  litro: 'litri',
  milligrammo: 'milligrammi',
  millilitro: 'millilitri',
  spicchio: 'spicchi',
  scatola: 'scatole',
  pizzico: 'pizzichi',
  lattina: 'lattine',
  fetta: 'fette',
  fettina: 'fettine',
  pezzo: 'pezzi',
  panetto: 'panetti',
  foglio: 'fogli',
  fogliolina: 'foglioline',
  foglia: 'foglie',
  mazzo: 'mazzi',
  mazzetto: 'mazzetti',
  vasetto: 'vasetti',
  filo: 'fili',
  ciuffo: 'ciuffi',
  sacco: 'sacchi',
  scatoletta: 'scatolette',
  manciata: 'manciate',
  rametto: 'rametti',
  rotolo: 'rotoli',
  bicchierino: 'bicchierini',
  pugno: 'pugni'
  //noce: 'noci'
};

export const itaNameToSymbol: NameToSymbol = {
  bicchiere: '',
  bustina: '',
  cubetto: '',
  gambo: '',
  tazza: '',
  quarto: '',
  cucchiaio: '',
  spicchio: '',
  scatola: '',
  pizzico: '',
  lattina: '',
  fetta: '',
  pezzo: '',
  panetto: '',
  foglia: '',
  mazzetto: '',
  manciata: '',
  vasetto: '',
  grammo: 'g',
  cucchiaino: 'cc',
  chilogrammo: 'kg',
  litro: 'lt',
  milligrammo: 'mg',
  millilitro: 'ml',
};

export const itaPreposition = ['di', 'd\''];

export const ruUnits: Units = {
  грамм: ['г', 'г.', 'гр', 'гр.', 'грамм', 'грамма', 'граммов'],
  килограмм: ['кг', 'кг.', 'килограмм', 'килограмма', 'килограммов'],
  миллиграмм: ['мг', 'мг.', 'миллиграмм', 'миллиграмма', 'миллиграммов'],
  литр: ['л', 'л.', 'литр', 'литра', 'литров'],
  миллилитр: ['мл', 'мл.', 'миллилитр', 'миллилитра', 'миллилитров'],
  'чайная ложка': ['ч.л', 'ч. л', 'ч л.', 'ч л', 'ч. л.', 'ч.л.', 'ч. ложка', 'ч ложка', 'чайная ложка', 'чайн. ложка', 'чайная', 'чайной ложки', 'чайных ложек'],
  'столовая ложка': ['ст.л', 'ст. л', 'ст л.', 'ст л', 'ст. л.', 'ст.л.', 'ст. ложка', 'ст ложка', 'столовая ложка', 'столовая', 'столовой ложки', 'столовых ложек', 'ложка', 'ложки', 'ложек'],
  стакан: ['стакан', 'стакана', 'стаканов', 'cт', 'ст.'],
  щепотка: ['щепотка', 'щепотки', 'щепоток', 'щеп', 'щеп.'],
  пучок: ['пучок', 'пучка', 'пучков'],
  штука: ['шт', 'шт.', 'штука', 'штуки', 'штук'],
  ломтик: ['ломтик', 'ломтика', 'ломтиков'],
  долька: ['долька', 'дольки', 'долек'],
  банка: ['банка', 'банки', 'банок'],
  упаковка: ['упаковка', 'упаковки', 'упаковок'],
  кусок: ['кусок', 'куска', 'кусков', 'кусочков'],
  зубчик: ['зубчик', 'зубчика', 'зубчиков', 'зуб', 'зубка', 'зубков'],
  головка: ['головка', 'головки', 'головок'],
  жменька: ['жменька', 'жменьки', 'жменек'],
  веточка: ['веточка', 'веточки', 'веточек', 'ветка', 'ветки', 'веточек'],
  'по вкусу': ['по вкусу', 'на вкус', 'по желанию', 'сколько нужно', 'сколько угодно'] // спец. случай
};

export const ruPluralUnits: PluralUnits = {
  грамм: 'граммы',
  килограмм: 'килограммы',
  миллиграмм: 'миллиграммы',
  литр: 'литры',
  миллилитр: 'миллилитры',
  'чайная ложка': 'чайные ложки',
  'столовая ложка': 'столовые ложки',
  стакан: 'стаканы',
  щепотка: 'щепотки',
  пучок: 'пучки',
  штука: 'штуки',
  ломтик: 'ломтики',
  долька: 'дольки',
  банка: 'банки',
  упаковка: 'упаковки',
  кусок: 'куски',
  зубчик: 'зубчики',
  головка: 'головки',
  жменька: 'жменьки',
  веточка: 'веточки',
  'по вкусу': 'по вкусу',
};

export const ruNameToSymbol: NameToSymbol = {
  грамм: 'г',
  килограмм: 'кг',
  миллиграмм: 'мг',
  литр: 'л',
  миллилитр: 'мл',
  'чайная ложка': 'ч. л.',
  'столовая ложка': 'ст. л.',
  стакан: '',
  щепотка: '',
  пучок: '',
  штука: 'шт',
  ломтик: '',
  долька: '',
  банка: '',
  упаковка: '',
  кусок: '',
  зубчик: '',
  головка: '',
  жменька: '',
  веточка: '',
  'по вкусу': ''
};

export const ruPreposition = ['из', 'без', 'от', 'по', 'для', 'с', 'со', 'на', 'в', 'к', 'о', 'об', 'у', 'при', 'около'];

export const unitsMap = new Map<string, [Units, PluralUnits, string[], NameToSymbol]>();
unitsMap.set("eng", [engUnits, engPluralUnits, engPreposition, engNameToSymbol]);
unitsMap.set("ita", [itaUnits, itaPluralUnits, itaPreposition, itaNameToSymbol]);
unitsMap.set("ru", [ruUnits, ruPluralUnits, ruPreposition, ruNameToSymbol]);

export function extractAllUnits(language: string): string[] {
  const unitData = unitsMap.get(language);
  if (!unitData) return [];

  const flattenedUnits = new Set<string>();

  for (const data of unitData) {
    if (Array.isArray(data)) {
      // If it's already an array, add all its elements
      data.forEach((unit) => flattenedUnits.add(unit));
    } else if (typeof data === "object") {
      // If it's an object (dictionary), extract all values
      Object.values(data).forEach((value: any) => {
        if (Array.isArray(value)) {
          value.forEach((unit) => flattenedUnits.add(unit));
        } else {
          flattenedUnits.add(value);
        }
      });
    }
  }

  return Array.from(flattenedUnits);
}
