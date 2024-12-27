import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon in production build
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png"

let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: iconShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

interface MapsProps {
    latitude: string
    longitude: string
}

export function Maps({ latitude, longitude }: MapsProps) {
    return (
        <div className="py-10">
            <h1 className="font-bold text-[28px] mb-2">Localização</h1>
            <div className="h-[40vh] w-full">
                <MapContainer center={[Number(latitude), Number(longitude)]} zoom={16} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[Number(latitude), Number(longitude)]}>
                        <Popup>
                            A localização do imóvel.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

