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
        },
        {
          name: 'user_cellphone',
          title: 'User Cellphone',
          type: 'masked',
          maskType: 'phone',
          keyboardType: 'numeric',
          required: true,
          validator: 'br-cellphone',
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
          required: true,
        }
      ],
    },
  ],
};

export default withStepProps;
