import {User} from "./User.ts";

export interface Project {
    id: number;
   title:String;
   description:String;
   user:User;
}