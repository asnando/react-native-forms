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
