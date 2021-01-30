import {
  validateRuleObject,
  validateDataAndReturnFieldValue,
  condition
} from '../helpers';


export default (req, res) => {
  try {
    const { body } = req;
    validateRuleObject(body);

    const { fieldValue } = validateDataAndReturnFieldValue(body);

    const { rule } = body;
    const { field } = rule;

    const result = condition({ fieldValue, rule });

    if (!result) {
      return res.status(400).json({
        message: `field ${field} failed validation.`,
        status: 'error',
        data: {
          validation: {
            error: true,
            field,
            field_value: fieldValue,
            condition: rule.condition,
            condition_value: rule.condition_value
          }
        }
      });
    }

    return res.status(200).json({
      message: `field ${field} successfully validated.`,
      status: 'success',
      data: {
        validation: {
          error: false,
          field,
          field_value: fieldValue,
          condition: rule.condition,
          condition_value: rule.condition_value
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: 'error',
      data: null
    });
  }
};
