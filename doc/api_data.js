define({ "api": [
  {
    "type": "post",
    "url": "/api/aut/login",
    "title": "logging users",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Username",
            "description": "<p>username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "token",
            "optional": false,
            "field": "Token",
            "description": "<p>access token.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth",
    "name": "PostApiAutLogin"
  },
  {
    "type": "post",
    "url": "/api/aut/register",
    "title": "registering new user",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Username",
            "description": "<p>username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data",
            "description": "<p>userid.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth",
    "name": "PostApiAutRegister"
  },
  {
    "type": "delete",
    "url": "/api/notes",
    "title": "Deletes notes information",
    "group": "Notes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Notes unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "UpdatedNotes",
            "description": "<p>Array of all the notes in it.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notes.js",
    "groupTitle": "Notes",
    "name": "DeleteApiNotes"
  },
  {
    "type": "get",
    "url": "/api/notes",
    "title": "Request notes information",
    "group": "Notes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Notes",
            "description": "<p>Array of all the notes in it.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notes.js",
    "groupTitle": "Notes",
    "name": "GetApiNotes"
  },
  {
    "type": "get",
    "url": "/api/notes/:id",
    "title": "Request notes information",
    "group": "Notes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Notes unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Notes",
            "description": "<p>notes.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notes.js",
    "groupTitle": "Notes",
    "name": "GetApiNotesId"
  },
  {
    "type": "post",
    "url": "/api/notes",
    "title": "Adds new notes into DB",
    "group": "Notes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "UpdatedNotes",
            "description": "<p>Array of all the notes in it.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notes.js",
    "groupTitle": "Notes",
    "name": "PostApiNotes"
  },
  {
    "type": "put",
    "url": "/api/notes",
    "title": "Updated notes information",
    "group": "Notes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Notes unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "UpdatedNotes",
            "description": "<p>Array of all the notes in it.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notes.js",
    "groupTitle": "Notes",
    "name": "PutApiNotes"
  },
  {
    "type": "get",
    "url": "/api/users/",
    "title": "Request users information",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>Array of all users in it.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "name": "GetApiUsers"
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Request user information",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "data",
            "optional": false,
            "field": "User",
            "description": "<p>User Data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "name": "GetApiUsersId"
  },
  {
    "type": "get",
    "url": "/api/usrs/:id",
    "title": "Deletes user information",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "UpdatedUsers",
            "description": "<p>Array of all the users in it.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "name": "GetApiUsrsId"
  }
] });
