import { CommentEducation } from './CommentEducation';
import {EducationUser} from "./EducationUser.ts";

export interface Education {
    id: number;
    user: EducationUser;
    titleEducation: string;
    commentEducation: CommentEducation[]; // Lista di commenti
    likesEducation: number;
    commentEducationText: string; // Singolo commento come testo
}
