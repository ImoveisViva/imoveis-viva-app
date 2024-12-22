import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Home, Building, TreePine, Bath, BedDouble, Ruler, Image, Edit, MapPin } from 'lucide-react'
import { ImovelType } from "@/hooks/types"
import { GetImoveisDB } from "@/firebase/admin/getDashboard"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase/firebaseConfig"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FilterComponent } from "../components/Filtro"

export default function ConsultaImoveis() {
  const [dataBD, setDataBD] = useState<ImovelType[]>([])
  const [filteredImoveis, setFilteredImoveis] = useState<ImovelType[]>([])
  const [selectedImovel, setSelectedImovel] = useState<ImovelType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingImovel, setEditingImovel] = useState<ImovelType | null>(null)
  const [filters, setFilters] = useState({
    tipo: "todos",
    categoria: "todos",
  })

  useEffect(() => {
    async function handleGetBD() {
      try {
        const data = await GetImoveisDB()
        setDataBD(data)
        setFilteredImoveis(data)
      } catch (error) {
        console.log(error)
      }
    }
    handleGetBD()
  }, [])

  useEffect(() => {
    const filtered = dataBD.filter((imovel) => {
      const matchesTipo = filters.tipo === "todos" || imovel.tipoImovel.toLowerCase() === filters.tipo
      const matchesCategoria = filters.categoria === "todos" || imovel.tipoNegocio.toLowerCase() === filters.categoria
      return matchesTipo && matchesCategoria
    })
    setFilteredImoveis(filtered)
  }, [dataBD, filters])

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
    setEditingImovel(imovel);
    setIsEditModalOpen(true);
    console.log("Opening edit modal for:", imovel.id); // Add this line for debugging
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (editingImovel && editingImovel.id) {
        const docRef = doc(db, "imoveis", editingImovel.id);

        await updateDoc(docRef, {
          tempoContratado: editingImovel.tempoContratado,
          disponivel: editingImovel.disponivel,
        })

        setDataBD((prevData) =>
          prevData.map((imovel) =>
            imovel.id === editingImovel.id
              ? { ...imovel, tempoContratado: editingImovel.tempoContratado, disponivel: editingImovel.disponivel }
              : imovel
          )
        );
        setIsEditModalOpen(false);
      } else {
        console.error("Imóvel inválido ou não selecionado para edição.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o tempo de contrato:", error);
    }
  }

  const calculateRemainingTime = (tempoContratado: string) => {
    const dias = parseInt(tempoContratado, 10);
    if (isNaN(dias)) {
      return 'Tempo de contrato inválido';
    }
    const dataInicio = new Date();
    const dataFim = new Date(dataInicio.getTime() + dias * 24 * 60 * 60 * 1000);
    const diffTime = dataFim.getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} dias restantes` : 'Contrato expirado';
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Consulta de Imóveis</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <FilterComponent filters={filters} setFilters={setFilters} />
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
          {editingImovel && (
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tempoContratado">Tempo de contrato</Label>
                  <Select
                    value={editingImovel.tempoContratado}
                    onValueChange={(value) => setEditingImovel(prev => prev ? { ...prev, tempoContratado: value } : null)}
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
                <div className="space-y-2">
                  <Label htmlFor="disponivel">Disponibilidade</Label>
                  <Select
                    value={editingImovel.disponivel ? "true" : "false"}
                    onValueChange={(value) => setEditingImovel(prev => prev ? { ...prev, disponivel: value === "true" } : null)}
                  >
                    <SelectTrigger id="disponivel">
                      <SelectValue placeholder="Selecione a disponibilidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Disponível</SelectItem>
                      <SelectItem value="false">Indisponível</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar mudanças</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

