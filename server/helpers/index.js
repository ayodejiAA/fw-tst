const requiredRuleFields = ['field', 'condition', 'condition_value'];

export function validateJSONObject(obj) {
  const objectConstructor = ({}).constructor;
  if (obj !== null && obj.constructor === objectConstructor) return true;
  return false;
}


export function validateRuleObject(body) {
  if (body.rule !== undefined) {
    const { rule } = body;

    if (!validateJSONObject(rule)) throw new Error('rule should be an object.');

    // Check for required rule fields
    for (const field of requiredRuleFields) {
      if (!rule[field]) throw new Error(`${field} is required.`);
    }
    return rule;
  }
  throw new Error('rule is required.');
}

export function validateDataAndReturnFieldValue(body) {
  if (body.data === undefined) throw new Error('data is required.');


  const { data, rule } = body;

  if (
    data === null
    || typeof data === 'boolean'
    || typeof data === 'number'
  ) throw new Error('data should be an object, array or string.');

  // Split the rule field string
  const fields = rule.field.split('.');

  let field;
  let fieldValue = data;

  /*
  Iterate over the rule field array while
  checking for possible nested field values
  */
  for (const idx in fields) {
    field = fields[idx];
    fieldValue = fieldValue[fields[idx]];
    if (!fieldValue) throw new Error(`field ${rule.field} is missing from data.`);
  }

  // Return specific field and value
  return { field, fieldValue };
}

export function condition({ fieldValue, rule }) {
  switch (rule.condition) {
    case 'eq':
      return fieldValue === rule.condition_value;
    case 'neq':
      return fieldValue !== rule.condition_value;
    case 'gt':
      return fieldValue > rule.condition_value;
    case 'gte':
      return fieldValue >= rule.condition_value;
    case 'contains':
      return fieldValue === rule.condition_value;
    default:
      break;
  }
}
