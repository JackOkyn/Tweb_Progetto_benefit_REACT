import React, { useEffect } from "react";
import logo from "../assets/icon.png";
import deserto from "../assets/desertoghiaccio.png";
import neve from "../assets/montagneneve.png";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,    // Durata animazioni (ms)
            offset: 200,      // Distanza da cui far partire l'animazione
            easing: "ease-in-out",
            once: false,       // Se true, l'animazione parte solo la prima volta che si scrolla
        });
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Sezione superiore: Logo e Titolo */}
            <header className="flex flex-col items-center justify-center py-12 bg-gray-100">
                <div data-aos="fade-up" className="flex items-center space-x-4">
                    <img
                        src={logo}
                        alt="Site Logo"
                        className="w-16 h-16 object-contain"
                    />
                    <h1 className="text-3xl font-bold text-blue-900">IceKeeper</h1>
                </div>
            </header>

            {/* Contenuto principale */}
            <main className="max-w-5xl mx-auto px-4 py-8 space-y-16">
                {/* Paragrafo 1 */}
                <section
                    data-aos="fade-up"
                    className="flex flex-col md:flex-row items-center md:space-x-8"
                >
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Chi siamo</h2>
                        <p className="leading-relaxed mb-4">
                            Siamo un team di appassionati di ambiente e tecnologia con una missione chiara:
                            mappare i ghiacciai e promuovere iniziative per la cura e la salvaguardia del clima.
                            Attraverso l’uso di strumenti innovativi e il coinvolgimento della comunità, vogliamo sensibilizzare
                            sull'importanza della protezione dei ghiacciai, monitorandone i cambiamenti e incentivando azioni
                            concrete per il loro mantenimento.
                        </p>
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0">
                        <img
                            src={deserto}
                            alt="Team"
                            className="rounded shadow-md w-full"
                            data-aos="zoom-in"
                        />
                    </div>
                </section>

                {/* Paragrafo 2 */}
                <section
                    data-aos="fade-up"
                    className="flex flex-col md:flex-row items-center md:space-x-8"
                >
                    <div className="md:w-1/2 mt-6 md:mt-0 order-2 md:order-1">
                        <img
                            src={neve}
                            alt="Innovation"
                            className="rounded shadow-md w-full"
                            data-aos="zoom-in"
                            data-aos-delay="100"
                        />
                    </div>
                    <div className="md:w-1/2 order-1 md:order-2">
                        <h2 className="text-2xl font-bold mb-4">La nostra visione</h2>
                        <p className="leading-relaxed mb-4">
                            Vogliamo essere un punto di riferimento per chi
                            desidera condividere conoscenze, trovare ispirazione e
                            costruire nuove idee. Offriamo percorsi di apprendimento,
                            sfide progettuali e strumenti che alimentano la creatività.
                        </p>
                        <p className="leading-relaxed">
                            Il nostro obiettivo è creare un ecosistema di crescita,
                            dove ogni persona possa esprimere al meglio le proprie
                            potenzialità e trovare supporto nella community.
                        </p>
                    </div>
                </section>

                {/* Paragrafo 3 */}

                <section
                    data-aos="fade-up"
                    className="flex flex-col md:flex-row items-center md:space-x-8"
                >
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">I nostri valori</h2>

                        <p className="leading-relaxed">
                            Crediamo nella forza della collaborazione e nella creazione di una community solida e consapevole,
                            in cui ciascuno possa contribuire con le proprie competenze e passione. Unisciti a noi per fare la
                            differenza e preservare il nostro pianeta per le generazioni future.
                        </p>
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0">
                        <img
                            src={deserto}
                            alt="Team"
                            className="rounded shadow-md w-full"
                            data-aos="zoom-in"
                        />
                    </div>
                </section>

                {/* Paragrafo 4 finale */}
                <section
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="text-center"
                >
                    <h2 className="text-2xl font-bold mb-4">Unisciti a noi!</h2>
                    <p className="max-w-2xl mx-auto leading-relaxed">
                        Se anche tu credi nella condivisione e vuoi contribuire
                        a rendere la nostra community sempre più ricca e inclusiva,
                        iscriviti e scopri tutti i vantaggi. Insieme, possiamo
                        realizzare progetti straordinari e crescere professionalmente.
                    </p>
                </section>


            </main>

            {/* Footer */}
            <footer className="py-6 bg-gray-200 text-center text-gray-700 mt-8">
                Copyright © {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default AboutUs;
