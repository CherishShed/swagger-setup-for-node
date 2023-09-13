import express, { Express, Request, Response } from "express";
import * as swaggerJsDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
const app: Express = express();
const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Tryouts",
      version: "1.0.0",
      description: "My first Swagger ui with node js",
    },
    servers: [{ url: "http://localhost:8081/" }],
  },
  apis: ["./src/index.ts"],
};
const swaggerSpecs = swaggerJsDoc.default(options);
app.use(express.json());

app.use("/api/docs", serve, setup(swaggerSpecs));

/**
 * @openapi
 * /api:
 *   get:
 *     summary: This is the API summary
 *     description: This is the API description
 *     responses:
 *       200:
 *         description: Successful response
 */

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "We are live!" });
});

/**
 * @openapi
 * /api/person:
 *   get:
 *     summary: This is the API summary
 *     description: This is for the person
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get("/api/person", (req: Request, res: Response) => {
  res.json({ userName: "Shedi", age: 10 });
});

app.listen(8081, () => {
  console.log("Express server listening on 8081");
});
