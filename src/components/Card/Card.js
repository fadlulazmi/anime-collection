import React from 'react'
import styled from '@emotion/styled'

export default function Card({image, title}) {

  const Container = styled.div`
    border: 1px solid grey;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    margin: 16px;
    width: 150px;
    text-align: center;
  `

  const Image = styled.img`
    width: 100px;
    height: 144px;
    object-fit: cover;
    border-radius: 4px;
  `

  return (
    <Container>
      <Image src={image} alt={title}/>
      <p>{title}</p>
    </Container>
  )
}