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
