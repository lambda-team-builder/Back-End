define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "C__Users_conco_Desktop_LambdaSchool_week15_build_back_end_this_one_docs_main_js",
    "groupTitle": "C__Users_conco_Desktop_LambdaSchool_week15_build_back_end_this_one_docs_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "api/classrooms/:id",
    "title": "Find classroom by ID",
    "version": "0.1.0",
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
            "type": "Object",
            "optional": false,
            "field": "The",
            "description": "<p>requested classroom</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  [{\n     id: 1,\n     name: \"Build Week 2\",\n  }]",
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
    "filename": "./api/routers/classroom-router.js",
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
          "content": "HTTP/1.1 200 OK\n   [{\n      id: 1,\n     name: \"Build Week 2\"\n   },\n   {\n      id: 1,\n     name: \"Build Week 2\"\n   }]",
          "type": "json"
        }
      ]
    },
    "filename": "./api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "post",
    "url": "api/classrooms/",
    "title": "Create a classroom",
    "version": "0.1.0",
    "name": "postClassroom",
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
            "description": "<p>Name of classroom</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"name\":\"first class room\",\n}",
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
        }
      ]
    },
    "filename": "./api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "post",
    "url": "api/classrooms/:id/projects",
    "title": "Add a project to a classroom",
    "version": "0.1.0",
    "name": "postClassroomProject",
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
    "filename": "./api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "post",
    "url": "api/classrooms/:id/classroom_projects/:classroom_project_id/project_member",
    "title": "Create a member slot for a classroom project.",
    "version": "0.1.0",
    "name": "postClassroomProjectMember",
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
    "filename": "./api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
  },
  {
    "type": "put",
    "url": "api/classrooms/:id",
    "title": "Edit classroom name",
    "version": "0.1.0",
    "name": "putClassroom",
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
    "filename": "./api/routers/classroom-router.js",
    "groupTitle": "Classrooms"
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
    "filename": "./api/routers/project-router.js",
    "groupTitle": "Projects"
  },
  {
    "type": "post",
    "url": "api/projects/",
    "title": "Create a project",
    "version": "0.1.0",
    "name": "postProjects",
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
    "filename": "./api/routers/project-router.js",
    "groupTitle": "Projects"
  },
  {
    "type": "get",
    "url": "api/classrooms/",
    "title": "Get list of all roles",
    "version": "0.1.0",
    "name": "getRoles",
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
            "field": "A",
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
    "filename": "./api/routers/roles-router.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "api/roles/",
    "title": "Create a role",
    "version": "0.1.0",
    "name": "postRole",
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
    "filename": "./api/routers/roles-router.js",
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
    "filename": "./api/routers/auth-router.js",
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
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_type_id",
            "description": "<p>Id of the user type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"name\":\"connor\",\n \"email\":\"connor@gmail.com\",\n \"password\": \"1234\",\n \"user_type_id\": 2\n}",
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
            "description": "<p>Auth Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"name\": \"connor\",\n  \"email\": \"connor@hotmail.com\",\n  \"user_type\": \"student\",\n  \"token\" : \"hdf78623rhfkjsdhkf\"\n}",
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
          "title": "Error-Response: Email in use",
          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"message\": \"Email is already in use\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api/routers/auth-router.js",
    "groupTitle": "User"
  }
] });
