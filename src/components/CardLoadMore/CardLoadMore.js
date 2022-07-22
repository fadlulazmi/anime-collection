import React from 'react'
import styled from '@emotion/styled'
import loadMoreIcon from '../../assets/load-more.png'

export default function CardLoadMore({handleClick}) {
  const Container = styled.div`
    border: 1px solid grey;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    margin: 16px;
    width: 150px;
    height: 230px;
    text-align: center;
    background-color: lightgrey;
    cursor: pointer;
  `

  const Image = styled.img`
    width: 50px;
    height: 144px;
    object-fit: contain;
    border-radius: 4px;
  `

  return (
    <Container onClick={handleClick}>
      <Image src={loadMoreIcon} alt={'load more'}/>
      <b>LOAD MORE</b>
    </Container>
  )
}
