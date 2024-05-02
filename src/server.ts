import "express-async-errors"
import express, {Request, Response, NextFunction} from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return response.status(400).json({
      error: error.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
})

app.listen(3001, () => console.log("Rodando na porta 3001"));
