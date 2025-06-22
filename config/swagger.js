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
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        // User Schemas
        UserRegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Sajal Pakira",
            },
            lastName: {
              type: "string",
              example: "Pakira",
            },
            email: {
              type: "string",
              format: "email",
              example: "sajal@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Sajal@1234",
            },
            location: {
              type: "string",
              example: "Kolkata, India",
            },
          },
        },
        UserLoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "sajal@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Sajal@1234",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665fa7d2b6a1e3adce123456",
            },
            name: {
              type: "string",
              example: "Sajal",
            },
            lastName: {
              type: "string",
              example: "Pakira",
            },
            email: {
              type: "string",
              example: "sajal@example.com",
            },
            location: {
              type: "string",
              example: "Kolkata, India",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-06-18T10:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-06-18T10:05:00.000Z",
            },
          },
        },

        // Job Schemas
        JobCreateInput: {
          type: "object",
          required: ["company", "position", "workLocation"],
          properties: {
            company: {
              type: "string",
              example: "Google",
            },
            position: {
              type: "string",
              example: "Frontend Developer",
            },
            workLocation: {
              type: "string",
              example: "Bengaluru, India",
            },
            status: {
              type: "string",
              enum: ["pending", "interview", "reject"],
              example: "pending",
            },
            workType: {
              type: "string",
              enum: ["full-time", "part-time", "internship", "freelance"],
              example: "full-time",
            },
            jobType: {
              type: "string",
              enum: ["Remote", "On-site", "Hybrid"],
              example: "Remote",
            },
          },
        },
        JobUpdateInput: {
          type: "object",
          properties: {
            company: { type: "string" },
            position: { type: "string" },
            workLocation: { type: "string" },
            status: {
              type: "string",
              enum: ["pending", "interview", "reject"],
            },
            workType: {
              type: "string",
              enum: ["full-time", "part-time", "internship", "freelance"],
            },
            jobType: {
              type: "string",
              enum: ["Remote", "On-site", "Hybrid"],
            },
          },
        },
        Job: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665fa7d2b6a1e3adce123456",
            },
            company: {
              type: "string",
              example: "Google",
            },
            position: {
              type: "string",
              example: "Frontend Developer",
            },
            status: {
              type: "string",
              enum: ["pending", "interview", "reject"],
              example: "interview",
            },
            workType: {
              type: "string",
              enum: ["full-time", "part-time", "internship", "freelance"],
              example: "full-time",
            },
            jobType: {
              type: "string",
              enum: ["Remote", "On-site", "Hybrid"],
              example: "Remote",
            },
            workLocation: {
              type: "string",
              example: "Bengaluru, India",
            },
            createdBy: {
              type: "string",
              example: "665abc123def45678901a234",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
