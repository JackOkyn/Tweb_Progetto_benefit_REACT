import React, { useState, useEffect } from 'react';
import { educationService } from '../service/educationServices';
import { Education } from '../types/Education';

const EducationPage: React.FC = () => {
    const [educations, setEducations] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [currentEducation, setCurrentEducation] = useState<Partial<Education>>({
        titleEducation: '',
        commentEducation: []
    });

    useEffect(() => {
        loadEducations();
    }, []);

    const loadEducations = async () => {
        try {
            const data = await educationService.getAll();
            setEducations(data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Errore nel caricamento');
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentEducation.id) {
                await educationService.update(currentEducation.id, currentEducation);
            } else {
                await educationService.create(currentEducation);
            }
            setShowModal(false);
            loadEducations();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Errore nel salvataggio');
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Sei sicuro di voler eliminare questa educazione?')) {
            try {
                await educationService.delete(id);
                loadEducations();
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Errore nell\'eliminazione');
            }
        }
    };

    if (loading) return <div>Caricamento in corso...</div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl text-black font-bold">Lista delle Educazioni</h1>
                <button
                    onClick={() => {
                        setCurrentEducation({});
                        setShowModal(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Nuova Educazione
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {educations.map((edu) => (
                    <div key={edu.id} className="border p-4 rounded shadow bg-blue-300">
                        <h3 className="text-xl font-semibold">{edu.titleEducation}</h3>
                        <p>Autore: {edu.user.username}</p>
                        <p>Like: {edu.likesEducation}</p>
                        <div className="mt-4 space-x-2">
                            <button
                                onClick={() => {
                                    setCurrentEducation(edu);
                                    setShowModal(true);
                                }}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Modifica
                            </button>
                            <button
                                onClick={() => handleDelete(edu.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Elimina
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">
                            {currentEducation.id ? 'Modifica' : 'Nuova'} Educazione
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Titolo</label>
                                <input
                                    type="text"
                                    value={currentEducation.titleEducation || ''}
                                    onChange={(e) => setCurrentEducation({
                                        ...currentEducation,
                                        titleEducation: e.target.value
                                    })}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Salva
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EducationPage;