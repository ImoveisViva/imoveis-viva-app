import { useState, useEffect } from "react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { MainCards } from "../components/Main/Main-Cards/Mais-Cards";

export function Home() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 800);
    }, []);

    return (
        <div
            className={`transform transition-all duration-700 ease-in-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
        >
            <Header />
            <MainCards />
            <Footer />
        </div>
    );
}
