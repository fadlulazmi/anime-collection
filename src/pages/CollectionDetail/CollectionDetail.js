import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { CollectionContext } from '../../context/collection'
import { useQuery } from '@apollo/client'
import { GET_ANIME_DETAIL } from '../../queries'
import Card from '../../components/Card'

export default function CollectionDetail() {
  const navigate = useNavigate()
  const { name } = useParams()
  const { collections, dispatch } =  useContext(CollectionContext)
  const [editCollection, setEditCollection] = useState(false)
  const [inputText, setInputText] = useState(name)

  const Container = styled.div`
    padding: 32px;
    text-align: center;
  `

  const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `

  const handleButtonCancel = () => {
    setInputText(name)
    setEditCollection(false)
  }

  const handleButtonSave = () => {
    const currentData = { ...collections.data }
    currentData[inputText] = [...currentData[name]]
    delete currentData[name]
    dispatch({ type: 'SET_COLLECTION', data: currentData })
    setInputText(inputText)
    setEditCollection(false)
    navigate(`/collections/${inputText}`)
  }

  const handleRemove = (id) => {
    if(window.confirm(`Remove Anime "${name}" from this collection ?`) === true){
      const currentData = { ...collections.data }
      const filteredData = currentData[name].filter(animeId => animeId !== id)
      dispatch({ type: 'SET_COLLECTION', data: { ...currentData, [name]: filteredData } })
    }
  }

  return (
    <Container>
      <div>
        {!editCollection ? (
          <>
            <h2>{name}</h2>
            <button onClick={() => setEditCollection(true)}>rename collection</button>
          </>
        ) : (
          <>
            <input onChange={e => setInputText(e.target.value)} value={inputText} />
            <br/>
            <button disabled={inputText === name || !inputText} onClick={handleButtonSave}>save</button>
            <button onClick={handleButtonCancel}>cancel</button>
          </>
        )}
      </div>
      <Wrapper>
        {collections.data[name].map(animeId => (
          <Collection id={animeId} key={animeId} handleRemove={handleRemove}/>
        ))}
      </Wrapper>
    </Container>
  )
}

export function Collection({ id, handleRemove }){
  const navigate = useNavigate()
  const { data } = useQuery(GET_ANIME_DETAIL, { variables: { id } })

  const { Media } = data || {}
  const {
    title = {},
    coverImage = {}
  } = Media || {}

  const handleClick = () => {
    navigate(`/${id}`)
  }

  return (
    <Card 
      image={coverImage.medium} 
      title={title.english || title.native} 
      handleClick={handleClick}
    >
      <button onClick={() => handleRemove(id)}>remove</button>
    </Card>
  )
}
