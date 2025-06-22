// config/swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal App",
      version: "1.0.0",
      description: "Job Portal Application using Node.js, Express.js, MongoDB",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      schemas: {
        UserRegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Sajal Pakira",
            },
            email: {
              type: "string",
              example: "sajal@example.com",
            },
            password: {
              type: "string",
              example: "Sajal@1234",
            },
          },
        },
        UserLoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "sajal@example.com",
            },
            password: {
              type: "string",
              example: "Sajal@1234",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Sajal Pakira",
            },
            email: {
              type: "string",
              example: "sajal@example.com",
            },
            location: {
              type: "string",
              example: "Kolkata, India",
            },
            lastName: {
              type: "string",
              example: "Pakira",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Make sure this path is correct relative to the file
};

const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
