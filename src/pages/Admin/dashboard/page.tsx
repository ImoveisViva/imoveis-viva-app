import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Building, Home, Landmark } from 'lucide-react'
import { useEffect, useState } from "react"
import { ImovelType } from "@/hooks/types"
import { GetImoveisDB } from "@/firebase/admin/getDashboard"

export default function DashboardPro() {
  const [dataBD, setDataBD] = useState<ImovelType[]>([]);
  const totalImoveis = dataBD?.length
  const metaImoveis = 50
  const progressoMeta = (totalImoveis / metaImoveis) * 100

  useEffect(() => {
    async function handleGetBD() {
      try {
        const data = await GetImoveisDB();
        setDataBD(data)
      } catch (error) {
        console.log(error)
      }
    }
    handleGetBD()
  }, [])

  // CALCULANDO A MÉDIA DO ALUGUEIS --------------------------------------------
  const alugueis = dataBD.filter(imovel => imovel.tipoNegocio === "Aluguel");
  const somaPreco = alugueis.reduce((total, imovel) => total + Number(imovel.preco), 0);
  const mediaPrecoAluguel = alugueis.length > 0 ? somaPreco / alugueis.length : 0;
  const precoMedioFormatado = (mediaPrecoAluguel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))

  // TIPOS DE IMÓVEIS ----------------------------------------------------------
  const casa = dataBD.filter(imovel => imovel.tipoImovel === 'Casa');
  const apartamento = dataBD.filter(imovel => imovel.tipoImovel === 'Apartamento');
  const comercial = dataBD.filter(imovel => imovel.tipoImovel === 'Comercial');

  const tipoImoveis = [
    { name: 'Apartamento', value: apartamento.length, icon: Building },
    { name: 'Casa', value: casa.length, icon: Home },
    { name: 'Outros', value: comercial.length, icon: Landmark },
  ]

  // CATEGORIA DE IMÓVEIS ------------------------------------------------------
  const comum = dataBD.filter(imovel => imovel.categoria === 'Comum');
  const promocao = dataBD.filter(imovel => imovel.categoria === 'Promocao');
  const destaque = dataBD.filter(imovel => imovel.categoria === 'Destaque');

  const categoriaImoveis = [
    { name: 'Destaque', Quantidade: destaque.length },
    { name: 'Promoção', Quantidade: promocao.length },
    { name: 'Comum', Quantidade: comum.length },
  ]

  // --------------------------------------------------------------------------
  const calculateRemainingDays = (tempoContratado: string) => {
    const dias = parseInt(tempoContratado, 10);
    if (isNaN(dias)) return -1;
    const dataFim = new Date(Date.now() + dias * 24 * 60 * 60 * 1000);
    const diffTime = dataFim.getTime() - Date.now();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // ---------------------------------------------------------------------------
  const contratosProximos = dataBD.filter((imovel) => {
    const diasRestantes = calculateRemainingDays(imovel.tempoContratado);
    return diasRestantes > 0 && diasRestantes <= 30;
  });

  function quantosDiasFaltam(data: string): number {
    const dataCriacao = new Date(data);
    const dataFinalContrato = new Date(dataCriacao.getTime() + 30 * 24 * 60 * 60 * 1000);
    const hoje = new Date();
    const diferenca = dataFinalContrato.getTime() - hoje.getTime();
    return Math.ceil(diferenca / (1000 * 60 * 60 * 24));
  }

  const calcularImoveisPorBairro = () => {
    const imoveisPorBairro = dataBD.reduce((acc, imovel) => {
      const bairro = imovel.endereco.bairro;
      acc[bairro] = (acc[bairro] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(imoveisPorBairro)
      .map(([bairro, quantidade]) => ({ bairro, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 6);
  };

  const imoveisPorBairro = calcularImoveisPorBairro();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard de Imóveis</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta de Imóveis cadastrados</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalImoveis} / {metaImoveis}</div>
            <Progress value={progressoMeta} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {progressoMeta.toFixed(1)}% da meta atingida
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Aluguel</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {precoMedioFormatado}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Quantidade de Imóveis por Bairro (Top 6)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={imoveisPorBairro} layout="vertical" margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                <XAxis type="number" />
                <YAxis dataKey="bairro" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tipos de Imóveis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tipoImoveis}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {tipoImoveis.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {tipoImoveis.map((tipo, index) => (
                <div key={index} className="flex items-center">
                  {<tipo.icon className="mr-2 h-4 w-4" />}
                  <span className="text-sm font-medium">{tipo.name}: {tipo.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Categorias dos Imóveis cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoriaImoveis}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Quantidade" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Imóveis com Contrato Próximo do Vencimento</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data de Vencimento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contratosProximos.map((imovel) => (
                <TableRow key={imovel.id}>
                  <TableCell>{imovel.id}</TableCell>
                  <TableCell>{imovel.endereco.rua} {imovel.endereco.numero} - {imovel.endereco.bairro}</TableCell>
                  <TableCell>{imovel.tipoImovel}</TableCell>
                  <TableCell>{quantosDiasFaltam(imovel.data)} dias</TableCell>
                </TableRow>
              ))}
              {contratosProximos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Nenhum contrato próximo do vencimento</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

