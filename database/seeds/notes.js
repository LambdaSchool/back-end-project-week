
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Note #1', note: 'This is note #1', editToggle: false},
        {title: 'Note #2', note: 'This is note #2', editToggle: false},
        {title: 'Note #3', note: 'This is note #3', editToggle: false},
      ]);
    });
};
