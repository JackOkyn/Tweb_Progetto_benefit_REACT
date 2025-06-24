// src/types/CommentEducation.ts
import { Education } from "./Education";

export interface CommentEducation {
    // questo corrisponde al campo PK del commento
    idEducation: number;
    // questo corrisponde al testo del commento
    educationComment: string;
    // opzionale, se ti serve il link all'oggetto padre
    education?: Education;
}
