import * as React from 'react'
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { GetDBPesquisa } from '@/firebase/admin/getDashboard'
import { ImovelType } from '@/hooks/types'

interface FiltroProps {
    onFilterResults: (results: ImovelType[]) => void;
}

export default function Filtro({ onFilterResults }: FiltroProps) {
    const [tipoNegocio, setTipoNegocio] = React.useState("")
    const [tipoImovel, setTipoImovel] = React.useState("")
    const [quartos, setQuartos] = React.useState("")
    const [vagas, setVagas] = React.useState("")
    const [preco, setPreco] = React.useState([400000]);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (tipoImovel === "outros") setTipoImovel('');

        const dados = {
            tipoNegocio,
            tipoImovel,
            quartos: Number(quartos),
            vagas: vagas,
            preco: preco[0],
        };

        try {
            const data = await GetDBPesquisa(dados);
            onFilterResults(data);
        } catch {
            console.log("Erro ao enviar formulário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="sm:px-0 px-5 w-full max-w-6xl mx-auto py-20 border-b-2 border-[#cccccc]">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className='w-1 h-8 bg-[#e27d60] mt-1' aria-hidden={true} />
                    <h1 className="text-xl sm:text-3xl md:text-[30px] font-bold text-[#7a9e7e]">QUAL IMÓVEL ESTÁ PROCURANDO?</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <Select value={tipoNegocio} onValueChange={setTipoNegocio}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pretensão" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className='cursor-pointer' value="Aluguel">Aluguel</SelectItem>
                            <SelectItem className='cursor-pointer' value="Venda">Compra</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={tipoImovel} onValueChange={setTipoImovel}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tipo do Imóvel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className='cursor-pointer' value="Casa">Casa</SelectItem>
                            <SelectItem className='cursor-pointer' value="Apartamento">Apartamento</SelectItem>
                            <SelectItem className='cursor-pointer' value="outros">Outros</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={quartos} onValueChange={setQuartos} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Número de Quartos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className='cursor-pointer' value="1">1 Quarto</SelectItem>
                            <SelectItem className='cursor-pointer' value="2">2 Quartos</SelectItem>
                            <SelectItem className='cursor-pointer' value="3">3 Quartos</SelectItem>
                            <SelectItem className='cursor-pointer' value="4">4+ Quartos</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={vagas} onValueChange={setVagas}>
                        <SelectTrigger>
                            <SelectValue placeholder="Vagas de Garagem" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className='cursor-pointer' value="1">1 Vaga</SelectItem>
                            <SelectItem className='cursor-pointer' value="2">2 Vagas</SelectItem>
                            <SelectItem className='cursor-pointer' value="3">3+ Vagas</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="space-y-4">
                        <label className="text-sm text-gray-600">
                            VALOR: R$ {preco[0].toLocaleString()},00
                        </label>
                        <Slider
                            value={preco}
                            onValueChange={setPreco}
                            min={200}
                            max={1000000}
                            step={1000}
                            className="[&_[role=slider]]:bg-emerald-500 cursor-pointer"
                        />
                    </div>
                    <Button type="submit" disabled={loading} className={`w-full h-10 text-white ${loading ? 'bg-gray-400' : 'bg-[#7a9e7e] hover:bg-[#7a9e7e]/80'}`}>
                        {loading ? "Buscando..." : "BUSCAR"}
                    </Button>
                </div>
            </div>
        </form>
    )
}

