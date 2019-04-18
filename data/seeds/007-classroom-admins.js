exports.seed = function(knex, Promise) {
  return knex("classroom_admins").insert([
    { user_id: 1, classroom_id: 1, user_id_classroom_id: "11" },
    { user_id: 1, classroom_id: 2, user_id_classroom_id: "12" },
    { user_id: 1, classroom_id: 3, user_id_classroom_id: "13" },
    { user_id: 2, classroom_id: 1, user_id_classroom_id: "21" },
    { user_id: 2, classroom_id: 2, user_id_classroom_id: "22" },
    { user_id: 4, classroom_id: 1, user_id_classroom_id: "41" }
  ]);
};

/**
 *  @api {get} api/classroom_admins/classroom?:id Makes a user a classroom admin
 *  @apiVersion 0.1.0
 *  @apiName postClassroomAdmins
 *  @apiGroup ClassroomAdmins
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiParam {Number} user_id The user to become a classroom admin
 *
 *  @apiSuccess {Array} classrooms A list of classrooms.
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    [
 *       {
 *           "classroom_admins_id": 1,
 *           "classroom_id": 1,
 *           "classroom_name": "build week 1"
 *       },
 *       {
 *           "classroom_admins_id": 2,
 *           "classroom_id": 2,
 *           "classroom_name": "build week 2"
 *       },
 *       {
 *           "classroom_admins_id": 3,
 *           "classroom_id": 3,
 *           "classroom_name": "build week 3"
 *       }
 *    ]
 *
 *
 *  @apiErrorExample Error-Response:
 *    HTTP/1.1 500 INTERNAL SERVER ERROR
 *    {
 *      "message": "server Error",
 *      "error": {error object: ""}
 *    }
 */
