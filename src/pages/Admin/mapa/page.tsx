import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { GetImoveisDB } from '@/firebase/admin/getDashboard'
import { ImovelType } from '@/hooks/types'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

export function Mapa() {
    const [dataBD, setDataBD] = useState<ImovelType[]>([])
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

    return (
        <div className="p-4">
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Filtros:</h2>
                <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 rounded bg-gray-200">Aluguel</button>
                    <button className="px-3 py-1 rounded bg-gray-200">Venda</button>
                    <button className="px-3 py-1 rounded bg-gray-200">Casa</button>
                    <button className="px-3 py-1 rounded bg-gray-200">Apartamento</button>
                    <button className="px-3 py-1 rounded bg-gray-200">Outros</button>
                </div>
            </div>
            <div className="h-[80vh] w-full">
                <MapContainer center={[-16.361858, -46.893249]} zoom={15} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {dataBD.map((imovel) => (
                        <Marker
                            key={imovel.id}
                            position={[parseFloat(imovel.endereco.latitude), parseFloat(imovel.endereco.longitude)]}
                        >
                            <Popup>
                                <div>
                                    <h3 className="font-bold">{imovel.tipoImovel}</h3>
                                    <p>{imovel.endereco.rua}, {imovel.endereco.numero}</p>
                                    <p>{imovel.endereco.bairro}</p>
                                    <p>Preço: R$ {imovel.preco}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )
}

