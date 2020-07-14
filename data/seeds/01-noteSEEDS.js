
exports.seed = function(knex) {
  return knex('notes').insert([
    {
      title: "this is an edited note",
      textBody: "my notehhhhhlllllllll",
    },
    {
      title: "Title",
      textBody: "Cobnnnnnnnnnntent",
    },
    {
      title: "bbbbbbbb",
      textBody: "nnnnnn",
    },
    {
      title: "mmmmmmmmmmmmmm",
      textBody: "kkkkkkkkkkkkk",
    }
  ]);
};
