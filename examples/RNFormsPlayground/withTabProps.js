const withTabProps = {
  tabIndicatorColor: 'white',
  tabTintColor: 'purple',
  tabTextColor: 'white',
  tabs: [
    {
      title: 'Tab 1',
      fields: [
        {
          name: 'user_name',
          title: 'User Name',
          required: true,
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
        {
          title: 'Send',
          type: 'submit',
        },
        {
          title: 'Clear',
          type: 'clear',
        },
      ]
    },
    {
      title: 'Tab 2',
      fields: [
        {
          name: 'user_email',
          title: 'User Email',
          required: true,
        },
        {
          title: 'Send',
          type: 'submit',
        },
        {
          title: 'Clear',
          type: 'clear',
        },
      ],
    },
  ],
};

export default withTabProps;
