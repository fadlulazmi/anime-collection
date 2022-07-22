import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ANIME_LIST } from '../../queries'

export default function AnimeList() {
  const {data, loading, error} = useQuery(GET_ANIME_LIST, {variables: {page: 1, perPage: 10}})

  return (
    <div>AnimeList</div>
  )
}
