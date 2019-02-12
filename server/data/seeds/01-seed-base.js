
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: 1, 
          title: '1-title',
          content: 'content placeholder'
        },
      ]);
    });
};
