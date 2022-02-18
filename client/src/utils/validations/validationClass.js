export class ValidationsClass {
  static validateLength(item, min, max) {
    return item.length >= min && item.length <= max;
  }

  static validateAmount = (item, min, max) => {
    return item >= min && item <= max;
  };

  //   static validateIsString = item => {
  //     const isStrValid = /[a-z]+$/i.test(item);
  //     return isStrValid;
  //   };
}
