import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

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
    theme?: 'light' | 'dark' | 'soft-dark'
}

export function Maps({ latitude, longitude, theme = 'light' }: MapsProps) {
    const tileLayerUrl = {
        'light': "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        'dark': "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        'soft-dark': "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    }[theme]

    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' +
        (theme !== 'light' ? ' &copy; <a href="https://carto.com/attributions">CARTO</a>' : '')

    return (
        <div className='pt-10 pb-16'>
            <h1 className='font-bold text-[28px] mb-2'>Localização</h1>
            <div className="h-[40vh] w-full border">
                <MapContainer center={[Number(latitude), Number(longitude)]} zoom={16} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url={tileLayerUrl}
                        attribution={attribution}
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

