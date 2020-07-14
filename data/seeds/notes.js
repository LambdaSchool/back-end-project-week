
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'rowValue1', textBody:'sdfj;laksjdflk'},
        {title: 'rowValue2', textBody:'sdfj;laksjdflk'},
        {title: 'rowValue3', textBody:'sdfj;laksjdflk'}
      ]);
    });
};