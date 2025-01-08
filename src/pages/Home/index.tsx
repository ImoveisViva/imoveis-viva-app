import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { MainCardsDestaque } from "../components/Main/Main-Cards/Mais-Cards";

export function Home() {
    return (
        <div>
            <Header isHome={true} />
            <MainCardsDestaque />
            <Footer />
        </div>
    );
}
