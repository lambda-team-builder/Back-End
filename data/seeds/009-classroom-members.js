exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  return knex("classroom_members").insert([
    { user_id: 2, classroom_id: 1, user_idWithClassroom_id: "21" },
    { user_id: 3, classroom_id: 1, user_idWithClassroom_id: "31" },
    { user_id: 4, classroom_id: 1, user_idWithClassroom_id: "41" },
    { user_id: 5, classroom_id: 1, user_idWithClassroom_id: "51" },
    { user_id: 6, classroom_id: 1, user_idWithClassroom_id: "61" },
    { user_id: 7, classroom_id: 1, user_idWithClassroom_id: "71" },
    { user_id: 8, classroom_id: 1, user_idWithClassroom_id: "81" },
    { user_id: 9, classroom_id: 1, user_idWithClassroom_id: "91" },
    { user_id: 10, classroom_id: 2, user_idWithClassroom_id: "102" },
    { user_id: 11, classroom_id: 2, user_idWithClassroom_id: "112" },
    { user_id: 12, classroom_id: 2, user_idWithClassroom_id: "122" },
    { user_id: 2, classroom_id: 2, user_idWithClassroom_id: "22" },
    { user_id: 3, classroom_id: 2, user_idWithClassroom_id: "32" },
    { user_id: 4, classroom_id: 2, user_idWithClassroom_id: "42" },
    { user_id: 5, classroom_id: 2, user_idWithClassroom_id: "52" },
    { user_id: 6, classroom_id: 2, user_idWithClassroom_id: "62" },
    { user_id: 7, classroom_id: 3, user_idWithClassroom_id: "73" },
    { user_id: 8, classroom_id: 3, user_idWithClassroom_id: "83" },
    { user_id: 9, classroom_id: 3, user_idWithClassroom_id: "93" }
  ]);
};
