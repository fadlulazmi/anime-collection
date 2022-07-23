import React, { useContext } from 'react'
import { CollectionContext } from '../../context/collection'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export default function CollectionList() {
  const { collections } = useContext(CollectionContext)

  const Container = styled.div`
    padding: 32px;
  `

  const Wrapper = styled.div`
    border: 2px solid grey;
    border-radius: 4px; 
    padding: 8px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  `

  return (
    <Container>
      {Object.keys(collections.data).map(name => (
        <Wrapper key={name}>
            <p><b>{name}</b> <small>({collections.data[name].length} data)</small> </p>
            <Link to={`/collections/${name}`}>Detail</Link>
        </Wrapper>
      ))}
    </Container>
  )
}
