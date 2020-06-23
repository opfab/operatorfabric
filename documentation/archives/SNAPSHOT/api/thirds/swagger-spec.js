window.swaggerSpec={
  "swagger" : "2.0",
  "info" : {
    "description" : "OperatorFabric ThirdParty Management API",
    "version" : "SNAPSHOT",
    "title" : "Thirds Management",
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
  "tags" : [ {
    "name" : "thirds",
    "description" : "Everything concerning specified Third"
  } ],
  "schemes" : [ "http" ],
  "paths" : {
    "/thirds" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "List existing Thirds",
        "description" : "List existing Thirds",
        "operationId" : "getThirds",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/Third"
              }
            }
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      },
      "post" : {
        "tags" : [ "thirds" ],
        "summary" : "Uploads Third configuration bundle",
        "description" : "Uploads Third configuration bundle. Bundle is a gzipped tarball (tar.gz) containing a config.json file and resource file using the following layout:\n```\n└──css\n└──i18n\n│   └──en.json\n│   └──fr.json\n│   └...\n└──template\n│   └──en\n│   |  └──emergency.handlebars\n│   |  └──info.handlebars\n│   └──fr\n│   |  └──emergency.handlebars\n│   |  └──info.handlebars\n│   └...\n└──config.json\n```\nThe config.json file contains a Third object in json notation (see [Models](#__Models))",
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
              "$ref" : "#/definitions/Third"
            }
          },
          "401" : {
            "description" : "Authentication required"
          },
          "403" : {
            "description" : "Forbidden - ADMIN role necessary"
          }
        }
      }
    },
    "/thirds/{thirdName}" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Access existing Third data",
        "description" : "Access existing Third data",
        "operationId" : "getThird",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
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
              "$ref" : "#/definitions/Third"
            }
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      },
      "delete" : {
        "tags" : [ "thirds" ],
        "summary" : "Deletion of existing Third data",
        "description" : "Deletion of existing Third data",
        "operationId" : "deleteBundle",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to delete",
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
            "description" : "Unable to delete submitted bundle"
          }
        }
      }
    },
    "/thirds/{thirdName}/templates/{templateName}" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get existing template associated with Third",
        "description" : "Get template associated with Third, if file exists return file (application/handlebars) otherwise return error message (application/json)",
        "operationId" : "getTemplate",
        "produces" : [ "application/json", "application/handlebars" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
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
    "/thirds/{thirdName}/css/{cssFileName}" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get css file associated with Third",
        "description" : "Get css file associated with Third, if file exists return file (text/css) otherwise return error message (application/json)",
        "operationId" : "getCss",
        "produces" : [ "application/json", "text/css" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
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
    "/thirds/{thirdName}/i18n" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get i18n file associated with Third",
        "description" : "Get i18n file associated with Third, if file exists return file (text/plain) otherwise return error message (application/json)",
        "operationId" : "getI18n",
        "produces" : [ "application/json", "text/plain" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
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
    "/thirds/{thirdName}/{process}/{state}/details" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get details associated to thirds",
        "description" : "Get details associated with Third+process+state, returns an array of details (application/json)",
        "operationId" : "getDetails",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "process",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "state",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "apiVersion",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of third",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/Detail"
              }
            }
          },
          "404" : {
            "description" : "No such third"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    },
    "/thirds/{thirdName}/{process}/{state}/response" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get response associated to thirds",
        "description" : "Get response associated with Third+process+state, returns a response (application/json)",
        "operationId" : "getResponse",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "process",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "state",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "apiVersion",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of third",
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
            "description" : "No such third"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    },
    "/thirds/{thirdName}/versions/{version}" : {
      "delete" : {
        "tags" : [ "thirds" ],
        "summary" : "Deletion of existing version of Third data",
        "description" : "Deletion of existing version of Third data",
        "operationId" : "deleteBundleVersion",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to delete",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "path",
          "description" : "Version of Third to delete",
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
            "description" : "Unable to delete submitted version of bundle"
          }
        }
      }
    }
  },
  "definitions" : {
    "ThirdMenuEntry" : {
      "type" : "object",
      "properties" : {
        "id" : {
          "type" : "string",
          "description" : "unique identifier of this menu item for the current third service"
        },
        "url" : {
          "type" : "string",
          "description" : "url of the endpoint for this menu item"
        },
        "label" : {
          "type" : "string",
          "description" : "i18n key for the label of this menu item. The value attached to this key should be defined in each XX.json file in the i18n folder of the bundle (where XX stands for the locale iso code, for example 'EN')"
        }
      }
    },
    "Third" : {
      "type" : "object",
      "description" : "Third party business module configuration. Models Third party properties and list referenced resources.",
      "properties" : {
        "name" : {
          "type" : "string",
          "description" : "Third party business module name"
        },
        "version" : {
          "type" : "string",
          "description" : "Third party business module configuration version"
        },
        "templates" : {
          "type" : "array",
          "description" : "List of templates name (without extension)",
          "example" : "\"emergency\", \"security\"",
          "items" : {
            "type" : "string"
          }
        },
        "csses" : {
          "type" : "array",
          "description" : "List of css file names (without extension)",
          "example" : "tab-style",
          "items" : {
            "type" : "string"
          }
        },
        "i18nLabelKey" : {
          "description" : "i18n key for the label of this Third The value attached to this key should be defined in each XX.json file in the i18n folder of the bundle (where XX stands for the locale iso code, for example 'EN')",
          "type" : "string"
        },
        "menuEntries" : {
          "type" : "array",
          "description" : "describes the menu items to add to UI navbar",
          "items" : {
            "$ref" : "#/definitions/ThirdMenuEntry"
          }
        },
        "processes" : {
          "type" : "object",
          "additionalProperties" : {
            "type" : "object",
            "properties" : {
              "name" : {
                "type" : "string",
                "description" : "i18n key for UI"
              },
              "states" : {
                "type" : "object",
                "additionalProperties" : {
                  "type" : "object",
                  "properties" : {
                    "details" : {
                      "type" : "array",
                      "description" : "List of card associated details",
                      "items" : {
                        "$ref" : "#/definitions/Detail"
                      }
                    },
                    "response" : {
                      "$ref" : "#/definitions/Response"
                    },
                    "acknowledgementAllowed" : {
                      "type" : "boolean",
                      "description" : "This flag indicates the possibility for a card of this kind to be acknowledged on user basis"
                    },
                    "name" : {
                      "type" : "string",
                      "description" : "i18n key for UI"
                    },
                    "color" : {
                      "type" : "string",
                      "description" : "use as a display cue in the UI"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "required" : [ "name", "version" ],
      "example" : {
        "name" : "My ThirdParty Application",
        "version" : "v1.0",
        "templates" : [ "emergency", "info" ],
        "csses" : [ "tab-style", "content-style" ],
        "i18nLabelKey" : "myThirdPartyApp.label",
        "menuEntries" : [ {
          "id" : "website",
          "url" : "http://www.mythirdpartyapp.com",
          "label" : "menu.website"
        }, {
          "id" : "status",
          "url" : "http://www.mythirdpartyapp.com/status",
          "label" : "menu.status"
        } ],
        "processes" : {
          "process1" : {
            "state1" : {
              "details" : [ {
                "title" : {
                  "key" : "template.title",
                  "parameters" : {
                    "param" : "value"
                  }
                },
                "titleStyle" : "titleClass",
                "templateName" : "template1"
              } ]
            },
            "state2" : {
              "details" : [ {
                "title" : {
                  "key" : "template2.title",
                  "parameters" : {
                    "param" : "value"
                  }
                },
                "titleStyle" : "titleClass2",
                "templateName" : "template2",
                "styles" : [ "my-template.css" ]
              } ]
            }
          },
          "process2" : {
            "state1" : {
              "details" : [ {
                "title" : {
                  "key" : "template.title",
                  "parameters" : {
                    "param" : "value"
                  }
                },
                "titleStyle" : "titleClass",
                "templateName" : "template3",
                "styles" : [ "my-template.css" ]
              } ]
            },
            "state2" : {
              "details" : [ {
                "title" : {
                  "key" : "template2.title",
                  "parameters" : {
                    "param" : "value"
                  }
                },
                "titleStyle" : "titleClass2",
                "templateName" : "template4",
                "styles" : ""
              } ]
            }
          }
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
      }
    },
    "Detail" : {
      "description" : "detail defines html data rendering",
      "type" : "object",
      "properties" : {
        "title" : {
          "description" : "Card i18n title",
          "$ref" : "#/definitions/I18n"
        },
        "titleStyle" : {
          "description" : "css classes applied to title",
          "type" : "string"
        },
        "templateName" : {
          "description" : "template unique name as defined by Third Party Bundle in Third Party Service",
          "type" : "string"
        },
        "styles" : {
          "description" : "css files names to load as defined by Third Party Bundle in Third Party Service",
          "type" : "array",
          "items" : {
            "type" : "string"
          }
        }
      },
      "example" : {
        "title" : {
          "key" : "template.title",
          "parameters" : {
            "param" : "value"
          }
        },
        "titleStyle" : "titleClass",
        "templateName" : "template1",
        "styles" : [ "bundleTest.css", "otherStyle.css" ]
      }
    },
    "Response" : {
      "description" : "defines a response to an action on the business process associated to the card",
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
          "description" : "If true, user can act only once",
          "type" : "boolean"
        },
        "state" : {
          "description" : "The state of the card generated by the action",
          "type" : "string"
        }
      }
    },
    "ResponseBtnColorEnum" : {
      "type" : "string",
      "description" : "Response button color >\n* RED - The button will be red in the template\n* GREEN - The button will be green in the template\n* YELLOW - The button will be yellow in the template",
      "enum" : [ "RED", "GREEN", "YELLOW" ],
      "example" : "RED"
    }
  }
}