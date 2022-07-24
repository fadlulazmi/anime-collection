import React from 'react'
import styled from '@emotion/styled'

export default function Card(props) {

  const {image, title, handleClick, children} = props

  const Container = styled.div`
    border: 1px solid grey;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    margin: 16px;
    width: 150px;
    height: 270px;
    text-align: center;
  `

  const Image = styled.img`
    width: 100px;
    height: 144px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
  `

  const Title = styled.p`
    width: 130px;
    cursor: pointer;
  `

  return (
    <Container>
      <Image onClick={handleClick} src={image} alt={title}/>
      <Title onClick={handleClick}><u>{title}</u></Title>
      {children}
    </Container>
  )
}
