import { useEffect, useState } from "react";
import { ImovelType } from "@/hooks/types";
import { GetImoveisDB } from "@/firebase/admin/getDashboard";
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Cards } from "../Cards/Cards";
import { Link } from "react-router-dom";

interface MainCardsProps {
    filter?: (imovel: ImovelType) => boolean;
}

function PaginatedCards({ filter }: MainCardsProps) {
    const [dataBD, setDataBD] = useState<ImovelType[]>([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    const filteredCards = filter ? dataBD.filter(filter) : dataBD;
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = await GetImoveisDB();

                const shuffledData = data.slice();
                for (let i = shuffledData.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
                }

                setDataBD(shuffledData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="sm:px-6 md:px-12 lg:px-44 py-8 px-4 sm:py-10 md:py-12 bg-[#f5f4f0]">
            <h1 className="text-2xl sm:text-3xl md:text-[30px] font-bold text-center mb-4 sm:mb-8 md:mb-12 text-[#7a9e7e]">Imóveis em Destaque</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentCards.map((imovel) => (
                    <Link to={`/estate/${imovel.id}`} key={imovel.id} className="block">
                        <Cards imovel={imovel} />
                    </Link>
                ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16 mt-6">
                <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="outline" className="w-full sm:w-auto">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600 my-2 sm:my-0">
                    Página {currentPage} de {totalPages}
                </span>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="outline" className="w-full sm:w-auto">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export function MainCardsDestaque() {
    return (
        <PaginatedCards filter={(imovel) => imovel.disponivel && imovel.categoria === "Destaque"} />
    );
}

export function MainCards() {
    return <PaginatedCards filter={(imovel) => !!imovel.disponivel} />;
}

