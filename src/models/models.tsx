export interface Project {
    id: number;
    name: string;
    description: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface Authority {
    authority: string;
}

export interface User {
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

export interface EducationComment {
    idEducation: number;
    educationComment: string;
}

export interface Education {
    id: number;
    user: User;
    titleEducation: string;
    commentEducation: EducationComment[];
    likesEducation: number;
}