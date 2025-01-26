import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import type { ImovelType } from "@/hooks/types"
import { Bath, Bed, MapPin, Ruler, CarFront } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface PropertyCardProps {
  imovel: ImovelType
}

export const Cards: React.FC<PropertyCardProps> = ({ imovel }) => {
  return (
    <Card className="flex flex-col h-full rounded-md shadow-sm">
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
        <img
          src={imovel.fotos[0] instanceof File ? URL.createObjectURL(imovel.fotos[0]) : imovel.fotos[0]}
          alt={`${imovel.tipoImovel} em ${imovel.endereco.bairro}`}
          className="rounded-t-md w-full h-full object-cover"
        />
      </div>

      <CardContent className="flex-grow flex flex-col p-4">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-lg sm:text-xl md:text-2xl text-[#7a9e7e]">{imovel.tipoImovel}</CardTitle>
          <CardTitle className="text-lg sm:text-xl md:text-2xl text-[#7a9e7e]">{imovel.id}</CardTitle>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between mb-4">
          <p className="font-bold text-base sm:text-lg md:text-xl text-[#e27d60]">
            {imovel.tipoImovel === "Apartamento"
              ? `R$${imovel.preco.toLocaleString("pt-BR")}/mês`
              : `R$${imovel.preco.toLocaleString("pt-BR")}`}
          </p>
          <p className="flex items-center gap-1 text-sm sm:text-base text-[#858585]">
            <MapPin size={18} />
            {imovel.endereco.bairro}
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-6 text-[#858585] text-xs sm:text-sm md:text-base mb-4">
          {imovel.quartos > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {imovel.quartos} Qt
            </span>
          )}
          {imovel.banheiro > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {imovel.banheiro} Banh
            </span>
          )}
          {imovel.metros2 > 0 && (
            <span className="flex items-center gap-1">
              <Ruler className="h-4 w-4" />
              {imovel.metros2}m²
            </span>
          )}
          {Number(imovel.vagas) > 0 && (
            <span className="flex items-center gap-1">
              <CarFront className="h-4 w-4" />
              {imovel.vagas} Gar
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="-m-2">
        <Link to={`/estate/${imovel.id}`} className="w-full">
          <Button className="w-full h-10 sm:h-11 border border-[#7a9e7e] text-[#7a9e7e] bg-transparent hover:bg-[#7a9e7e] hover:text-white transition-colors">
            Ver detalhes
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}