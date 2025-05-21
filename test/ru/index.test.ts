import { expect } from 'chai';
import { parse } from '../../src/index';

describe('recipe parser ru', () => {
  it('returns an object', () => {
    expect(typeof parse('1 стакан воды', 'ru')).to.equal('object');
  });

  describe('translates the quantity', () => {
    it('of "соль по вкусу"', () => {
      expect(parse('соль по вкусу', 'ru').unit).to.equal('по вкусу');
    });
    it('of "Соль по вкусу"', () => {
      expect(parse('Соль по вкусу', 'ru').unit).to.equal('по вкусу');
    });
    it('of "1 чайная ложка соли"', () => {
      expect(parse('1 чайная ложка соли', 'ru').quantity).to.equal(1);
    });
    it('of "1.5 чайной ложки соли"', () => {
      expect(parse('1.5 чайной ложки соли', 'ru').quantity).to.equal(1.5);
    });
    it('of "1 1/2 чайной ложки соли"', () => {
      expect(parse('1 1/2 чайной ложки соли', 'ru').quantity).to.equal(1.5);
    });
    it('of "1/3 чайной ложки соли"', () => {
      expect(parse('1/3 чайной ложки соли', 'ru').quantity).to.equal(0.333);
    });
    it('of "1/2 чайной ложки соли"', () => {
      expect(parse('1/2 чайной ложки соли', 'ru').quantity).to.equal(0.5);
    });
    it('of "10 1/2 чайной ложки соли"', () => {
      expect(parse('10 1/2 чайной ложки соли', 'ru').quantity).to.equal(10.5);
    });
    it('of "about 1/2 чайной ложки соли"', () => {
      expect(parse('about 1/2 чайной ложки соли', 'ru').quantity).to.equal(0.5);
    });

    /* describe('translates the quantity from string to number', () => {
      it('одна чайная ложка соли"', () => {
        expect(parse('одна чайная ложка соли', 'ru').quantity).to.equal(1);
      });
      it('двадцать один стакан соли"', () => {
        expect(parse('двадцать один стакан соли', 'ru').quantity).to.equal(21);
      });
      it('пять чайных ложек соли"', () => {
        expect(parse('пять чайных ложек соли', 'ru').quantity).to.equal(5);
      });
    }); */

    describe('of unicode fractions', () => {
      const unicodeAmounts = ['¼', '½', '¾', '⅐', '⅑', '⅒', '⅓', '⅔', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅛', '⅜', '⅝', '⅞'];
      const unicodeExpectedAmounts = [0.25, 0.5, 0.75, 0.142, 0.111, 0.1, 0.333, 0.666, 0.2, 0.4, 0.6, 0.8, 0.166, 0.833, 0.125, 0.375, 0.625, 0.875];

      for (let u = 0; u < unicodeAmounts.length; u++) {
        const element = unicodeAmounts[u];
        const expectedAmount = unicodeExpectedAmounts[u];
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} (чайная ложка соли)`, 'ru').quantity).to.equal(expectedAmount);
        });
      }

      const mixedValues = ['1¼', '2½', '3¾', '4⅐', '5⅑', '6⅒', '7⅓', '8⅔', '9⅕', '10⅖', '11⅗', '12⅘', '13⅙', '14⅚', '15⅛', '16⅜', '17⅝', '18⅞'];
      const mixedExpectedValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

      for (let u = 0; u < mixedValues.length; u++) {
        const element = mixedValues[u];
        const expectedAmount = (Number(mixedExpectedValues[u]) + Number(unicodeExpectedAmounts[u]));
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} (чайная ложка соли)`, 'ru').quantity).to.equal(expectedAmount);
        });
      }
    });

    it('doesn\'t freak out if a strange unicode character is present', () => {
      expect(parse('1/3 стакана сахара', 'ru')).to.deep.equal({
        quantity: 0.333,
        unit: 'стакан',
        unitPlural: 'стаканы',
        symbol: null,
        ingredient: 'сахара',
        extraInfo: null,
        minQty: 0.333,
        maxQty: 0.333,
      });
    });
  });

  it('translates unit when no unit provided', () => {
    expect(parse('1 соль', 'ru')).to.deep.equal({
      unit: null,
      unitPlural: null,
      symbol: null,
      ingredient: 'соль',
      extraInfo: null,
      quantity: 1,
      minQty: 1,
      maxQty: 1,
    });
  });

  it('doesn\'t explode when no unit and no quantity provided', () => {
    expect(parse('Крупная соль', 'ru')).to.deep.equal({
        ingredient: 'крупная соль',
        extraInfo: null,
        unit: null,
        unitPlural: null,
        symbol: null,
        quantity: null,
        minQty: null,
        maxQty: null,
    });
  });

  describe('translates the abbreviated units of', () => {
    it('"1 грамм соли"', () => {
      expect(parse('1 г соли', 'ru').unit).to.equal('грамм');
      expect(parse('1 г. соли', 'ru').unit).to.equal('грамм');
      expect(parse('1 гр соли', 'ru').unit).to.equal('грамм');
      expect(parse('1 гр. соли', 'ru').unit).to.equal('грамм');
      expect(parse('1 грамм соли', 'ru').unit).to.equal('грамм');
      expect(parse('1 грамма соли', 'ru').unit).to.equal('грамм');
      expect(parse('5 граммов соли', 'ru').unit).to.equal('грамм');
    });
    it('"1 килограмм соли"', () => {
      expect(parse('1 кг соли', 'ru').unit).to.equal('килограмм');
      expect(parse('1 кг. соли', 'ru').unit).to.equal('килограмм');
      expect(parse('1 килограмм соли', 'ru').unit).to.equal('килограмм');
      expect(parse('1 килограмма соли', 'ru').unit).to.equal('килограмм');
      expect(parse('5 килограммов соли', 'ru').unit).to.equal('килограмм');
    });
    it('"1 миллиграмм соли"', () => {
      expect(parse('1 мг соли', 'ru').unit).to.equal('миллиграмм');
      expect(parse('1 мг. соли', 'ru').unit).to.equal('миллиграмм');
      expect(parse('1 миллиграмм соли', 'ru').unit).to.equal('миллиграмм');
      expect(parse('1 миллиграмма соли', 'ru').unit).to.equal('миллиграмм');
      expect(parse('5 миллиграммов соли', 'ru').unit).to.equal('миллиграмм');
    });
    it('"1 литр молока"', () => {
      expect(parse('1 л молока', 'ru').unit).to.equal('литр');
      expect(parse('1 л. молока', 'ru').unit).to.equal('литр');
      expect(parse('1 литр молока', 'ru').unit).to.equal('литр');
      expect(parse('1 литра молока', 'ru').unit).to.equal('литр');
      expect(parse('5 литров молока', 'ru').unit).to.equal('литр');
    });
    it('"1 миллилитр молока"', () => {
      expect(parse('1 мл молока', 'ru').unit).to.equal('миллилитр');
      expect(parse('1 мл. молока', 'ru').unit).to.equal('миллилитр');
      expect(parse('1 миллилитр молока', 'ru').unit).to.equal('миллилитр');
      expect(parse('1 миллилитра молока', 'ru').unit).to.equal('миллилитр');
      expect(parse('5 миллилитров молока', 'ru').unit).to.equal('миллилитр');
    });
    it('"1 чайная ложка соли"', () => {
      expect(parse('1 ч.л соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('1 ч. л соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('1 ч л. соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('1 ч л соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('1 ч. л. соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('1 ч.л. соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('1 ч. ложка соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('1 ч ложка соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('1 чайная ложка соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('1 чайн. ложка соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('1 чайная соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('2 чайной ложки соли', 'ru').unit).to.equal('чайная ложка');
      expect(parse('5 чайных ложек соли', 'ru').unit).to.equal('чайная ложка');
    });
    it('"1 столовая ложка соли"', () => {
      expect(parse('1 ст.л соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('1 ст. л соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('1 ст л. соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('1 ст л соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('1 ст. л. соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('1 ст.л. соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('1 ст. ложка соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('1 ст ложка соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('1 столовая ложка соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('1 столовая соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('2 столовой ложки соли', 'ru').unit).to.equal('столовая ложка');
      expect(parse('5 столовых ложек соли', 'ru').unit).to.equal('столовая ложка');
    });
    it('"1 стакан молока"', () => {
      expect(parse('1 стакан молока', 'ru').unit).to.equal('стакан');
      expect(parse('1 стакана молока', 'ru').unit).to.equal('стакан');
      expect(parse('5 стаканов молока', 'ru').unit).to.equal('стакан');
    });
    it('"1 щепотка соли"', () => {
      expect(parse('1 щепотка соли', 'ru').unit).to.equal('щепотка');
      expect(parse('1 щепотки соли', 'ru').unit).to.equal('щепотка');
      expect(parse('5 щепоток соли', 'ru').unit).to.equal('щепотка');
    });
    it('"1 пучок петрушки"', () => {
      expect(parse('1 пучок петрушки', 'ru').unit).to.equal('пучок');
      expect(parse('1 пучка петрушки', 'ru').unit).to.equal('пучок');
      expect(parse('1 пучков петрушки', 'ru').unit).to.equal('пучок');
    });
    it('"1 штука огурца"', () => {
      expect(parse('1 шт огурца', 'ru').unit).to.equal('штука');
      expect(parse('1 шт. огурца', 'ru').unit).to.equal('штука');
      expect(parse('1 штука огурца', 'ru').unit).to.equal('штука');
      expect(parse('1 штуки огурца', 'ru').unit).to.equal('штука');
      expect(parse('5 штук огурца', 'ru').unit).to.equal('штука');
    });
    it('"1 ломтик хлеба"', () => {
      expect(parse('1 ломтик хлеба', 'ru').unit).to.equal('ломтик');
      expect(parse('1 ломтика хлеба', 'ru').unit).to.equal('ломтик');
      expect(parse('5 ломтиков хлеба', 'ru').unit).to.equal('ломтик');
    });
    it('"1 долька огурца"', () => {
      expect(parse('1 долька огурца', 'ru').unit).to.equal('долька');
      expect(parse('1 дольки огурца', 'ru').unit).to.equal('долька');
      expect(parse('5 долек огурца', 'ru').unit).to.equal('долька');
    });
    it('"1 банка огурцов"', () => {
      expect(parse('1 банка огурцов', 'ru').unit).to.equal('банка');
      expect(parse('1 банки огурцов', 'ru').unit).to.equal('банка');
      expect(parse('5 банок огурцов', 'ru').unit).to.equal('банка');
    });
    it('"1 упаковка соли"', () => {
      expect(parse('1 упаковка соли', 'ru').unit).to.equal('упаковка');
      expect(parse('1 упаковки соли', 'ru').unit).to.equal('упаковка');
      expect(parse('5 упаковок соли', 'ru').unit).to.equal('упаковка');
    });
    it('"1 кусок хлеба"', () => {
      expect(parse('1 кусок хлеба', 'ru').unit).to.equal('кусок');
      expect(parse('1 куска хлеба', 'ru').unit).to.equal('кусок');
      expect(parse('5 кусков хлеба', 'ru').unit).to.equal('кусок');
    });
  });

  describe('translates the ingredient of', () => {
    it('"1 чайная ложка соли"', () => {
      expect(parse('1 чайная ложка соли', 'ru').ingredient).to.equal('соли');
    });
    it('"1 чайная ложка крупной соли"', () => {
      expect(parse('1 чайная ложка крупной соли', 'ru').ingredient).to.equal('крупной соли');
    });
  });

  it('"Хлеб белый тостовый - 6 кусочков"', () => {
    expect(parse('Хлеб белый тостовый - 6 кусочков', 'ru')).to.deep.equal({
      unit: 'кусок',
      unitPlural: 'куски',
      symbol: null,
      ingredient: 'хлеб белый тостовый',
      extraInfo: null,
      quantity: 6,
      minQty: 6,
      maxQty: 6,
    });
  });

  it('"Помидоры - 2 шт."', () => {
    expect(parse('Помидоры - 2 шт.', 'ru')).to.deep.equal({
      unit: 'штука',
      unitPlural: 'штуки',
      symbol: 'шт',
      ingredient: 'помидоры',
      extraInfo: null,
      quantity: 2,
      minQty: 2,
      maxQty: 2,
    });
  });

  it('"Ветчина (готовая нарезка) - 6 ломтиков"', () => {
    expect(parse('Ветчина (готовая нарезка) - 6 ломтиков', 'ru')).to.deep.equal({
      unit: 'ломтик',
      unitPlural: 'ломтики',
      symbol: null,
      ingredient: 'ветчина',
      extraInfo: '(готовая нарезка)',
      quantity: 6,
      minQty: 6,
      maxQty: 6,
    });
  });

  it('"Грибы шампиньоны - 3-4 шт."', () => {
    expect(parse('Грибы шампиньоны - 3-4 шт.', 'ru')).to.deep.equal({
      unit: 'штука',
      unitPlural: 'штуки',
      symbol: 'шт',
      ingredient: 'грибы шампиньоны',
      extraInfo: null,
      quantity: '3-4',
      minQty: 3,
      maxQty: 4,
    });
  });

  it('"Чеснок - 3 зубчика"', () => {
    expect(parse('Чеснок - 3 зубчика', 'ru')).to.deep.equal({
      unit: 'зубчик',
      unitPlural: 'зубчики',
      symbol: null,
      ingredient: 'чеснок',
      extraInfo: null,
      quantity: 3,
      minQty: 3,
      maxQty: 3,
    });
  });

  it('"Маскарпоне - 100 г"', () => {
    expect(parse('Маскарпоне - 100 г', 'ru')).to.deep.equal({
      unit: 'грамм',
      unitPlural: 'граммы',
      symbol: 'г',
      ingredient: 'маскарпоне',
      extraInfo: null,
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
  });

  it('"Сыр моцарела тёртый"', () => {
    expect(parse('сыр моцарела тёртый', 'ru')).to.deep.equal({
      unit: null,
      unitPlural: null,
      symbol: null,
      ingredient: 'сыр моцарела тёртый',
      extraInfo: null,
      quantity: null,
      minQty: null,
      maxQty: null,
    });
  });

  it('"Приправа «Тако» - 1 ½ ч. л."', () => {
    expect(parse('Приправа «Тако» - 1 ½ ч. л.', 'ru')).to.deep.equal({
      unit: 'чайная ложка',
      unitPlural: 'чайные ложки',
      symbol: 'ч. л.',
      ingredient: 'приправа "тако"',
      extraInfo: null,
      quantity: 1.5,
      minQty: 1.5,
      maxQty: 1.5,
    });
  });

  it('"Куриные грудки – 6 шт. (примерно по 170 г)"', () => {
    expect(parse('Куриные грудки – 6 шт. (примерно по 170 г)', 'ru')).to.deep.equal({
      unit: 'штука',
      unitPlural: 'штуки',
      symbol: 'шт',
      ingredient: 'куриные грудки',
      extraInfo: null,
      quantity: 6,
      minQty: 6,
      maxQty: 6,
    });
  });

  it('"Масло сливочное комнатной температуры - ¾ стакана (150 г)"', () => {
    expect(parse('Масло сливочное комнатной температуры - ¾ стакана (150 г)', 'ru')).to.deep.equal({
      unit: 'стакан',
      unitPlural: 'стаканы',
      symbol: null,
      ingredient: 'масло сливочное комнатной температуры',
      extraInfo: null,
      quantity: 0.75,
      minQty: 0.75,
      maxQty: 0.75,
    });
  });

  it('"Масло сливочное комнатной температуры - 1 и ¾ стакана"', () => {
    expect(parse('Масло сливочное комнатной температуры - 1 и ¾ стакана', 'ru')).to.deep.equal({
      unit: 'стакан',
      unitPlural: 'стаканы',
      symbol: null,
      ingredient: 'масло сливочное комнатной температуры',
      extraInfo: null,
      quantity: 1.75,
      minQty: 1.75,
      maxQty: 1.75,
    });
  });

  it('"Масло сливочное комнатной температуры - 1 и¾ стакана"', () => {
    expect(parse('Масло сливочное комнатной температуры - 1 и¾ стакана', 'ru')).to.deep.equal({
      unit: 'стакан',
      unitPlural: 'стаканы',
      symbol: null,
      ingredient: 'масло сливочное комнатной температуры',
      extraInfo: null,
      quantity: 1.75,
      minQty: 1.75,
      maxQty: 1.75,
    });
  });

  it('"Масло сливочное комнатной температуры - 1и ¾ стакана"', () => {
    expect(parse('Масло сливочное комнатной температуры - 1и ¾ стакана', 'ru')).to.deep.equal({
      unit: 'стакан',
      unitPlural: 'стаканы',
      symbol: null,
      ingredient: 'масло сливочное комнатной температуры',
      extraInfo: null,
      quantity: 1.75,
      minQty: 1.75,
      maxQty: 1.75,
    });
  });

  it('"Масло сливочное комнатной температуры - 1и¾ стакана"', () => {
    expect(parse('Масло сливочное комнатной температуры - 1и¾ стакана', 'ru')).to.deep.equal({
      unit: 'стакан',
      unitPlural: 'стаканы',
      symbol: null,
      ingredient: 'масло сливочное комнатной температуры',
      extraInfo: null,
      quantity: 1.75,
      minQty: 1.75,
      maxQty: 1.75,
    });
  });

  it('"Масло сливочное комнатной температуры - 1 и ¾стакана"', () => {
    expect(parse('Масло сливочное комнатной температуры - 1 и ¾стакана', 'ru')).to.deep.equal({
      unit: 'стакан',
      unitPlural: 'стаканы',
      symbol: null,
      ingredient: 'масло сливочное комнатной температуры',
      extraInfo: null,
      quantity: 1.75,
      minQty: 1.75,
      maxQty: 1.75,
    });
  });

  it('"Масло сливочное комнатной температуры - 1и¾стакана"', () => {
    expect(parse('Масло сливочное комнатной температуры - 1и¾стакана', 'ru')).to.deep.equal({
      unit: 'стакан',
      unitPlural: 'стаканы',
      symbol: null,
      ingredient: 'масло сливочное комнатной температуры',
      extraInfo: null,
      quantity: 1.75,
      minQty: 1.75,
      maxQty: 1.75,
    });
  });

  it('"Травы (рубленые) (петрушка, укроп и т. п.) - 2 ст. л."', () => {
    expect(parse('Травы (рубленые) (петрушка, укроп и т. п.) - 2 ст. л.', 'ru')).to.deep.equal({
      unit: 'столовая ложка',
      unitPlural: 'столовые ложки',
      symbol: 'ст. л.',
      ingredient: 'травы',
      extraInfo: '(рубленые; петрушка, укроп и т. п.)',
      quantity: 2,
      minQty: 2,
      maxQty: 2,
    });
  });

  it('"Майонез (сметана) и резаный зеленый лук по желанию"', () => {
    expect(parse('Майонез (сметана) и резаный зеленый лук по желанию', 'ru')).to.deep.equal({
      unit: 'по вкусу',
      unitPlural: 'по вкусу',
      symbol: null,
      ingredient: 'майонез и резаный зеленый лук',
      extraInfo: '(сметана)',
      quantity: null,
      minQty: null,
      maxQty: null,
    });
  });

  it('"5 или 6 кусков сыра"', () => {
    expect(parse('5 или 6 кусков сыра', 'ru')).to.deep.equal({
      unit: 'кусок',
      unitPlural: 'куски',
      symbol: null,
      ingredient: 'сыра',
      extraInfo: null,
      quantity: '5-6',
      minQty: 5,
      maxQty: 6,
    });
  });

  it('"5или6 кусков сыра"', () => {
    expect(parse('5или6 кусков сыра', 'ru')).to.deep.equal({
      unit: 'кусок',
      unitPlural: 'куски',
      symbol: null,
      ingredient: 'сыра',
      extraInfo: null,
      quantity: '5-6',
      minQty: 5,
      maxQty: 6,
    });
  });

  it('"5 или6 кусков сыра"', () => {
    expect(parse('5 или6 кусков сыра', 'ru')).to.deep.equal({
      unit: 'кусок',
      unitPlural: 'куски',
      symbol: null,
      ingredient: 'сыра',
      extraInfo: null,
      quantity: '5-6',
      minQty: 5,
      maxQty: 6,
    });
  });

  it('"5или 6 кусков сыра"', () => {
    expect(parse('5или 6 кусков сыра', 'ru')).to.deep.equal({
      unit: 'кусок',
      unitPlural: 'куски',
      symbol: null,
      ingredient: 'сыра',
      extraInfo: null,
      quantity: '5-6',
      minQty: 5,
      maxQty: 6,
    });
  });

  it('"5 или 6кусков сыра"', () => {
    expect(parse('5 или 6кусков сыра', 'ru')).to.deep.equal({
      unit: 'кусок',
      unitPlural: 'куски',
      symbol: null,
      ingredient: 'сыра',
      extraInfo: null,
      quantity: '5-6',
      minQty: 5,
      maxQty: 6,
    });
  });

  it('"Сыр твердый (по желанию) - 100 г (по вкусу)"', () => {
    expect(parse('Сыр твердый (по желанию) - 100 г (по вкусу)', 'ru')).to.deep.equal({
      unit: 'грамм',
      unitPlural: 'граммы',
      symbol: 'г',
      ingredient: 'сыр твердый',
      extraInfo: null,
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
  });

  it('"Масло подсолнечное рафинированное - 60-75 г (4-5 ст. л.)"', () => {
    expect(parse('Масло подсолнечное рафинированное - 60-75 г (4-5 ст. л.)', 'ru')).to.deep.equal({
      unit: 'столовая ложка',
      unitPlural: 'столовые ложки',
      symbol: 'ст. л.',
      ingredient: 'масло подсолнечное рафинированное',
      extraInfo: null,
      quantity: '4-5',
      minQty: 4,
      maxQty: 5,
    });
  });

  it('"Чеснок (нечищеный) - 2 головки (около 20 зубков)"', () => {
    expect(parse('Чеснок (нечищеный) - 2 головки (около 20 зубков)', 'ru')).to.deep.equal({
      unit: 'зубчик',
      unitPlural: 'зубчики',
      symbol: null,
      ingredient: 'чеснок',
      extraInfo: '(нечищеный)',
      quantity: 20,
      minQty: 20,
      maxQty: 20,
    });
  });

  it('"Мята свежая (рубленая) - 0,25 стакана"', () => {
    expect(parse('Мята свежая (рубленая) - 0,25 стакана', 'ru')).to.deep.equal({
      unit: 'стакан',
      unitPlural: 'стаканы',
      symbol: null,
      ingredient: 'мята свежая',
      extraInfo: '(рубленая)',
      quantity: 0.25,
      minQty: 0.25,
      maxQty: 0.25,
    });
  });

  it('"Мята свежая (рубленая) - 1,25 и 1/3 стакана"', () => {
    expect(parse('Мята свежая (рубленая) - 1 и 1/3 стакана', 'ru')).to.deep.equal({
      unit: 'стакан',
      unitPlural: 'стаканы',
      symbol: null,
      ingredient: 'мята свежая',
      extraInfo: '(рубленая)',
      quantity: 1.333,
      minQty: 1.333,
      maxQty: 1.333,
    });
  });

  it('"Зелень петрушки (измельчённая) — 1 жменька"', () => {
    expect(parse('Зелень петрушки (измельчённая) — 1 жменька', 'ru')).to.deep.equal({
      unit: 'жменька',
      unitPlural: 'жменьки',
      symbol: null,
      ingredient: 'зелень петрушки',
      extraInfo: '(измельчённая)',
      quantity: 1,
      minQty: 1,
      maxQty: 1,
    });
  });

  it('"Чеснок — 4 зубка"', () => {
    expect(parse('Чеснок — 4 зубка', 'ru')).to.deep.equal({
      unit: 'зубчик',
      unitPlural: 'зубчики',
      symbol: null,
      ingredient: 'чеснок',
      extraInfo: null,
      quantity: 4,
      minQty: 4,
      maxQty: 4,
    });
  });

  it('"молоко или сметана"', () => {
    expect(parse('молоко или сметана', 'ru')).to.deep.equal({
      unit: null,
      unitPlural: null,
      symbol: null,
      ingredient: 'молоко или сметана',
      extraInfo: null,
      quantity: null,
      minQty: null,
      maxQty: null,
    });
  });

  it('"3 ч. л. сметаны"', () => {
    expect(parse('3 ч. л. сметаны', 'ru')).to.deep.equal({
      unit: 'чайная ложка',
      unitPlural: 'чайные ложки',
      symbol: 'ч. л.',
      ingredient: 'сметаны',
      extraInfo: null,
      quantity: 3,
      minQty: 3,
      maxQty: 3,
    });
  });

  it('"Укроп свежий - 2-3 веточки"', () => {
    expect(parse('Укроп свежий - 2-3 веточки', 'ru')).to.deep.equal({
      unit: 'веточка',
      unitPlural: 'веточки',
      symbol: null,
      ingredient: 'укроп свежий',
      extraInfo: null,
      quantity: '2-3',
      minQty: 2,
      maxQty: 3,
    });
  });

  it('"Сахар - 1стакан"', () => {
    expect(parse('Сахар - 1стакан', 'ru')).to.deep.equal({
      unit: 'стакан',
      unitPlural: 'стаканы',
      symbol: null,
      ingredient: 'сахар',
      extraInfo: null,
      quantity: 1,
      minQty: 1,
      maxQty: 1,
    });
  });

  it('"хмели-сунели - 100 гр"', () => {
    expect(parse('хмели-сунели - 100 гр', 'ru')).to.deep.equal({
      unit: 'грамм',
      unitPlural: 'граммы',
      symbol: 'г',
      ingredient: 'хмели-сунели',
      extraInfo: null,
      quantity: 100,
      minQty: 100,
      maxQty: 100,
    });
  });

  it('"Нут консервированный (без жидкости) – 1 банка (420 г)"', () => {
    expect(parse('Нут консервированный (без жидкости) – 1 банка (420 г)', 'ru')).to.deep.equal({
      unit: 'грамм',
      unitPlural: 'граммы',
      symbol: 'г',
      ingredient: 'нут консервированный',
      extraInfo: '(без жидкости)',
      quantity: 420,
      minQty: 420,
      maxQty: 420,
    });
  });

  it('"Тортеллини (итальянские пельмени) с сыром, приготовленные согласно инструкции на упаковке и охлажденные – 1 упаковка (560 г)"', () => {
    expect(parse('Тортеллини (итальянские пельмени) с сыром, приготовленные согласно инструкции на упаковке и охлажденные – 1 упаковка (560 г)', 'ru')).to.deep.equal({
      unit: 'грамм',
      unitPlural: 'граммы',
      symbol: 'г',
      ingredient: 'тортеллини с сыром, приготовленные согласно инструкции на упаковке и охлажденные',
      extraInfo: '(итальянские пельмени)',
      quantity: 560,
      minQty: 560,
      maxQty: 560,
    });
  });

  it('"Соль - 0,5 чайной ложки"', () => {
    expect(parse('Соль - 0,5 чайной ложки', 'ru')).to.deep.equal({
      unit: 'чайная ложка',
      unitPlural: 'чайные ложки',
      symbol: 'ч. л.',
      ingredient: 'соль',
      extraInfo: null,
      quantity: 0.5,
      minQty: 0.5,
      maxQty: 0.5,
    });
  });

  it('"Ванилин - 1 пакетик (2 г)"', () => {
    expect(parse('Ванилин - 1 пакетик (2 г)', 'ru')).to.deep.equal({
      unit: 'грамм',
      unitPlural: 'граммы',
      symbol: 'г',
      ingredient: 'ванилин',
      extraInfo: null,
      quantity: 2,
      minQty: 2,
      maxQty: 2,
    });
  });
});
