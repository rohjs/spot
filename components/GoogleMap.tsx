import { useMemo } from 'react'
import GoogleMapReact, { ClickEventValue } from 'google-map-react'

import { Marker } from './Marker'

type GoogleMapProps = {
  lat: number
  lng: number
  zoom: number
  height?: string | number
  width?: string | number
  markers?: Marker[]
  onClick?(params: ClickEventValue): void
}

export function GoogleMap({
  lat,
  lng,
  zoom,
  height = '100vh',
  width = '100%',
  markers = [],
  onClick,
}: GoogleMapProps) {
  const containerSize = useMemo(() => ({ height, width }), [height, width])
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string
  const mapId = process.env.NEXT_PUBLIC_MAP_ID as string

  return (
    <div style={containerSize}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat, lng }}
        defaultZoom={zoom}
        onClick={onClick}
        options={{ mapId }}
      >
        {markers.map((marker) => (
          <Marker key={marker.id} {...marker} />
        ))}
      </GoogleMapReact>
    </div>
  )
}
