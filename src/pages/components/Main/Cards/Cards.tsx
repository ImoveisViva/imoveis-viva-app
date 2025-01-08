import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ImovelType } from '@/hooks/types';
import { Bath, Bed, MapPin, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
  imovel: ImovelType;
}

export const Cards: React.FC<PropertyCardProps> = ({ imovel }) => {
  return (
    <Card className='relative max-h-[55vh] min-h-[55vh]'>
      <div className="relative w-full h-[200px]">
        <img
          src={
            imovel.fotos[0] instanceof File
              ? URL.createObjectURL(imovel.fotos[0])
              : imovel.fotos[0]
          }
          alt={`${imovel.tipoImovel} em ${imovel.endereco.bairro}`}
          className="rounded-t-lg max-h-[100%] max-w-[100%] min-h-[100%] min-w-[100%] bg-cover"
        />
      </div>

      <CardHeader className='gap-2'>
        <CardTitle className='text-[20px] text-[#7a9e7e]'>{imovel.tipoImovel}</CardTitle>

        <div className='flex gap-2 items-center justify-between'>
          <p className="font-bold text-lg text-[#e27d60]">
            {imovel.tipoImovel === "Apartamento"
              ? `R$${imovel.preco.toLocaleString('pt-BR')}/mês`
              : `R$${imovel.preco.toLocaleString('pt-BR')}`
            }
          </p>
          <p className='flex items-center gap-1 text-[#858585]'>
            <MapPin size={18} />{imovel.endereco.bairro}
          </p>
        </div>

        <div className="flex justify-between text-[#858585]">
          {imovel.quartos > 0 ? (
            <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              <Bed className="h-4 w-4 sm:h-5 sm:w-5" />
              {imovel.quartos} Quartos
            </span>
          ) : null}
          {imovel.banheiro > 0 ? (
            <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              <Bath className="h-4 w-4 sm:h-5 sm:w-5" />
              {imovel.banheiro} Banheiros
            </span>
          ) : null}
          {imovel.metros2 > 0 ? (
            <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              <Ruler className="h-4 w-4 sm:h-5 sm:w-5" />
              {imovel.metros2}m²
            </span>
          ) : null}
        </div>

        <Button
          className="absolute inset-x-4 bottom-4 h-11 border border-[#7a9e7e] text-[#7a9e7e] bg-transparent hover:bg-[#7a9e7e] hover:text-white transition-colors"
        >
          Ver detalhes
        </Button>
      </CardHeader>
    </Card >
  );
};