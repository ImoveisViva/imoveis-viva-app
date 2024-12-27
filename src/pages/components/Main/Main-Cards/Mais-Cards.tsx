import { useEffect, useState } from "react";
import { Cards } from "../Cards/Cards";
import { ImovelType } from "@/hooks/types";
import { GetImoveisDB } from "@/firebase/admin/getDashboard";
import { Loader2 } from "lucide-react";

export function MainCards() {
    const [dataBD, setDataBD] = useState<ImovelType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function handleGetBD() {
            try {
                setLoading(true);
                const data = await GetImoveisDB();
                setDataBD(data)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        handleGetBD()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-cente">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-wrap justify-center">
            {dataBD.map((imovel) => (
                <Cards key={imovel.id} imovel={imovel} />
            ))}
        </div>
    )
}