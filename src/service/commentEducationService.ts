export const commentEducationService = {
    deleteComment: async (commentId: number) => {
        const response = await fetch(`http://localhost:8080/commentsEducation/${commentId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Errore DELETE commento ${commentId}`);
        }
    }
};
