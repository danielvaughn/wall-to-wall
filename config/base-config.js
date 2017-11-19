
const _ = require('lodash');


const baseConfig = {

  categories: [
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
              id: 'ballet',
              displayName: 'Ballet'
            },
            {
              id: 'comedy',
              displayName: 'Comedy & Standup'
            }
          ]
        }
      ]
    }
  ],

  flattenCategories: function(){
    var categories = [];

    
  }

};

module.exports = baseConfig;
