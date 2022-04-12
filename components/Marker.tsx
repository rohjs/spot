const markerStyle = {
  display: 'inline-block',
  padding: '4px',
  fontWeight: 700,
  color: '#fff',
  background: 'red',
}

type MarkerProps = {
  lat: number
  lng: number
  text: string
}

export function Marker({ lat, lng, text }: MarkerProps) {
  return (
    <div lat={lat} lng={lng} style={markerStyle}>
      {text}
    </div>
  )
}
