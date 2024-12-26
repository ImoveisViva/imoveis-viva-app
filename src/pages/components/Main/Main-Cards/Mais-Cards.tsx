import { useEffect, useState } from "react";
import { Cards } from "../Cards/Cards";
import { ImovelType } from "@/hooks/types";
import { GetImoveisDB } from "@/firebase/admin/getDashboard";

export function MainCards() {
    const [dataBD, setDataBD] = useState<ImovelType[]>([]);

    useEffect(() => {
        async function handleGetBD() {
            try {
                const data = await GetImoveisDB();
                setDataBD(data)
            } catch (error) {
                console.log(error)
            }
        }
        handleGetBD()
    }, [])

    return (
        <div className="flex flex-wrap justify-center">
            {dataBD.map((imovel) => (
                <Cards key={imovel.id} imovel={imovel} />
            ))}
        </div>
    )
}