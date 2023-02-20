import Input from '../../../components/Forms/InputFields/input';

export const loginFields = [
  {
    component: Input,
    name: 'email',
    id: 'email',
    type: 'email',
    'data-value': '',
    autoComplete: 'email',
    placeholder: 'Email',
    className: 'rounded-t-md',
    validate: value => {
      if (!value) {
        return 'Email is required';
      }
      return '';
    },
  },
  {
    component: Input,
    name: 'password',
    id: 'password',
    type: 'password',
    'data-value': '',
    autoComplete: 'current-password',
    placeholder: 'Password',
    className: 'rounded-b-md',
    validate: value => {
      if (!value) {
        return 'Password is required';
      }
      return '';
    },
  },
];

export const loginInitialValues = loginFields.reduce(
  (p, c) => ({ ...p, [c.name]: c['data-value'] }),
  {},
);
