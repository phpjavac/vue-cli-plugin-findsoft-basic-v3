export function digitalValidator(value: string) {
  return /^(\d|\.|,){1}$/.test(value.toString());
}

export function looseDigitalValidator(value: string) {
  if (value === undefined || value === null || value === '') return true;
  return /^(\d|\.|,)+$/.test(value.toString());
}
