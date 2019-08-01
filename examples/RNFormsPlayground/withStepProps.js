const withStepProps = {
  indicatorColor: 'purple',
  buttonTintColor: 'purple',
  buttonTextColor: 'white',
  backButtonTextColor: 'purple',
  nextStepButtonText: 'Next Step',
  backButtonText: 'Go Back',
  steps: [
    {
      title: 'Step 1',
      fields: [
        {
          name: 'user_name',
          title: 'User Name',
        },
        {
          name: 'contact_type',
          type: 'radio',
          title: 'Which type of contact you wanna use?',
          options: [
            { label: 'E-mail', value: 'email' },
            { label: 'Phone', value: 'phone' },
          ],
        },
        {
          name: 'random1',
          title: 'Random 1',
          type: 'text',
        },
        {
          name: 'random2',
          title: 'Random 2',
          type: 'text',
        },
        {
          name: 'random3',
          title: 'Random 3',
          type: 'text',
        },
        {
          name: 'random4',
          title: 'Random 4',
          type: 'text',
        },
        {
          name: 'random5',
          title: 'Random 5',
          type: 'text',
        },
        {
          name: 'random6',
          title: 'Random 6',
          type: 'text',
        },
        {
          name: 'random7',
          title: 'Random 7',
          type: 'text',
        },
        {
          name: 'random8',
          title: 'Random 8',
          type: 'text',
        },
        {
          name: 'random9',
          title: 'Random 9',
          type: 'text',
        },
      ],
    },
    {
      title: 'Step 2',
      fields: [
        {
          name: 'user_email',
          title: 'User Email',
          keyboardType: 'email-address',
          required: true,
          validator: 'email',
          show: ({ contact_type }) => contact_type === 'email',
        },
        {
          name: 'user_cellphone',
          title: 'User Cellphone',
          type: 'masked',
          maskType: 'phone',
          keyboardType: 'numeric',
          required: true,
          validator: 'br-cellphone',
          show: ({ contact_type }) => contact_type === 'phone',
        },
      ],
    },
    {
      title: 'Step 3',
      fields: [
        {
          name: 'user_birthday',
          title: 'Birthday',
          type: 'masked',
          maskType: 'date',
        },
        {
          name: 'cnpj',
          title: 'CNPJ',
          type: 'masked',
          maskType: 'cnpj',
          validator: 'cnpj',
          // required: true,
        }
      ],
    },
  ],
};

export default withStepProps;
