define({ "api": [
  {
    "type": "get",
    "url": "api/classroom_admins/",
    "title": "Get a list of user's classrooms that user admin's",
    "version": "0.1.0",
    "name": "getClassroomAdmins",
    "group": "ClassroomAdmins",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "classrooms",
            "description": "<p>A list of classrooms.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n[\n   {\n       \"classroom_admins_id\": 1,\n       \"classroom_id\": 1,\n       \"classroom_name\": \"build week 1\"\n   },\n   {\n       \"classroom_admins_id\": 2,\n       \"classroom_id\": 2,\n       \"classroom_name\": \"build week 2\"\n   },\n   {\n       \"classroom_admins_id\": 3,\n       \"classroom_id\": 3,\n       \"classroom_name\": \"build week 3\"\n   }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 INTERNAL SERVER ERROR\n{\n  \"message\": \"server Error\",\n  \"error\": {error object: \"\"}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/classroom_admins-router.js",
    "groupTitle": "ClassroomAdmins"
  },
  {
    "type": "get",
    "url": "api/classrooms/:id",
    "title": "Get classroom by ID",
    "version": "0.2.0",
    "name": "getClassroom",
    "group": "Classrooms",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the classroom</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the classroom</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "projects",
            "description": "<p>A list of the classroom's projects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n  {\n      \"id\": 1,\n      \"name\": \"Classroom one\",\n      \"projects\": [\n          {\n              \"id\": 1,\n              \"name\": \" a project\",\n              \"description\": \"This is a long and boring project.\",\n              \"roles\": [\n                  {\n                      \"id\": 1,\n                      \"user_id\": 1,\n                      \"user_name\": \"admin\",\n                      \"role_name\": \"Lead\"\n                  },\n                  {\n                      \"id\": 2,\n                      \"user_id\": null,\n                      \"user_name\": null,\n                      \"role_name\": \"Backend\"\n                  },\n                  {\n                      \"id\": 3,\n                      \"user_id\": 2,\n                      \"user_name\": \"connor\",\n                      \"role_name\": \"Backend\"\n                  },\n                  {\n                      \"id\": 4,\n                      \"user_id\": null,\n                      \"user_name\": null,\n                      \"role_name\": \"Lead\"\n                  }\n              ]\n          }\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 FORBIDDEN\n{\n  \"message\": \"Classroom not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "put",
    "url": "api/classrooms/:id/projects/:classroom_project_id",
    "title": "get classroom project",
    "version": "0.1.0",
    "name": "getClassroomProject",
    "group": "Classrooms",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the classroom project</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the project</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the project</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "project_members",
            "description": "<p>A list of project member objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"name\": \" a project\",\n    \"description\": \"This is a long and boring project.\",\n    \"project_members\": [\n        {\n            \"id\": 1,\n            \"user_id\": 1,\n            \"user_name\": \"admin\",\n            \"role_name\": \"Lead\"\n        },\n        {\n            \"id\": 2,\n            \"user_id\": null,\n            \"user_name\": null,\n            \"role_name\": \"Backend\"\n        },\n        {\n            \"id\": 3,\n            \"user_id\": 2,\n            \"user_name\": \"connor\",\n            \"role_name\": \"Backend\"\n        },\n        {\n            \"id\": 4,\n            \"user_id\": null,\n            \"user_name\": null,\n            \"role_name\": \"Lead\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: If no project was found",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"message\": \"Classroom not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "get",
    "url": "api/classrooms/",
    "title": "Get list of all classrooms",
    "version": "0.1.0",
    "name": "getClassrooms",
    "group": "Classrooms",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "A",
            "description": "<p>list of all classrooms</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n   [{\n      id: 1,\n     name: \"Build Week 2\"\n   },\n   {\n      id: 2,\n     name: \"Build Week 2\"\n   }]",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "post",
    "url": "api/classrooms/",
    "title": "Create a classroom",
    "version": "0.1.0",
    "name": "postClassroom",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "group": "Classrooms",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Admin auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of classroom</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Optional password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: No password",
          "content": "{\n \"name\":\"first class room\"\n}",
          "type": "json"
        },
        {
          "title": "Request-Example: With password",
          "content": "{\n \"name\":\"first class room\",\n \"password\":\"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the classroom</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the classroom</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "classroom_admin_user_ids",
            "description": "<p>List of group's admins by id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"id\": \"1\",\n  \"name\": \"first class room\",\n  \"classroom_admin_user_ids\": [2]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Not all fields",
          "content": "HTTP/1.1 401 BAD REQUEST\n{\n  \"message\": \"All fields required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Name in use",
          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"message\": \"classroom name is already in use\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: not admin",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  message: \"User does not have permission to perform this action.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "post",
    "url": "api/classrooms/:id/projects",
    "title": "Add a project to a classroom",
    "version": "0.1.0",
    "name": "postClassroomProject",
    "permission": [
      {
        "name": "classroomAdmin"
      }
    ],
    "group": "Classrooms",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "project_id",
            "description": "<p>The project_id of the project to get added to classroom</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"project_id\": 2\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the classroom project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"id\": 2\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Not all fields",
          "content": "HTTP/1.1 401 BAD REQUEST\n{\n  \"message\": \"All fields required\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "post",
    "url": "api/classrooms/:id/classroom_projects/:classroom_project_id/project_member",
    "title": "Create a member slot for a classroom project.",
    "version": "0.1.0",
    "name": "postClassroomProjectMember",
    "permission": [
      {
        "name": "classroomAdmin"
      }
    ],
    "group": "Classrooms",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>The role_id of the new slot for the classroom project.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"role_id\": 2\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the new classroom project member slot</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>The role_id for the role of the member slot</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "classroom_project_id",
            "description": "<p>The classroom_project_id for the classroom project that this member slot belongs to.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Will be null, When a user takes this slot it contains that users_id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n    \"id\": 1,\n    \"role_id\": 1,\n    \"user_id\": null,\n    \"classroom_project_id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Not all fields",
          "content": "HTTP/1.1 401 BAD REQUEST\n{\n  \"message\": \"All fields required\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "put",
    "url": "api/classrooms/:id",
    "title": "Edit classroom name",
    "version": "0.1.0",
    "name": "putClassroom",
    "permission": [
      {
        "name": "classroomAdmin"
      }
    ],
    "group": "Classrooms",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>New classroom name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"name\": \"Build Week 5\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "The",
            "description": "<p>neww classroom</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 CREATED\n{\n  \"id\": 2,\n  \"name\": \"Build Week 5\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: If missing name",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"message\": \"Classroom name required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: If no classroom was found",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"message\": \"Classroom not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "put",
    "url": "api/classrooms/:id/join",
    "title": "Join classroom",
    "version": "0.1.0",
    "name": "putClassroomJoin",
    "group": "Classrooms",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>If classroom has password it is required to join</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"password\": \"1234\"\n}",
          "type": "json"
        },
        {
          "title": "Request-Example: No password",
          "content": "{\n \"password\": null\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 NO CONTENT",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: If missing name",
          "content": "HTTP/1.1 401 BAD REQUEST\n{\n  \"message\": \"Bad credentials\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: If no classroom was found",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"message\": \"Classroom not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Already member",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"message\": \"Aleady member of classroom\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "put",
    "url": "api/project_members/:id",
    "title": "Add user to a member slot for group admin",
    "version": "0.1.0",
    "name": "putProjectMembers__id",
    "group": "ProjectMembers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Admin of groups auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>The user_id or null to remove a user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: Add user to slot",
          "content": "{\n \"user_id\": 2\n}",
          "type": "json"
        },
        {
          "title": "Request-Example: remove user from slot",
          "content": "{\n \"user_id\": null\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the project member</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>The role id of this project member</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>The user id of this project member</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "classroom_project_id",
            "description": "<p>The id of C.P. that this project member belongs to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: add user",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"id\": 1,\n  \"role_id\": 1,\n  \"user_id\": 1,\n  \"classroom_project_id\": 1\n}",
          "type": "json"
        },
        {
          "title": "Success-Response: remove user",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"id\": 1,\n  \"role_id\": 1,\n  \"user_id\": null,\n  \"classroom_project_id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Not all fields",
          "content": "HTTP/1.1 401 BAD REQUEST\n{\n  \"message\": \"All fields required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Not group admin",
          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"message\": \"This user is not a group admin for this group\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: not valid member",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"message\": \"That project member slot does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/project_members-router.js",
    "groupTitle": "ProjectMembers"
  },
  {
    "type": "put",
    "url": "api/project_members/:id/join",
    "title": "User fills a member slot",
    "version": "0.1.0",
    "name": "putProjectMembers__id_join",
    "group": "ProjectMembers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the project member</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>The role id of this project member</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>The user id of this project member</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "classroom_project_id",
            "description": "<p>The id of C.P. that this project member belongs to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: add user",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"id\": 1,\n  \"role_id\": 1,\n  \"user_id\": 1,\n  \"classroom_project_id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: spot filled",
          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"message\": \"Spot is already filled\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/project_members-router.js",
    "groupTitle": "ProjectMembers"
  },
  {
    "type": "put",
    "url": "api/project_members/:id/leave",
    "title": "User leaves a member slot",
    "version": "0.1.0",
    "name": "putProjectMembers__id_leave",
    "group": "ProjectMembers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the project member</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>The role id of this project member</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>The user id of this project member</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "classroom_project_id",
            "description": "<p>The id of C.P. that this project member belongs to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: add user",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"id\": 1,\n  \"role_id\": 1,\n  \"user_id\": null,\n  \"classroom_project_id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: spot filled",
          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"message\": \"User already not filling this spot.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/project_members-router.js",
    "groupTitle": "ProjectMembers"
  },
  {
    "type": "get",
    "url": "api/projects/",
    "title": "Get all projects",
    "version": "0.1.0",
    "name": "getProjects",
    "group": "Projects",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "projects",
            "description": "<p>A array of projects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"1\",\n    \"name\":\"first project\",\n    \"description\": \"This is a long and boring project.\"\n  },\n   {\n    \"id\": \"2\",\n    \"name\":\"second project\",\n    \"description\": \"This is a sort and fun project.\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Unauthorized",
          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"message\": \"No valid credentials provided\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/project-router.js",
    "groupTitle": "Projects"
  },
  {
    "type": "post",
    "url": "api/projects/",
    "title": "Create a project",
    "version": "0.1.0",
    "name": "postProjects",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "Projects",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"name\":\"this project\",\n \"description\": \"This is a long and boring project.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the project</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the project</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"id\": 1,\n  \"name\":\"this project\",\n  \"description\": \"This is a long and boring project.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Not all fields",
          "content": "HTTP/1.1 401 BAD REQUEST\n{\n  \"message\": \"All fields required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Name in use",
          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"message\": \"Project already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/project-router.js",
    "groupTitle": "Projects"
  },
  {
    "type": "get",
    "url": "api/classrooms/",
    "title": "Get list of all roles",
    "version": "0.1.0",
    "name": "getRoles",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "Roles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "array_of_roles",
            "description": "<p>list of all roles</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n   [{\n      id: 1,\n      name: \"frontend\"\n   },\n   {\n      id: 1,\n     name: \"backend\"\n   }]",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/roles-router.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "api/roles/",
    "title": "Create a role",
    "version": "0.1.0",
    "name": "postRole",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "Roles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"name\":\"frontend\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the frontend</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"id\": \"1\",\n  \"name\": \"frontend\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Not all fields",
          "content": "HTTP/1.1 401 BAD REQUEST\n{\n  \"message\": \"All fields required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Name in use",
          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"message\": \"Role already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/roles-router.js",
    "groupTitle": "Roles"
  },
  {
    "type": "put",
    "url": "api/roles/:id",
    "title": "Update a role",
    "version": "0.1.0",
    "name": "putRole",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "Roles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"name\":\"frontend\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the frontend</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"1\",\n  \"name\": \"frontend\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Not all fields",
          "content": "HTTP/1.1 401 BAD REQUEST\n{\n  \"message\": \"All fields required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Name in use",
          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"message\": \"Cannot update because that role already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Not found",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"message\": \"Role not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/roles-router.js",
    "groupTitle": "Roles"
  },
  {
    "type": "put",
    "url": "api/auth/login",
    "title": "Login a user",
    "version": "0.1.0",
    "name": "loginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\":\"connor@gmail.com\",\n \"password\":\"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_type",
            "description": "<p>The type of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"name\": \"connor\",\n  \"email\": \"connor@hotmail.com\",\n  \"user_type\": \"student\",\n  \"token\": \"GHFHJUI#Y$SAHDJKHA\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Bad credentials",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"message\": \"Bad credentials\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Missing credentials",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"message\": \"Email and password are required\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/auth-router.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "api/auth/refresh",
    "title": "Refresh JWT",
    "version": "0.1.0",
    "name": "refreshUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"GHFHJUI#Y$SAHDJKHA\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Bad credentials",
          "content": "HTTP/1.1 403 RESTRICTED\n{\n  \"message\": \"No valid credentials provided\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/auth-router.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "api/auth/register",
    "title": "Register a user",
    "version": "0.1.0",
    "name": "registerUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"name\":\"connor\",\n \"email\":\"connor@gmail.com\",\n \"password\": \"1234\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Auth Token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user_type",
            "description": "<p>the type of user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"name\": \"connor\",\n  \"email\": \"connor@hotmail.com\",\n  \"user_type\": \"{\n    \"id\": 2,\n     \"name\": \"student\"\n   },\",\n  \"token\" : \"hdf78623rhfkjsdhkf\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Not all fields",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"message\": \"All fields required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Email in use",
          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"message\": \"Email is already in use\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/auth-router.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "api/auth/password",
    "title": "Update users password",
    "version": "0.1.0",
    "name": "updatePasswordUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Users auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Current password of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>New password of user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\":\"connor@gmail.com\",\n \"password\": \"1234\",\n \"new_password\": \"12345\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Auth Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"token\" : \"hdf78623rhfkjsdhkf\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Not all fields",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"message\": \"Email, password and new password are required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Cannot login",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"message\": \"Bad credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/auth-router.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "api/auth/:user_id/user_type",
    "title": "Change selected users user type",
    "version": "0.1.0",
    "name": "updateUserType",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Admins auth token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of user type to change to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"name\":\"admin\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 NO CONTENT",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: Not all fields",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"message\": \"name required\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Cannot login",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"message\": \"Bad credentials\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: User not found",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"message\": \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: Name not found",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"message\": \"User type 'sam'  does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routers/auth-router.js",
    "groupTitle": "User"
  }
] });
