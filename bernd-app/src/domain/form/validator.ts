export const required = (value: any) => {
  if (value && value.length > 0) {
    return true;
  } else if (typeof value === 'object' && !!value) {
    return true;
  }
  return 'Value required';
};

export class Validator {
  static required = required;
}
