import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Building, Home, Landmark, TreePine } from 'lucide-react'

const tipoImoveis = [
  { name: 'Casa', value: 400, icon: Home },
  { name: 'Apartamento', value: 300, icon: Building },
  { name: 'Terreno', value: 200, icon: TreePine },
  { name: 'Outros', value: 100, icon: Landmark },
]

const categoriaImoveis = [
  { name: 'Aluguel', quantidade: 500 },
  { name: 'Venda', quantidade: 300 },
  { name: 'Disponível', quantidade: 200 },
  { name: 'Vendido', quantidade: 150 },
]

const imoveisVencendo = [
  { id: 1, endereco: 'Rua A, 123', tipo: 'Casa', dataVencimento: '2023-07-15' },
  { id: 2, endereco: 'Av. B, 456', tipo: 'Apartamento', dataVencimento: '2023-07-20' },
  { id: 3, endereco: 'Rua C, 789', tipo: 'Casa', dataVencimento: '2023-07-25' },
  { id: 4, endereco: 'Av. D, 1011', tipo: 'Terreno', dataVencimento: '2023-07-30' },
]

const historicoAlugueis = [
  { mes: 'Jan', valor: 2300 },
  { mes: 'Fev', valor: 2400 },
  { mes: 'Mar', valor: 2450 },
  { mes: 'Abr', valor: 2500 },
  { mes: 'Mai', valor: 2550 },
  { mes: 'Jun', valor: 2600 },
]

export default function DashboardPro() {
  const totalImoveis = 1000
  const metaImoveis = 1200
  const progressoMeta = (totalImoveis / metaImoveis) * 100
  const mediaAluguel = 2500

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard de Imóveis</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Imóveis</CardTitle>
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
            <div className="text-2xl font-bold">R$ {mediaAluguel.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-2">
              +2.5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Histórico de Aluguéis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historicoAlugueis}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#8884d8" />
              </LineChart>
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
            <CardTitle className="text-sm font-medium">Categorias de Imóveis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoriaImoveis}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#8884d8" />
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
              {imoveisVencendo.map((imovel) => (
                <TableRow key={imovel.id}>
                  <TableCell>{imovel.id}</TableCell>
                  <TableCell>{imovel.endereco}</TableCell>
                  <TableCell>{imovel.tipo}</TableCell>
                  <TableCell>{imovel.dataVencimento}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

