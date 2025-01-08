import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { MainCardsDestaque } from "../components/Main/Main-Cards/Mais-Cards";
import PqEscolherAViva from "../components/PQescolherViva";
import EncontreOImovel from "../components/EncontreOImovel";

export function Home() {
    return (
        <div>
            <Header isHome={true} />
            <MainCardsDestaque />
            <PqEscolherAViva />
            <EncontreOImovel />
            <Footer />
        </div>
    );
}
