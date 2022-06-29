import { configure, extend } from "vee-validate";
import { required, email, min, max, confirmed, min_value, max_value, integer } from 'vee-validate/dist/rules';

extend('email', email);
extend('required', required);
extend('min', min);
extend('max', max);
extend('confirmed', confirmed);
extend('min_value', min_value);
extend('max_value', max_value);
extend('integer', integer);
extend("decimal", {
  validate: (value, { decimals = '*', separator = '.' } = {}) => {
    if (value === null || value === undefined || value === '') {
      return {
        valid: false
      };
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value),
      };
    }
    const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`;
    const regex = new RegExp(`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`);

    return {
      valid: regex.test(value),
    };
  }
})

export default function ({ i18n }) {
  configure({
    // this will be used to generate messages.
    defaultMessage: (field, values) => {
      values._field_ = i18n.t(`fields.${field}`);
      return i18n.t(`validations.messages.${values._rule_}`, values);

  
    }
  });
}
