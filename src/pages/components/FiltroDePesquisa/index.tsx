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

export default function Filtro() {
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
            console.log("data", data);
        } catch {
            console.log("Erro ao enviar formulário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="sm:px-0 px-5 w-full max-w-6xl mx-auto py-20 border-b-2 border-[#cccccc]">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl md:text-[30px] font-bold text-center mb-4 sm:mb-8 md:mb-5 text-[#7a9e7e]">QUAL IMÓVEL ESTÁ PROCURANDO?</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <Select value={tipoNegocio} onValueChange={setTipoNegocio}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pretensão" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Aluguel">Aluguel</SelectItem>
                            <SelectItem value="Venda">Compra</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={tipoImovel} onValueChange={setTipoImovel}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tipo do Imóvel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Casa">Casa</SelectItem>
                            <SelectItem value="Apartamento">Apartamento</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={quartos} onValueChange={setQuartos} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Número de Quartos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 Quarto</SelectItem>
                            <SelectItem value="2">2 Quartos</SelectItem>
                            <SelectItem value="3">3 Quartos</SelectItem>
                            <SelectItem value="4">4+ Quartos</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={vagas} onValueChange={setVagas}>
                        <SelectTrigger>
                            <SelectValue placeholder="Vagas de Garagem" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 Vaga</SelectItem>
                            <SelectItem value="2">2 Vagas</SelectItem>
                            <SelectItem value="3">3+ Vagas</SelectItem>
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
                            className="[&_[role=slider]]:bg-emerald-500"
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

