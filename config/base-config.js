
const baseConfig = {

  eventCategories: [
    {
      id: 'entertainment',
      displayName: 'Entertainment',
      children: [
        {
          id: 'movies',
          displayName: 'Movies'
        },
        {
          id: 'performing_arts',
          displayName: 'Performing Arts',
          children: [
            {
              id: 'theater',
              displayName: 'Theater'
            },
            {
              id: 'balet',
              displayName: 'Balet'
            },
            {
              id: 'comedy',
              displayName: 'Comedy & Standup'
            }
          ]
        }
      ]
    }
  ]

};

module.exports = baseConfig;
