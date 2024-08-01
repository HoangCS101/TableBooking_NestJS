import validator from 'validator';

export class UserValidator {
  static validate(body) {
    const errors: string[] = [];

    const validationRules = {
      firstName: [
        { rule: validator.isEmpty, message: 'firstName cannot be empty' },
      ],
      lastName: [
        { rule: validator.isEmpty, message: 'lastName cannot be empty' },
      ],
      userName: [
        {
          rule: (value) => !validator.isLength(value, { min: 8 }),
          message: 'userName must be at least 8 characters long',
        },
      ],
      email: [
        {
          rule: (value) => !validator.isEmail(value),
          message: 'Invalid Email format',
        },
      ],
      password: [
        {
          rule: (value) => !validator.isLength(value, { min: 8 }),
          message: 'Password must be at least 8 characters long',
        },
      ],
    };

    // Iterate over all fields in the body
    for (const field in body) {
      if (body.hasOwnProperty(field)) {
        const value = body[field];
        const rules = validationRules[field];

        if (rules) {
          for (const { rule, message } of rules) {
            if (rule(value)) errors.push(message);
          }
        }
      }
    }

    return errors;
  }
}
