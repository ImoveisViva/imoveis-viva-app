import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, MapPin, Home, Building, TreePine, Bath, BedDouble, Ruler, Image } from 'lucide-react'
import { ImovelType } from "@/hooks/types"
import { GetImoveisDB } from "@/firebase/admin/getDashboard"

export default function ConsultaImoveis() {
  const [dataBD, setDataBD] = useState<ImovelType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedImovel, setSelectedImovel] = useState<ImovelType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function handleGetBD() {
      try {
        const data = await GetImoveisDB()
        setDataBD(data)
      } catch (error) {
        console.log(error)
      }
    }
    handleGetBD()
  }, [])

  const filteredImoveis = dataBD

  const getStatusColor = (status: Boolean) => {
    switch (status) {
      case true:
        return "bg-green-500"
      case false:
        return "bg-blue-500"
      default:
        return "bg-yellow-500"
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "casa":
        return <Home className="h-5 w-5" />
      case "apartamento":
        return <Building className="h-5 w-5" />
      case "terreno":
        return <TreePine className="h-5 w-5" />
      default:
        return <Home className="h-5 w-5" />
    }
  }

  const openModal = (imovel: ImovelType) => {
    setSelectedImovel(imovel)
    setIsModalOpen(true)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Consulta de Imóveis</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por endereço, cidade ou tipo de imóvel..."
              className="pl-10 pr-4 py-6 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
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
                <Select>
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
                <Select>
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
              <div className="space-y-2">
                <Label>Faixa de Preço</Label>
                <Slider
                  min={0}
                  max={1000000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>R$ {priceRange[0].toLocaleString()}</span>
                  <span>R$ {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
              <Button>Aplicar Filtros</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImoveis.map((imovel) => (
            <Card key={imovel.id} className="overflow-hidden">
              <img src={
                imovel.fotos[0] instanceof File
                  ? URL.createObjectURL(imovel.fotos[0])
                  : imovel.fotos[0]
              } alt={imovel.tipoImovel} className="w-full h-48 object-cover" />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      {getTipoIcon(imovel.tipoImovel)}
                      {imovel.tipoImovel}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {imovel.endereco.rua} {imovel.endereco.numero} - {imovel.endereco.bairro}
                    </p>
                  </div>
                  <Badge className={getStatusColor(imovel.disponivel)}>
                    {imovel.disponivel ? 'Disponível' : 'Indisponível'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold">
                    {imovel.categoria === "Aluguel"
                      ? `R$ ${imovel.preco}/mês`
                      : `R$ ${imovel.preco.toLocaleString()}`}
                  </span>
                  <span className="text-sm text-muted-foreground font-bold text-[#c99e06]">{imovel.categoria}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {imovel.quartos && (
                    <span className="flex items-center gap-1">
                      <BedDouble className="h-4 w-4" />
                      {imovel.quartos} quartos
                    </span>
                  )}
                  {imovel.quartos && (
                    <span className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {imovel.quartos} banheiros
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    {imovel.quartos} m²
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => openModal(imovel)}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Ver mais fotos
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImovel?.tipoImovel} - {selectedImovel?.endereco.rua} {selectedImovel?.endereco.numero}</DialogTitle>
            <DialogDescription>Galeria de fotos do imóvel</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {selectedImovel?.fotos.map((foto, index) => (
              <img
                key={index}
                src={
                  foto instanceof File
                    ? URL.createObjectURL(foto)
                    : foto
                }
                alt={`Foto ${index + 1} do imóvel`}
                className="w-full h-48 object-cover rounded-md"
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}