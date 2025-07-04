import { CommentEducation } from './CommentEducation';
import {EducationUser} from "./EducationUser.ts";

export interface Education {
    id: number;
    user: EducationUser;
    titleEducation: string;
    descriptionEducation: string;
    commentEducation: CommentEducation[];
    likesEducation: number;
    commentEducationText: string;
}
