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
      name: 'random1',
      title: 'Random 1',
      type: 'text',
    },
    {
      name: 'phone',
      title: 'Phone (BR)',
      maskType: 'phone',
      type: 'masked',
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
