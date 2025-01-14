import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useNavigate } from 'react-router-dom';

interface PropType {
  isTranparent: boolean;
}

export default function EncontreOImovel({ isTranparent }: PropType) {
  const [tipoImovel, setTipoImovel] = useState<string>('')
  const navigate = useNavigate()

  const handleSelectChange = (value: string) => {
    setTipoImovel(value)
  }

  const handleSearch = () => {
    if (tipoImovel) {
      navigate(`/pesquisa?tipo=${tipoImovel}`)
    }
  }

  if (isTranparent) {
    return (
      <div className="px-5 w-full">
        <section className="bg-[#f5f4f0] p-4 sm:p-6 w-full sm:w-[90vw] md:w-[70vw] lg:w-[50vw] mx-auto mt-10 text-[#7a9e7e] rounded-sm">
          <div className="flex flex-col gap-4 justify-center items-center">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full px-5">
                <SelectValue placeholder="Tipo de Imóvel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Casa">Casa</SelectItem>
                <SelectItem value="Apartamento">Apartamento</SelectItem>
                <SelectItem value="Terreno">Terreno</SelectItem>
                <SelectItem value="Comercial">Comercial</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="w-full bg-[#e27d60] hover:bg-[#cc664a] text-white"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4" /> Buscar
            </Button>
          </div>
        </section>
      </div>
    )
  } else {
    return (
      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-44 bg-[#f5f4f0]">
        <div className="container mx-auto">
          <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14 ${!isTranparent ? 'text-[#7a9e7e]' : ''}`}>
            Encontre o Imóvel Perfeito
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Select onValueChange={handleSelectChange} value={tipoImovel}>
              <SelectTrigger className="w-full sm:w-[300px] md:w-[350px] lg:w-[370px] px-4 sm:px-5">
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
              className="w-full sm:w-[300px] md:w-[350px] lg:w-[370px] bg-[#e27d60] hover:bg-[#cc664a] text-white px-4 sm:px-8 py-2 sm:py-3"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4" /> Buscar
            </Button>
          </div>
        </div>
      </section>
    )
  }
}