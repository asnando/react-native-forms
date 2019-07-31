const withViewProps = {
  fields: [
    {
      name: 'user_name',
      title: 'User Name',
      required: true,
    },
    {
      name: 'receive_news',
      title: 'Receive News',
      type: 'switch',
      activeColor: 'purple',
    },
    {
      name: 'options',
      title: 'Select a option',
      type: 'radio',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ],
    },
    {
      name: 'another_options',
      title: 'Select one option from the modal list',
      type: 'option',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ],
      required: true,
    },
    {
      name: 'phone',
      title: 'Phone (BR)',
      maskType: 'phone',
      type: 'masked',
    },
    {
      title: 'Send',
      type: 'submit',
    },
    {
      title: 'Clear',
      type: 'clear',
    }
  ],
};

export default withViewProps;
