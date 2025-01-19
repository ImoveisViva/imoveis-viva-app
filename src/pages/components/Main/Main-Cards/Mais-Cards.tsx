import { useEffect, useState } from "react";
import { ImovelType } from "@/hooks/types";
import { GetImoveisDB } from "@/firebase/admin/getDashboard";
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Cards } from "../Cards/Cards";

interface MainCardsProps {
    data?: ImovelType[];
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
                <Loader2 className="w-8 h-8 animate-spin" color="#7a9e7e" />
            </div>
        );
    }

    return (
        <div className="sm:px-6 md:px-12 lg:px-44 py-8 px-4 sm:py-10 md:py-12 bg-[#f5f4f0]">
            <div className="items-center flex mb-4 sm:mb-8 md:mb-12 gap-3">
                <div className='w-1 h-8 bg-[#e27d60] mt-1' aria-hidden={true} />
                <h1 className="text-2xl sm:text-3xl md:text-[30px] font-bold text-center text-[#7a9e7e]">IMÓVEIS EM DESTAQUE</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentCards.map((imovel) => (
                    <Cards imovel={imovel} key={imovel.id} />
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


import { useInView } from 'react-intersection-observer';

export function MainCards({ data, filter }: MainCardsProps) {
    const [displayedCards, setDisplayedCards] = useState<ImovelType[]>([])
    const cardsPerPage = 6

    const { ref, inView } = useInView({
        threshold: 0,
    })

    const filteredData = data ?? []
    const filteredCards = filter ? filteredData.filter(filter) : filteredData

    useEffect(() => {
        setDisplayedCards(filteredCards.slice(0, cardsPerPage))
    }, [filteredCards])

    useEffect(() => {
        if (inView) {
            const nextCards = filteredCards.slice(
                displayedCards.length,
                displayedCards.length + cardsPerPage
            )
            if (nextCards.length > 0) {
                setDisplayedCards(prev => [...prev, ...nextCards])
            }
        }
    }, [inView, filteredCards, displayedCards])

    return (
        <div className="sm:px-6 md:px-12 lg:px-44 py-8 px-4 sm:py-10 md:py-12 bg-[#f5f4f0]">
            <div className="justify-start flex mb-5 gap-3">
                <div className='w-1 h-8 bg-[#e27d60] mt-1' aria-hidden={true} />
                <h1 className="text-2xl sm:text-3xl md:text-[30px] font-bold text-center mb-4 sm:mb-8 md:mb-5 text-[#7a9e7e]">IMÓVEIS</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {displayedCards.map((imovel) => (
                    <Cards imovel={imovel} key={imovel.id} />
                ))}
            </div>
            {displayedCards.length < filteredCards.length && (
                <div ref={ref} className="flex justify-center items-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            )}
        </div>
    )
}