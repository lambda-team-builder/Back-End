/**
 *  @api {get} api/classrooms/:id Find classroom by ID
 *  @apiVersion 0.1.0
 *  @apiName getClassroom
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiSuccess {Object} The requested classroom
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      [{
 *         id: 1,
 *         name: "Build Week 2",
 *      }]
 *
 *  @apiErrorExample Error-Response:
 *    HTTP/1.1 404 FORBIDDEN
 *    {
 *      "message": "Classroom not found"
 *    }
 */
/**
 *  @api {get} api/classrooms/:id Get classroom by ID
 *  @apiVersion 0.2.0
 *  @apiName getClassroom
 *  @apiGroup Classrooms
 *
 *  @apiHeader {String} Authorization Users auth token.
 *
 *  @apiSuccess {Number} id the id of the classroom
 *  @apiSuccess {String} name The name of the classroom
 *  @apiSuccess {Array} projects A list of the classroom's projects
 *
 *  @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *      {
 *          "id": 1,
 *          "name": "Classroom one",
 *          "projects": [
 *              {
 *                  "id": 1,
 *                  "name": " a project",
 *                  "description": "This is a long and boring project.",
 *                  "roles": [
 *                      {
 *                          "id": 1,
 *                          "user_id": 1,
 *                          "user_name": "admin",
 *                          "role_name": "Lead"
 *                      },
 *                      {
 *                          "id": 2,
 *                          "user_id": null,
 *                          "user_name": null,
 *                          "role_name": "Backend"
 *                      },
 *                      {
 *                          "id": 3,
 *                          "user_id": 2,
 *                          "user_name": "connor",
 *                          "role_name": "Backend"
 *                      },
 *                      {
 *                          "id": 4,
 *                          "user_id": null,
 *                          "user_name": null,
 *                          "role_name": "Lead"
 *                      }
 *                  ]
 *              }
 *          ]
 *      }
 *
 *
 *  @apiErrorExample Error-Response:
 *    HTTP/1.1 404 FORBIDDEN
 *    {
 *      "message": "Classroom not found"
 *    }
 */
