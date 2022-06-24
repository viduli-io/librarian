import { HttpParamStyles, IHttpOperation } from "@stoplight/types";

export const httpOperation: IHttpOperation = {
  id: "?http-operation-id?",
  iid: "GET_todos",
  method: "GET",
  path: "/v1/mangoes",
  summary: "List Mangoes",
  responses: [
    {
      id: "?http-response-200?",
      code: "200",
      description: "It worked!",
      headers: [
        {
          id: "?http-header-X-Stoplight-Resolver?",
          schema: {
            type: "string",
            description: "Resolver errors."
          },
          name: "X-Stoplight-Resolver",
          style: HttpParamStyles.Simple,
          required: true
        }
      ],
      contents: [
        {
          id: "?http-media-0?",
          mediaType: "application/json",
          schema: {
            $schema: "http://json-schema.org/draft-04/schema#",
            title: "Todo Full",
            type: "object",
            properties: {
              id: {
                type: "integer",
                minimum: 0,
                maximum: 1000000
              },
              completed_at: {
                type: [ "string", "null" ],
                format: "date-time"
              },
              created_at: {
                type: "string",
                format: "date-time"
              },
              updated_at: {
                type: "string",
                format: "date-time"
              },
              user: {
                $schema: "http://json-schema.org/draft-04/schema#",
                title: "User",
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "The user's full name."
                  },
                  age: {
                    type: "number",
                    minimum: 0,
                    maximum: 150
                  }
                },
                required: [ "name", "age" ],
                description: "Here lies the user model"
              }
            },
            required: [ "id", "user" ]
          }
        },
        {
          id: "?http-media-1?",
          mediaType: "application/xml"
        },
        {
          id: "?http-media-2?",
          mediaType: "application/yaml",
          schema: {
            properties: {
              some_number: {
                type: "number"
              },
              some_string: {
                type: "string"
              }
            }
          }
        }
      ]
    },
    {
      id: "?http-response-401?",
      code: "401",
      description: "Our shared 401 response.",
      headers: [],
      contents: [
        {
          id: "?http-media-1?",
          mediaType: "application/json",
          schema: {
            $schema: "http://json-schema.org/draft-04/schema#",
            title: "Error",
            description: "A standard error object.",
            anyOf: [
              {
                type: "object",
                properties: {
                  code: {
                    type: "string"
                  },
                  message: {
                    type: "string"
                  }
                },
                required: [ "code" ]
              },
              {
                $schema: "http://json-schema.org/draft-04/schema#",
                title: "Category",
                type: "object",
                description: "",
                properties: {
                  name: {
                    type: "string"
                  }
                },
                required: [ "name" ]
              }
            ]
          },
          examples: [
            {
              id: "?http-example-8?",
              key: "application/json",
              value: {
                code: "401",
                message: "Not Authorized"
              }
            }
          ]
        }
      ]
    },
    {
      id: "?http-response-404?",
      code: "404",
      description: "Our shared 404 response.",
      headers: [],
      contents: [
        {
          id: "?http-media-10?",
          mediaType: "application/json",
          schema: {
            $schema: "http://json-schema.org/draft-04/schema#",
            title: "Error",
            description: "A standard error object.",
            anyOf: [
              {
                type: "object",
                properties: {
                  code: {
                    type: "string"
                  },
                  message: {
                    type: "string"
                  }
                },
                required: [ "code" ]
              },
              {
                $schema: "http://json-schema.org/draft-04/schema#",
                title: "Category",
                type: "object",
                description: "",
                properties: {
                  name: {
                    type: "string"
                  }
                },
                required: [ "name" ]
              }
            ]
          },
          examples: [
            {
              id: "?http-example-10?",
              key: "application/json",
              value: {
                code: "404",
                message: "Not Found"
              }
            }
          ]
        }
      ]
    },
    {
      id: "?http-response-500?",
      code: "500",
      description: "Our shared 500 response.",
      headers: [],
      contents: [
        {
          id: "?http-media-11?",
          mediaType: "application/json",
          schema: {
            $schema: "http://json-schema.org/draft-04/schema#",
            title: "Error",
            description: "A standard error object.",
            anyOf: [
              {
                type: "object",
                properties: {
                  code: {
                    type: "string"
                  },
                  message: {
                    type: "string"
                  }
                },
                required: [ "code" ]
              },
              {
                $schema: "http://json-schema.org/draft-04/schema#",
                title: "Category",
                type: "object",
                description: "",
                properties: {
                  name: {
                    type: "string"
                  }
                },
                required: [ "name" ]
              }
            ]
          },
          examples: [
            {
              id: "?http-example-11?",
              key: "application/json",
              value: {
                code: "500",
                message: "Server Error"
              }
            }
          ]
        }
      ]
    }
  ],
  servers: [
    {
      id: "?http-server-todos.stoplight.io?",
      url: "http://localhost:4000"
    },
    {
      id: "?http-server-todos-dev.stoplight.io?",
      description: "Development",
      url: "https://todos-dev.stoplight.io"
    }
  ],
  request: {
    query: [
      {
        id: "query-filter",
        schema: {
          type: "object",
        },
        description: "Filters to apply on ToDos",
        name: "filter",
        style: HttpParamStyles.Form
      },
    ],
  },
  tags: [
    {
      name: "Todos"
    }
  ],
  security: [
    [
      {
        id: "?http-security-api_key?",
        key: "api_key",
        type: "apiKey",
        name: "apiKey",
        in: "query",
        description: "Use `?apikey=123` to authenticate requests. It's super secure."
      }
    ],
    [
      {
        id: "?http-security-basicKey?",
        key: "basicKey",
        type: "http",
        scheme: "basic",
        description:
          "Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access."
      }
    ],
    [
      {
        id: "?http-security-bearerKey?",
        key: "bearerKey",
        type: "http",
        scheme: "bearer",
        description:
          "Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.",
        bearerFormat: "Authorization"
      }
    ],
    [
      {
        id: "?http-security-digest?",
        key: "digest",
        type: "http",
        scheme: "digest",
        description: "Digest is cool. Use digest. No questions asked money back guarantee."
      }
    ],
    [
      {
        id: "?http-security-openIdConnectKey?",
        key: "openIdConnectKey",
        type: "openIdConnect",
        description:
          "Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.",
        openIdConnectUrl: "http://openIdConnect.com"
      }
    ],
    [
      {
        id: "?http-security-oauth2Key?",
        key: "oauth2Key",
        type: "oauth2",
        description:
          "Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.",
        flows: {
          implicit: {
            scopes: {
              "write:pets": "modify pets in your account",
              "read:pets": "read your pets"
            },
            refreshUrl: "http://refreshUrl.com",
            authorizationUrl: "http://authorizationUrl.com"
          },
          password: {
            scopes: {
              "write:pets": "modify pets in your account",
              "read:pets": "read your pets"
            },
            refreshUrl: "http://refreshUrl.com",
            tokenUrl: "http://tokenUrl.com"
          },
          clientCredentials: {
            scopes: {
              "write:pets": "modify pets in your account",
              "read:pets": "read your pets"
            },
            refreshUrl: "http://refreshUrl.com",
            tokenUrl: "http://tokenUrl.com"
          },
          authorizationCode: {
            scopes: {
              "write:pets": "modify pets in your account",
              "read:pets": "read your pets"
            },
            refreshUrl: "http://refreshUrl.com",
            tokenUrl: "http://tokenUrl.com",
            authorizationUrl: "http://authorizationUrl.com"
          }
        }
      }
    ]
  ]
};

export default httpOperation;
