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
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, MapPin, Home, Building, TreePine, Bath, BedDouble, Ruler, Image, Edit } from 'lucide-react'
import { ImovelType } from "@/hooks/types"
import { GetImoveisDB } from "@/firebase/admin/getDashboard"

export default function ConsultaImoveis() {
  const [dataBD, setDataBD] = useState<ImovelType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedImovel, setSelectedImovel] = useState<ImovelType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingImovel, setEditingImovel] = useState<ImovelType | null>(null)

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

  const openEditModal = (imovel: ImovelType) => {
    setEditingImovel(imovel)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically update the database with the new values
    // For now, we'll just update the local state
    if (editingImovel) {
      const updatedDataBD = dataBD.map(imovel => 
        imovel.id === editingImovel.id 
        ? {...imovel, tempoContratado: editingImovel.tempoContratado} 
        : imovel
      )
      setDataBD(updatedDataBD)
      setIsEditModalOpen(false)
    }
  }

  const calculateRemainingTime = (tempoContratado: string) => {
    const dias = parseInt(tempoContratado, 10);
    if (isNaN(dias)) {
      return 'Tempo de contrato inválido';
    }
    const dataInicio = new Date(); // Assumindo que o contrato começa hoje
    const dataFim = new Date(dataInicio.getTime() + dias * 24 * 60 * 60 * 1000);
    const diffTime = dataFim.getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} dias restantes` : 'Contrato expirado';
  };

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
                    {imovel.tipoNegocio === "aluguel"
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
                  {imovel.banheiro && (
                    <span className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {imovel.banheiro} banheiros
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    {imovel.metros2} m²
                  </span>
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">Tempo de contrato:</span>{' '}
                  {calculateRemainingTime(imovel.tempoContratado)}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => openModal(imovel)}
                  >
                    <Image className="mr-2 h-4 w-4" />
                    Ver fotos
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEditModal(imovel)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </div>
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

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Imóvel</DialogTitle>
            <DialogDescription>
              Faça as alterações necessárias e clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tempoContratado">Tempo de contrato</Label>
                <Select
                  value={editingImovel?.tempoContratado}
                  onValueChange={(value) => setEditingImovel(prev => prev ? {...prev, tempoContratado: value} : null)}
                >
                  <SelectTrigger id="tempoContratado">
                    <SelectValue placeholder="Selecione para alterar o tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="90">3 meses</SelectItem>
                    <SelectItem value="180">6 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar mudanças</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}