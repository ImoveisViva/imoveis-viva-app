import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { MainCardsDestaque } from "../components/Main/Main-Cards/Mais-Cards";
import PqEscolherAViva from "../components/PQescolherViva";
import Banenrs from "../components/Banners";

export function Home() {
    return (
        <div>
            <Header isHome={true} />
            <MainCardsDestaque />
            <PqEscolherAViva />
            <Banenrs/>
            <Footer />
        </div>
    );
}
