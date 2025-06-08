export const commentEducationService = {
    deleteComment: async (commentId: number) => {
        const response = await fetch(`http://localhost:8080/commentsEducation/${commentId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Errore DELETE commento ${commentId}`);
        }
    },
    async addComment(educationId: number, comment: string) {
        const response = await fetch(`http://localhost:8080/commentsEducation?education_id=${educationId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ educationComment: comment }),
        });

        if (!response.ok) {
            throw new Error("Errore nell'aggiunta del commento");
        }
    }
};
