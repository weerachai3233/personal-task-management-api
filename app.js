const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const boardRoutes = require("./routes/board.routes");
const listRoutes = require("./routes/list.routes");
const taskRoutes = require("./routes/task.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "This is the API documentation for my project.",
    },
    tags: [
      { name: "User" },
      { name: "Project" },
      { name: "Board" },
      { name: "List" },
      { name: "Task" },
    ],
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/list", listRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Swagger docs are available at http://localhost:${PORT}/api-docs`
  );
});
