import type { GetServerSidePropsContext, NextPage } from 'next'
import GoogleMapReact from 'google-map-react'

import axios from 'utils/axios'
import { getStringQuery } from 'utils/urls'

type CityPageProps = {
  id: string
  lat: number
  lng: number
}

const CityPage: NextPage<CityPageProps> = ({ id, lat, lng }) => {
  return (
    <div>
      City: {id}
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_API_KEY as string }}
          defaultCenter={{ lat, lng }}
          defaultZoom={13}
        />
      </div>
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { params } = ctx
  const id = getStringQuery(params?.id)

  const data = await fetchCityCoordinates(id)

  if (!data) {
    return {
      notFound: true,
    }
  }

  const { lng, lat } = data

  return {
    props: {
      id,
      lng,
      lat,
    },
  }
}
