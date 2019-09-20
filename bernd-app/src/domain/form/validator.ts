export const required = (value: any) => {
  return (value && value.length > 0) || 'Value required';
};

export class Validator {
  static required = required;
}
