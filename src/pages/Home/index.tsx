import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { MainCards } from "../components/Main/Main-Cards/Mais-Cards";

export function Home() {
    return (
        <div>
            <Header />
            <h1>Home</h1>
            <MainCards />
            <Footer />
        </div>
    )
}