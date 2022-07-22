import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ANIME_LIST } from '../../queries'
import { AnimeContext } from '../../context/anime'
import styled from '@emotion/styled'
import Card from '../../components/Card'

export default function AnimeList() {
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery(GET_ANIME_LIST, {variables: {page: page, perPage: 10}})
  const { anime: { animeList, meta }, dispatch } = useContext(AnimeContext)
  useEffect(() => {
    if(!loading){
      dispatch({ type: 'GET_ANIME_LIST', animeList: data?.Page.media, meta: data?.Page.pageInfo })
    }
  }, [loading])

  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 32px;
  `

  return (
    <Container>
      {animeList.map(({id, coverImage, title}) => (
        <Card key={id} image={coverImage.medium} title={title.english || title.native} />
      ))}
    </Container>
  )
}
