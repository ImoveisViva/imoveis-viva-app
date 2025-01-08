import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function EncontreOImovel() {
  return (
    <section className="py-16 px-44 bg-[#f5f4f0]">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#7a9e7e]">
          Encontre o Imóvel Perfeito
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Select>
            <SelectTrigger className="w-full md:w-[400px] px-5">
              <SelectValue placeholder="Tipo de Imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="terreno">Terreno</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="bg-[#e27d60] hover:bg-[#cc664a] text-white px-8 md:w-[400px]"
          >
            <Search className="mr-2 h-4 w-4" /> Buscar
          </Button>
        </div>
      </div>
    </section>
  )
}

