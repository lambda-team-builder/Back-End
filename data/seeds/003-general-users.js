exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      user_type_id: 2,
      name: "Tim",
      email: "tim@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "Jim",
      email: "jim@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "Connor",
      email: "connor@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "Sam",
      email: "sam@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "The Rock",
      email: "rock@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "Jon",
      email: "jon.com@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "timmy",
      email: "timdfg@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "Jimmy",
      email: "jimmy@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "kim",
      email: "kim@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "Samual",
      email: "samual@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "The Rockey",
      email: "rockey@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    },
    {
      user_type_id: 2,
      name: "Jon",
      email: "joncomtom@gmail.com",
      password: "$2a$14$dbfWpQB7OAWIS9w4m7cISOUIinNmJ6.Eq2ZIPIiRSLwpb6pQ9fLle"
    }
  ]);
};
