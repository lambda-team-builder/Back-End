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
    "filename": "./doc/main.js",
    "group": "C__Users_conco_Desktop_LambdaSchool_week15_build_Back_End_doc_main_js",
    "groupTitle": "C__Users_conco_Desktop_LambdaSchool_week15_build_Back_End_doc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login a user",
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
    "version": "0.0.0",
    "filename": "./api/routers/auth-router.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register a user",
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
    "version": "0.0.0",
    "filename": "./api/routers/auth-router.js",
    "groupTitle": "User"
  }
] });
