import {Authority} from "../models/models.tsx";
import {Project} from "./Project.ts";
import {Role} from "./Role.ts";

export interface EducationUser {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: Role[];
    projects: Project[];
    enabled: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: Authority[];
    credentialsNonExpired: boolean;
}
