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

  return (
    <div style={containerSize}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_API_KEY as string }}
        defaultCenter={{ lat, lng }}
        defaultZoom={zoom}
        onClick={onClick}
      >
        {markers.map((marker) => (
          <Marker key={marker.id} {...marker} />
        ))}
      </GoogleMapReact>
    </div>
  )
}
