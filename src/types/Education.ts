import { User } from './User';
import { CommentEducation } from './CommentEducation';

export interface Education {
    id: number;
    user: User;
    titleEducation: string;
    commentEducation: CommentEducation[]; // Lista di commenti
    likesEducation: number;
    commentEducationText: string; // Singolo commento come testo
}
