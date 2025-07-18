import { Card, CardContent } from "@/components/ui/card"
import imgApart from '../../../../public/assets/img/apartamento.png'
import imgCasa from '../../../../public/assets/img/casa.png'
import imgContru from '../../../../public/assets/img/contrucao.png'
import imgTerre from '../../../../public/assets/img/terreno.png'
import { Link } from "react-router-dom";
import { ImovelType } from "@/hooks/types"
import { useEffect, useState } from "react"
import { GetImoveisDB } from "@/firebase/admin/getDashboard"

interface PropertyCategory {
    title: string;
    count: number;
    image: string;
    gridClass: string;
    url: string
}

export default function Banenrs() {
    const [dataBD, setDataBD] = useState<ImovelType[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const dados = await GetImoveisDB()
                setDataBD(dados);
            } catch {
                console.log('Erro ao fazer busca no banco de dados')
            }
        }
        fetchData()
    }, [])

    const apartamento = dataBD.filter((imovel) => imovel.tipoImovel === "Apartamento").length
    const construcao = dataBD.filter((imovel) => imovel.tipoImovel === "Construcao").length
    const terreno = dataBD.filter((imovel) => imovel.tipoImovel === "Terreno").length
    const casa = dataBD.filter(imovel => imovel.tipoImovel === "Casa").length

    const categories: PropertyCategory[] = [
        {
            title: "APARTAMENTOS",
            count: apartamento,
            image: imgApart,
            gridClass: "md:col-span-2 md:row-span-1",
            url: '/pesquisa?tipo=Apartamento'
        },
        {
            title: "CONSTRUÇÕES",
            count: construcao,
            image: imgContru,
            gridClass: "md:col-span-1 md:row-span-1",
            url: '/pesquisa?tipo=Construcao'
        },
        {
            title: "TERRENOS",
            count: terreno,
            image: imgTerre,
            gridClass: "md:col-span-1 md:row-span-1",
            url: '/pesquisa?tipo=Terreno'
        },
        {
            title: "CASAS",
            count: casa,
            image: imgCasa,
            gridClass: "md:col-span-2 md:row-span-1",
            url: '/pesquisa?tipo=Casa'
        }
    ]

    return (
        <section className="bg-[#f5f4f0] py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 md:px-44">
                <div className="items-center flex mb-4 sm:mb-8 md:mb-12 gap-3">
                    <div className='w-1 h-8 bg-[#e27d60] mt-1' aria-hidden={true} />
                    <h1 className="text-2xl sm:text-3xl md:text-[30px] font-bold text-center text-[#7a9e7e]">ENCONTRE SEU IMÓVEL</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <Card
                            key={category.title}
                            className={`group relative overflow-hidden h-48 cursor-pointer ${category.gridClass}`}
                        >
                            <Link to={category.url}>
                                <CardContent className="p-0 h-full">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />
                                    <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-white">
                                        <h2 className="text-2xl font-bold text-center mb-2">
                                            {category.title}
                                        </h2>
                                        <p className="text-sm opacity-90">
                                            {category.count} {category.count === 1 ? 'imóvel' : 'imóveis'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div >
        </section>
    )
}

