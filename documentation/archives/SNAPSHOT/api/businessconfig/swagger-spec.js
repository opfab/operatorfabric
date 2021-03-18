window.swaggerSpec={
  "swagger" : "2.0",
  "info" : {
    "description" : "OperatorFabric BusinessconfigParty Management API",
    "version" : "SNAPSHOT",
    "title" : "Businessconfig Management",
    "termsOfService" : "",
    "contact" : {
      "email" : "opfab_AT_lists.lfenergy.org",
      "url" : "https://opfab.github.io/"
    },
    "license" : {
      "name" : "Mozilla Public License V2.0",
      "url" : "http://mozilla.org/MPL/2.0/"
    }
  },
  "host" : "localhost",
  "basePath" : "/apis",
  "schemes" : [ "http" ],
  "paths" : {
    "/businessconfig/processes" : {
      "get" : {
        "summary" : "List existing processes",
        "description" : "List existing processes",
        "operationId" : "getProcesses",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/Process"
              }
            }
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      },
      "post" : {
        "summary" : "Upload process configuration bundle",
        "description" : "Upload process configuration bundle. Bundle is a gzipped tarball (tar.gz) containing a config.json file (containing a Process object in json notation) and the associated resource files",
        "operationId" : "uploadBundle",
        "consumes" : [ "multipart/form-data" ],
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "file",
          "in" : "formData",
          "description" : "file to upload",
          "required" : true,
          "type" : "file"
        } ],
        "responses" : {
          "201" : {
            "description" : "Successful creation",
            "schema" : {
              "$ref" : "#/definitions/Process"
            }
          },
          "401" : {
            "description" : "Authentication required"
          },
          "403" : {
            "description" : "Forbidden - ADMIN role necessary"
          }
        }
      },
      "delete" : {
        "summary" : "Delete all existing process configuration data",
        "description" : "Delete all existing process configuration data",
        "operationId" : "clearProcesses",
        "produces" : [ "application/json" ],
        "responses" : {
          "204" : {
            "description" : "OK"
          },
          "401" : {
            "description" : "Authentication required"
          },
          "500" : {
            "description" : "Unable to delete processes"
          }
        }
      }
    },
    "/businessconfig/processes/{processId}" : {
      "get" : {
        "summary" : "Access configuration data for a given process",
        "description" : "Access configuration data for a given process",
        "operationId" : "getProcess",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "processId",
          "in" : "path",
          "description" : "Id of the process to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of process (defaults to latest)",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/Process"
            }
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      },
      "delete" : {
        "summary" : "Delete existing process configuration data",
        "description" : "Delete existing process configuration data",
        "operationId" : "deleteBundle",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "processId",
          "in" : "path",
          "description" : "Id of the process to delete",
          "required" : true,
          "type" : "string"
        } ],
        "responses" : {
          "204" : {
            "description" : "OK"
          },
          "401" : {
            "description" : "Authentication required"
          },
          "404" : {
            "description" : "Not found"
          },
          "500" : {
            "description" : "Unable to delete process"
          }
        }
      }
    },
    "/businessconfig/processes/{processId}/templates/{templateName}" : {
      "get" : {
        "summary" : "Get existing template",
        "description" : "Get template, if file exists return file (application/handlebars) otherwise return error message (application/json)",
        "operationId" : "getTemplate",
        "produces" : [ "application/json", "application/handlebars" ],
        "parameters" : [ {
          "name" : "processId",
          "in" : "path",
          "description" : "Id of the process to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "locale",
          "in" : "query",
          "description" : "Locale iso code",
          "required" : false,
          "type" : "string"
        }, {
          "name" : "templateName",
          "in" : "path",
          "description" : "Name of template to retrieve (w.o. extension)",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of template (defaults to latest)",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "string",
              "format" : "binary"
            }
          },
          "404" : {
            "description" : "No such template"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    },
    "/businessconfig/processes/{processId}/css/{cssFileName}" : {
      "get" : {
        "summary" : "Get css file",
        "description" : "Get css file, if file exists return file (text/css) otherwise return error message (application/json)",
        "operationId" : "getCss",
        "produces" : [ "application/json", "text/css" ],
        "parameters" : [ {
          "name" : "processId",
          "in" : "path",
          "description" : "Id of the process to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "cssFileName",
          "in" : "path",
          "description" : "Name of stylesheet file to retrieve (w.o. extension)",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of stylesheet (defaults to latest)",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "string",
              "format" : "binary"
            }
          },
          "404" : {
            "description" : "No such template"
          }
        }
      }
    },
    "/businessconfig/processes/{processId}/i18n" : {
      "get" : {
        "summary" : "Get i18n file",
        "description" : "Get i18n file, if file exists return file (text/plain) otherwise return error message (application/json)",
        "operationId" : "getI18n",
        "produces" : [ "application/json", "text/plain" ],
        "parameters" : [ {
          "name" : "processId",
          "in" : "path",
          "description" : "Id of the process to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "locale",
          "in" : "query",
          "description" : "Locale iso code",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of i18n (defaults to latest)",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "string",
              "format" : "binary"
            }
          },
          "404" : {
            "description" : "No such template"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    },
    "/businessconfig/processes/{processId}/{state}/response" : {
      "get" : {
        "summary" : "Get response associated with a given state of a given process",
        "description" : "Get response associated with a given state of a given process, returns a response (application/json)",
        "operationId" : "getResponse",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "processId",
          "in" : "path",
          "description" : "Id of the process to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "state",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "query",
          "required" : false,
          "description" : "Required version of process (defaults to latest)",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/Response"
            }
          },
          "404" : {
            "description" : "No such process/state"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    },
    "/businessconfig/processes/{processId}/versions/{version}" : {
      "delete" : {
        "summary" : "Delete specific version of the configuration data for a given process",
        "description" : "Delete specific version of the configuration data for a given process",
        "operationId" : "deleteBundleVersion",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "processId",
          "in" : "path",
          "description" : "Id of the process to delete",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "path",
          "description" : "Version of process to delete",
          "required" : true,
          "type" : "string"
        } ],
        "responses" : {
          "204" : {
            "description" : "OK"
          },
          "401" : {
            "description" : "Authentication required"
          },
          "404" : {
            "description" : "Not found"
          },
          "500" : {
            "description" : "Unable to delete version of process"
          }
        }
      }
    },
    "/businessconfig/processgroups" : {
      "get" : {
        "summary" : "Get the groups of processes",
        "description" : "Get the groups of processes",
        "operationId" : "getProcessgroups",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/ProcessGroups"
            }
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      },
      "post" : {
        "summary" : "Upload file defining the groups of processes",
        "description" : "Upload file defining the groups of processes. This file must be in json format and is saved to disk, under the name 'processGroups.json'.",
        "operationId" : "uploadProcessgroups",
        "consumes" : [ "multipart/form-data" ],
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "file",
          "in" : "formData",
          "description" : "file to upload",
          "required" : true,
          "type" : "file"
        } ],
        "responses" : {
          "201" : {
            "description" : "Successful creation"
          },
          "401" : {
            "description" : "Authentication required"
          },
          "403" : {
            "description" : "Forbidden - ADMIN role necessary"
          }
        }
      }
    }
  },
  "definitions" : {
    "Process" : {
      "type" : "object",
      "description" : "Business process definition, also listing available resources",
      "properties" : {
        "id" : {
          "type" : "string",
          "description" : "Identifier referencing this process. It should be unique across the OperatorFabric instance."
        },
        "name" : {
          "type" : "string",
          "description" : "i18n key for the label of this process The value attached to this key should be defined in each XX.json file in the i18n folder of the bundle (where XX stands for the locale iso code, for example 'EN')"
        },
        "version" : {
          "type" : "string",
          "description" : "Process configuration version"
        },
        "states" : {
          "type" : "object",
          "additionalProperties" : {
            "type" : "object",
            "properties" : {
              "response" : {
                "$ref" : "#/definitions/Response"
              },
              "acknowledgmentAllowed" : {
                "description" : "Acknowledgment allowed or not",
                "$ref" : "#/definitions/AcknowledgmentAllowedEnum",
                "default" : "Never"
              },
              "name" : {
                "type" : "string",
                "description" : "i18n key for UI"
              },
              "description" : {
                "type" : "string",
                "description" : "i18n key for UI"
              },
              "showDetailCardHeader" : {
                "type" : "boolean",
                "description" : "Hide or show header card for question card"
              },
              "color" : {
                "type" : "string",
                "description" : "use as a display cue in the UI"
              },
              "userCard" : {
                "description" : "User card template and visibility options",
                "$ref" : "#/definitions/UserCard"
              },
              "templateName" : {
                "description" : "Name of the template to use",
                "type" : "string"
              },
              "styles" : {
                "description" : "Name of the css files to apply",
                "type" : "array",
                "items" : {
                  "type" : "string"
                }
              },
              "type" : {
                "description" : "Type of state (\"INPROGRESS\", \"FINISHED\" or \"CANCELED\")",
                "$ref" : "#/definitions/TypeOfStateEnum"
              }
            }
          }
        },
        "uiVisibility" : {
          "type" : "object",
          "properties" : {
            "monitoring" : {
              "type" : "boolean",
              "description" : "If this flag is set to true, the cards of this process will be visible on the monitoring screen"
            },
            "logging" : {
              "type" : "boolean",
              "description" : "If this flag is set to true, the cards of this process will be visible on the logging screen"
            },
            "calendar" : {
              "type" : "boolean",
              "description" : "If this flag is set to true, the cards of this process will be visible on the calendar screen"
            }
          }
        }
      },
      "required" : [ "id", "version" ],
      "example" : {
        "id" : "some_business_process",
        "name" : "some_business_process.label",
        "version" : "v1.0",
        "initial_state" : {
          "templateName" : "template1"
        },
        "other_state" : {
          "templateName" : "template2",
          "styles" : [ "my-template.css" ]
        }
      }
    },
    "I18n" : {
      "type" : "object",
      "description" : "describes an i18n label",
      "properties" : {
        "key" : {
          "type" : "string",
          "description" : "i18n client side key"
        },
        "parameters" : {
          "type" : "object",
          "description" : "Optional parameters",
          "additionalProperties" : {
            "type" : "string"
          }
        }
      },
      "example" : {
        "key" : "title",
        "parameters" : {
          "EN" : "My Title",
          "FR" : "Mon Titre"
        }
      },
      "required" : [ "key" ]
    },
    "Response" : {
      "description" : "defines a response to an action on the business process associated with the card",
      "type" : "object",
      "properties" : {
        "btnColor" : {
          "description" : "Response button color",
          "$ref" : "#/definitions/ResponseBtnColorEnum",
          "default" : "GREEN"
        },
        "btnText" : {
          "description" : "Response i18n button text",
          "$ref" : "#/definitions/I18n"
        },
        "lock" : {
          "description" : "If true, user can only act once",
          "type" : "boolean"
        },
        "state" : {
          "description" : "The state of the card triggered by the action",
          "type" : "string"
        },
        "externalRecipients" : {
          "description" : "The recipients that should receive the response card",
          "type" : "array",
          "items" : {
            "type" : "string"
          }
        }
      }
    },
    "ResponseBtnColorEnum" : {
      "type" : "string",
      "description" : "Response button color >\n* RED - The button will be red in the template\n* GREEN - The button will be green in the template\n* YELLOW - The button will be yellow in the template",
      "enum" : [ "RED", "GREEN", "YELLOW" ],
      "example" : "RED"
    },
    "AcknowledgmentAllowedEnum" : {
      "type" : "string",
      "description" : "Acknowledgment allowed >\n* ALWAYS - Acknowledgment always allowed\n* NEVER - Acknowledgment not allowed\n* ONLY_WHEN_RESPONSE_DISABLED_FOR_USER - Acknowledgment allowed only if response is disabled for the user",
      "enum" : [ "Always", "Never", "OnlyWhenResponseDisabledForUser" ]
    },
    "TypeOfStateEnum" : {
      "type" : "string",
      "description" : "Type of state >\n* INPROGRESS - In Progress\n* FINISHED - Finished\n* CANCELED - Canceled",
      "enum" : [ "INPROGRESS", "FINISHED", "CANCELED" ]
    },
    "ProcessGroup" : {
      "description" : "Object containing a list of processes.",
      "properties" : {
        "id" : {
          "description" : "Id of the group",
          "type" : "string"
        },
        "processes" : {
          "description" : "List of processes included in the group",
          "type" : "array",
          "items" : {
            "type" : "string"
          }
        }
      },
      "required" : [ "id" ],
      "example" : {
        "id" : "processgroup1",
        "processes" : [ "id_process1", "id_process2" ]
      }
    },
    "ProcessGroups" : {
      "properties" : {
        "groups" : {
          "type" : "array",
          "items" : {
            "$ref" : "#/definitions/ProcessGroup"
          }
        },
        "locale" : {
          "type" : "object",
          "properties" : {
            "en" : {
              "type" : "object",
              "additionalProperties" : {
                "type" : "string"
              }
            },
            "fr" : {
              "type" : "object",
              "additionalProperties" : {
                "type" : "string"
              }
            }
          }
        }
      }
    },
    "UserCard" : {
      "properties" : {
        "template" : {
          "type" : "string"
        },
        "severityVisible" : {
          "type" : "boolean"
        },
        "startDateVisible" : {
          "type" : "boolean"
        },
        "endDateVisible" : {
          "type" : "boolean"
        },
        "lttdVisible" : {
          "type" : "boolean"
        }
      }
    }
  }
}