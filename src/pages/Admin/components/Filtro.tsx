import React from 'react'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface FilterComponentProps {
  filters: {
    tipo: string;
    categoria: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    tipo: string;
    categoria: string;
  }>>;
}

export function FilterComponent({ filters, setFilters }: FilterComponentProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="px-6 py-6">
          <Filter className="mr-2 h-5 w-5" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros de Pesquisa</SheetTitle>
          <SheetDescription>
            Ajuste os filtros para refinar sua busca de imóveis.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Imóvel</Label>
            <Select
              value={filters.tipo}
              onValueChange={(value) => setFilters(prev => ({ ...prev, tipo: value }))}
            >
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Select
              value={filters.categoria}
              onValueChange={(value) => setFilters(prev => ({ ...prev, categoria: value }))}
            >
              <SelectTrigger id="categoria">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="aluguel">Aluguel</SelectItem>
                <SelectItem value="venda">Venda</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

