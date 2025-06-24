// src/services/commentEducationService.ts
import { CommentEducation } from "../types/CommentEducation";

export const commentEducationService = {
    deleteComment: async (commentId: number): Promise<void> => {
        const response = await fetch(
            `http://localhost:8080/commentsEducation/${commentId}`,
            { method: "DELETE" }
        );
        if (!response.ok) {
            throw new Error(`Errore DELETE commento ${commentId}`);
        }
    },

    addComment: async (
        educationId: number,
        comment: string
    ): Promise<CommentEducation> => {
        const response = await fetch(
            `http://localhost:8080/commentsEducation?education_id=${educationId}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ educationComment: comment }),
            }
        );

        if (!response.ok) {
            throw new Error("Errore nell'aggiunta del commento");
        }

        // qui restituiamo l'oggetto JSON del commento creato
        return await response.json();
    },
};
