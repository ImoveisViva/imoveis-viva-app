import { useState, FormEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import CadastroImoveis from '@/firebase/admin/cadastroImoveis';
import { ImovelType } from '@/hooks/types';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/firebaseConfig';
import { GetImoveisDB } from '@/firebase/admin/getDashboard';

const formatPrice = (price: number): string => {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export default function CadastroImoveisPage() {
    const { toast } = useToast();

    const [propertyData, setPropertyData] = useState<ImovelType & { fotosPreviews: string[] }>({
        categoria: '',
        tipoImovel: '',
        tipoNegocio: '',
        quartos: 0,
        sala: 0,
        cozinha: 0,
        banheiro: 0,
        metros2: 0,
        preco: 0,
        descricao: '',
        endereco: {
            bairro: '',
            cidade: '',
            rua: '',
            numero: 0,
            latitude: '',
            longitude: ''
        },
        contato: {
            nome: '',
            telefone: 0,
            email: ''
        },
        fotos: [],
        fotosPreviews: [],
        disponivel: true,
        tempoContratado: '',
    });
    const [dataBD, setDataBD] = useState<ImovelType[]>([])
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name !== 'preco') {
            setPropertyData(prev => ({
                ...prev,
                [name]: name === 'quartos' || name === 'sala' || name === 'cozinha' || name === 'banheiro' || name === 'metros2' ?
                    (value === '' ? 0 : parseInt(value, 10)) :
                    value
            }));
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setPropertyData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPropertyData(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                [name]: name === 'numero' ?
                    (value === '' ? 0 : parseInt(value, 10)) :
                    value
            }
        }));
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPropertyData(prev => ({
            ...prev,
            contato: {
                ...prev.contato,
                [name]: value
            }
        }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const maxFiles = 10;
        const selectedFiles = files.slice(0, maxFiles);

        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));

        setPropertyData(prev => ({
            ...prev,
            fotos: [...prev.fotos, ...selectedFiles].slice(0, maxFiles),
            fotosPreviews: [...prev.fotosPreviews, ...newPreviews].slice(0, maxFiles)
        }));
    };

    const removePhoto = (index: number) => {
        setPropertyData(prev => ({
            ...prev,
            fotos: prev.fotos.filter((_, i) => i !== index),
            fotosPreviews: prev.fotosPreviews.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        const id_imovel = `${propertyData.endereco.latitude}_${propertyData.endereco.longitude}`;

        try {
            const photoUrls = await Promise.all(
                propertyData.fotos.map(async (foto, index) => {
                    const storageRef = ref(storage, `imoveis/${id_imovel}/${Date.now()}_${index}`);
                    const snapshot = await uploadBytes(storageRef, foto);
                    return getDownloadURL(snapshot.ref);
                })
            );

            const newId = String(dataBD.length + 1).padStart(4, "0");

            const finalPropertyData = {
                ...propertyData,
                fotos: photoUrls,
                id_imovel: newId,
                data: new Date().toISOString(),
            };

            await CadastroImoveis(finalPropertyData, newId);
            propertyData.fotosPreviews.forEach(URL.revokeObjectURL);

            setPropertyData({
                categoria: '',
                tipoImovel: '',
                tipoNegocio: '',
                quartos: 0,
                sala: 0,
                cozinha: 0,
                banheiro: 0,
                metros2: 0,
                preco: 0,
                descricao: '',
                endereco: {
                    bairro: '',
                    cidade: '',
                    rua: '',
                    numero: 0,
                    latitude: '',
                    longitude: ''
                },
                contato: {
                    nome: '',
                    telefone: 0,
                    email: ''
                },
                fotos: [],
                fotosPreviews: [],
                disponivel: true,
                tempoContratado: '',
            });
            toast({
                title: "Sucesso!",
                description: "Cadastro feito com sucesso.",
                variant: "default",
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Erro desconhecido ao cadastrar o imóvel. Tente novamente.');
            }
            console.error(error);
            toast({
                title: "Erro!",
                description: "Não foi possível concluir o cadastro.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 pb-32 ">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Cadastro de Imóvel</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="categoria">
                                    Categoria <span className="text-red-500">*</span>
                                </Label>
                                <Select name="categoria" value={propertyData.categoria} onValueChange={(value) => handleSelectChange('categoria', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Destaque">Destaque</SelectItem>
                                        <SelectItem value="Promocao">Promoção</SelectItem>
                                        <SelectItem value="Comum">Comum</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tipoImovel">
                                    Tipo do Imóvel <span className="text-red-500">*</span>
                                </Label>
                                <Select name="tipoImovel" value={propertyData.tipoImovel} onValueChange={(value) => handleSelectChange('tipoImovel', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Casa">Casa</SelectItem>
                                        <SelectItem value="Apartamento">Apartamento</SelectItem>
                                        <SelectItem value="Comercial">Comercial</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tipoNegocio">
                                    Tipo de Negócio <span className="text-red-500">*</span>
                                </Label>
                                <Select name="tipoNegocio" value={propertyData.tipoNegocio} onValueChange={(value) => handleSelectChange('tipoNegocio', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Venda">Venda</SelectItem>
                                        <SelectItem value="Aluguel">Aluguel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quartos">
                                    Quartos <span className="text-red-500">*</span>
                                </Label>
                                <Input value={propertyData.quartos.toString()} type="number" id="quartos" name="quartos" onChange={handleInputChange} min="0" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sala">
                                    Sala <span className="text-red-500">*</span>
                                </Label>
                                <Input value={propertyData.sala.toString()} type="number" id="sala" name="sala" onChange={handleInputChange} min="0" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cozinha">
                                    Cozinha <span className="text-red-500">*</span>
                                </Label>
                                <Input value={propertyData.cozinha.toString()} type="number" id="cozinha" name="cozinha" onChange={handleInputChange} min="0" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="banheiro">
                                    Banheiros <span className="text-red-500">*</span>
                                </Label>
                                <Input value={propertyData.banheiro.toString()} type="number" id="banheiro" name="banheiro" onChange={handleInputChange} min="0" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="metros2">
                                    m² <span className="text-red-500">*</span>
                                </Label>
                                <Input value={propertyData.metros2.toString()} type="number" id="metros2" name="metros2" onChange={handleInputChange} min="0" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="preco">
                                    Preço <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={formatPrice(propertyData.preco)}
                                    type="text"
                                    id="preco"
                                    name="preco"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^\d]/g, '');
                                        setPropertyData(prev => ({
                                            ...prev,
                                            preco: parseInt(value) / 100
                                        }));
                                    }}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tempoContratado">
                                    Tempo contratado <span className="text-red-500">*</span>
                                </Label>
                                <Select name="tempoContratado" value={propertyData.tempoContratado} onValueChange={(value) => handleSelectChange('tempoContratado', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tempo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="30">30 dias</SelectItem>
                                        <SelectItem value="90">3 meses</SelectItem>
                                        <SelectItem value="180">6 meses</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="descricao">
                                Descrição <span className="text-red-500">*</span>
                            </Label>
                            <Textarea value={propertyData.descricao} id="descricao" name="descricao" onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fotos">
                                Fotos <span className="text-red-500">*</span>
                                <span className="text-sm text-gray-500 ml-2">(Máximo 10 fotos)</span>
                            </Label>
                            <Input
                                type="file"
                                id="fotos"
                                name="fotos"
                                onChange={handlePhotoChange}
                                multiple
                                accept="image/*"
                                required={propertyData.fotos.length === 0}
                            />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                            {propertyData.fotosPreviews.map((preview, index) => (
                                <div key={index} className="relative aspect-square">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                                        aria-label="Remover foto"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Endereço</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="bairro">
                                        Bairro <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.bairro} type="text" id="bairro" name="bairro" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cidade">
                                        Cidade <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.cidade} type="text" id="cidade" name="cidade" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rua">
                                        Rua <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.rua} type="text" id="rua" name="rua" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numero">
                                        Número <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.numero.toString()} type="number" id="numero" name="numero" onChange={handleAddressChange} min="0" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="latitude">
                                        Latitude <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.latitude} type="number" id="latitude" name="latitude" onChange={handleAddressChange} step="any" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="longitude">
                                        Longitude <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.longitude} type="number" id="longitude" name="longitude" onChange={handleAddressChange} step="any" required />
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Contato do Proprietário</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="nome">
                                        Nome <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.contato.nome} type="text" id="nome" name="nome" onChange={handleContactChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefone">
                                        Telefone <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.contato.telefone.toString()} type="tel" id="telefone" name="telefone" onChange={handleContactChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        Email <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.contato.email} type="email" id="email" name="email" onChange={handleContactChange} required />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? 'Cadastrando...' : 'Cadastrar Imóvel'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            {error && (
                <Alert variant="destructive" className="mt-4 max-w-4xl mx-auto">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    )
}

