import { ReactNode } from 'react';

const formConstant: FormConstantType = {
  name: {
    empty: 'Please enter your name!',
  },
  email: {
    empty: 'Please enter your email!',
    format: 'The email address is incorrect',
  },
  username: {
    format: 'Incorrect username format',
  },
  password: {
    format: 'Incorrect password format',
    tooltip:
      'Password consists of 6 to 16 characters, including 1 uppercase letter, 1 special character, and one number',
  },
};

export default formConstant;

type FormRuleConstant = {
  tooltip?: ReactNode;
  empty?: string;
  format?: string;
  whitespace?: string;
};

type FormConstantType = {
  name?: FormRuleConstant;
  email?: FormRuleConstant;
  username?: FormRuleConstant;
  password?: FormRuleConstant;
};
