
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title:'Test 1', textBody: 'Can I get these notes to work?!'},
        {title:'Test 2', textBody: 'If you are reading this then it work!'},
        {title:'Test 3', textBody: 'You my friend are a genius!!!!'}
      ]);
    });
};
