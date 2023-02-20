import Input from '../../../components/Forms/InputFields/input';

export const registerFields = [
  {
    component: Input,
    name: 'name',
    id: 'name',
    'data-value': '',
    autoComplete: 'name',
    placeholder: 'Name',
    className: 'rounded-t-md',
    validate: value => {
      if (!value) {
        return 'Name is required';
      }
      return '';
    },
  },
  {
    component: Input,
    name: 'email',
    id: 'email',
    type: 'email',
    'data-value': '',
    autoComplete: 'email',
    placeholder: 'Email',
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
    placeholder: 'Password',
    validate: value => {
      if (!value) {
        return 'Password is required';
      }
      return '';
    },
  },
  {
    component: Input,
    name: 'confirmPassword',
    id: 'confirmPassword',
    type: 'password',
    'data-value': '',
    placeholder: 'Confirm Password',
    className: 'rounded-b-md',
    validate: value => {
      if (!value) {
        return 'Password is required';
      }
      return '';
    },
  },
];

export const registerInitialValues = registerFields.reduce(
  (p, c) => ({ ...p, [c.name]: c['data-value'] }),
  {},
);
