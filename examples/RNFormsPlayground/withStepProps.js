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
        },
      ],
    },
    {
      title: 'Step 3',
      fields: [
        {
          name: 'user_birthday',
          title: 'Birthday',
          required: true,
        }
      ],
    },
  ],
};

export default withStepProps;
