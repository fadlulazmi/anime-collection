import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { GET_ANIME_LIST } from '../../queries'
import { AnimeContext } from '../../context/anime'
import styled from '@emotion/styled'
import Card from '../../components/Card'
import CardLoadMore from '../../components/CardLoadMore'
import Pagination from '../../components/Pagination/Pagination'

export default function AnimeList() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryPage = searchParams.get('page')
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery(GET_ANIME_LIST, {variables: {page, perPage: 10}})
  const { anime: { animeList, meta }, dispatch } = useContext(AnimeContext)
  useEffect(() => {
    if(data){
      dispatch({ type: 'GET_ANIME_LIST', animeList: data?.Page.media, meta: data?.Page.pageInfo })
    }
  }, [data, dispatch])

  useEffect(() => {
    if(queryPage){
      setPage(queryPage)
    }
  }, [queryPage])

  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 32px;
  `

  const goToDetail = (id) => {
    navigate(`/${id}`)
  }
  

  if(loading){
    return (
      <Container>
        <h3>Loading...</h3>
      </Container>
    )
  }

  return (
    <>
      <Container>
        {animeList.map(({id, coverImage, title}) => (
          <Card key={id} image={coverImage.medium} title={title.english || title.native} handleClick={() => goToDetail(id)}/>
        ))}
      </Container>
      <Container>
        <Pagination {...meta} />
      </Container>
    </>
  )
}
