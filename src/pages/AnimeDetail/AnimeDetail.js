import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ANIME_DETAIL } from '../../queries'
import styled from '@emotion/styled'

export default function AnimeDetail() {
  const [bg, setBg] = useState('')
  const { animeId } = useParams()
  const { data } = useQuery(GET_ANIME_DETAIL, { variables: { id: animeId } })
  console.log(animeId, 'anime id')
  const { Media } = data || {}
  const {
    trailer,
    title,
    coverImage,
    description,
    episodes,
    genres,
    averageScore,
  } = Media || {}

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
  `

  const Content = styled.div`
    display: flex;
    width: 50%;
    margin-top: 24px;
    justify-content: space-between;
  `

  const Image = styled.img`
    object-fit: contain;
  `

  const Paragraph = styled.p`
    margin-left: 20px;
    text-align: justify;
  `
  
  if(data) {
    return (
      <Container>
        <h3>{title.english || title.native}</h3>
        <button>add to collection</button>
        {trailer && <iframe 
          src={`https://www.youtube.com/embed/${trailer.id}`} 
          title={trailer.id}
          width="80%"
          height="300"
        />}
        <Content>
          <Image src={coverImage.large} alt={title.native} />
          <Paragraph dangerouslySetInnerHTML={{ __html: description }} />
        </Content>
        <Content>
          <p>Total Episodes: {episodes}</p>
          <p>Genre: {genres.join(', ')}</p>
          <p>Score: {averageScore}</p>
        </Content>
      </Container>
    )
  } else {
    return null
  }
}
