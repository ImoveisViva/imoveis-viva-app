import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImovelType } from '@/hooks/types';

interface PropertyCardProps {
  imovel: ImovelType;
}

export const Cards: React.FC<PropertyCardProps> = ({ imovel }) => {
  return (
    <Card className="w-[350px] m-4">
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
      <CardHeader>
        <CardTitle>{imovel.tipoImovel} - {imovel.categoria}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {imovel.endereco.bairro}, {imovel.endereco.cidade}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">
          {imovel.quartos} quartos • {imovel.banheiro} banheiros • {imovel.metros2}m²
        </p>
        <p className="font-bold text-lg mb-2">
          R$ {imovel.preco.toLocaleString('pt-BR')}
        </p>
        <p className="text-sm text-muted-foreground">
          {imovel.descricao.slice(0, 100)}...
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="secondary">{imovel.tipoNegocio}</Badge>
        <Badge variant={imovel.disponivel ? "default" : "destructive"}>
          {imovel.disponivel ? 'Disponível' : 'Indisponível'}
        </Badge>
      </CardFooter>
    </Card>
  );
};