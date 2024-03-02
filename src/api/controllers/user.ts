import { Request, Response } from "express";
import { UserService } from "../services/user";

export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  
  getUsers = (request: Request, response: Response) => {
    response.send("It's alive !");
  }

  createUser = async (request: Request, response: Response) => {
    // To do
  };

  
}
