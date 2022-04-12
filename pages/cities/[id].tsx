import type { GetServerSidePropsContext, NextPage } from 'next'
import { ClickEventValue } from 'google-map-react'

import axios from 'utils/axios'
import { getStringQuery } from 'utils/urls'

import { GoogleMap } from 'components/GoogleMap'

type CityPageProps = {
  id: string
  lat: number
  lng: number
  markers: Marker[]
  zoom: number
}

const CityPage: NextPage<CityPageProps> = ({ id, lat, lng, markers, zoom }) => {
  function onClick({ x, y, lat, lng, event }: ClickEventValue) {
    console.log(x, y, lat, lng, event)
  }

  return (
    <div>
      City: {id}
      <hr />
      <GoogleMap
        lat={lat}
        lng={lng}
        zoom={zoom}
        markers={markers}
        onClick={onClick}
      />
    </div>
  )
}

export default CityPage

async function fetchCityCoordinates(city: string) {
  return axios
    .get('/maps.json')
    .then((res) => res?.data && res.data[city])
    .catch((err) => console.log(err))
}

async function fetchCityMarkers(city: string) {
  return axios
    .get('/markers.json')
    .then((res) => res?.data && res.data[city])
    .catch((err) => console.log(err))
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { params } = ctx
  const id = getStringQuery(params?.id)

  const city = await fetchCityCoordinates(id)
  const markers = await fetchCityMarkers(id)

  if (!city) {
    return {
      notFound: true,
    }
  }

  const { lng, lat, zoom } = city
  return {
    props: {
      id,
      lng,
      lat,
      markers,
      zoom,
    },
  }
}
