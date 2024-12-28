import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { MainCardsDestaque } from "../components/Main/Main-Cards/Mais-Cards";

export function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-44 flex-grow">
                <Header isHome={true} />
                <MainCardsDestaque />
            </div>
            <Footer />
        </div>
    );
}
