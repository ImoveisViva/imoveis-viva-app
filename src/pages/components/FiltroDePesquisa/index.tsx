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

export default function Filtro() {
    const [pretensao, setPretensao] = React.useState("")
    const [tipoImovel, setTipoImovel] = React.useState("")
    const [quartos, setQuartos] = React.useState("")
    const [vagas, setVagas] = React.useState("")
    const [valor, setValor] = React.useState([400000])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto py-20 border-b-2 border-[#cccccc]">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl md:text-[30px] font-bold text-center mb-4 sm:mb-8 md:mb-5 text-[#7a9e7e]">QUAL IMÓVEL ESTÁ PROCURANDO?</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <Select value={pretensao} onValueChange={setPretensao}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pretensão" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="aluguel">Aluguel</SelectItem>
                            <SelectItem value="compra">Compra</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={tipoImovel} onValueChange={setTipoImovel}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tipo do Imóvel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="casa">Casa</SelectItem>
                            <SelectItem value="apartamento">Apartamento</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={quartos} onValueChange={setQuartos}>
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
                            VALOR: R$ {valor[0].toLocaleString()},00
                        </label>
                        <Slider
                            value={valor}
                            onValueChange={setValor}
                            min={200}
                            max={1000000}
                            step={1000}
                            className="[&_[role=slider]]:bg-emerald-500"
                        />
                    </div>
                    <Button type="submit" className="w-full cursor-not-allowed bg-[#7a9e7e] hover:bg-[#7a9e7e]/80 text-white h-10">
                        BUSCAR
                    </Button>
                </div>
            </div>
        </form>
    )
}

