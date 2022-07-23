import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ANIME_DETAIL } from '../../queries'
import styled from '@emotion/styled'
import { CollectionContext } from '../../context/collection'

export default function AnimeDetail() {
  const [selectedCollection, setSelectedCollection] = useState('')
  const [newCollection, setNewCollection] = useState('')
  const [disable, setDisable] = useState(false)
  const [addForm, setAddForm] = useState(false)
  const { animeId } = useParams()
  const { data } = useQuery(GET_ANIME_DETAIL, { variables: { id: animeId } })
  const { collections, dispatch } = useContext(CollectionContext)
  console.log(animeId, 'anime id')
  const { Media } = data || {}
  const {
    id,
    trailer = {},
    title = {},
    coverImage = {},
    description,
    episodes,
    genres = [],
    averageScore,
  } = Media || {}

  const addToCollection = (e) => {
    e.preventDefault()
    const currentCollections = {...collections.data}
    const key = newCollection || selectedCollection
    if(!currentCollections[key]){
      currentCollections[key] = []
    }
    currentCollections[key].push(id)
    currentCollections[key] = [...new Set(currentCollections[key])]
    dispatch({type: 'SET_COLLECTION', data: currentCollections})
    setAddForm(false)
    setSelectedCollection('')
    setNewCollection('')
  }

  useEffect(() => {
    setDisable(!selectedCollection && !newCollection)
  }, [selectedCollection, newCollection])

  console.log(disable)

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

  const Iframe = styled.iframe`
    margin-top: 32px;
  `

  const _renderCollected = () => {
    const names = []
    Object.keys(collections.data).forEach(key => {
      if(collections.data[key].includes(id)){
        names.push(key)
      }
    })
    return (
      <div>
        <b>{names.length} collection(s)</b>
        {names.map(name => <p key={name}>{name}</p>)}
      </div>
    )
  }
  
  return (
    <Container>
      <h3>{title.english || title.native}</h3>
      <div>
        <b>anime saved in :</b>
        {_renderCollected()}
      </div>
      {!addForm && <button onClick={() => setAddForm(true)}>add to collection</button>}
      {addForm && (
        <form onSubmit={addToCollection}>
          <Container>
            {Object.keys(collections.data).length > 0 && (
              <>
              <div>
                <label>Your Collections </label>
                <select name='collectionsOptions' onChange={e => setSelectedCollection(e.target.value)} value={selectedCollection}>
                  <option />
                  {Object.keys(collections.data).map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
                <b> or </b>
              </>
            )}
            <div>
              <label>New Collection </label>
              <input
                name="collectionName"
                type="text"
                onChange={e => setNewCollection(e.target.value)} 
                value={newCollection}
                placeholder="input new colection names"
              />
            </div>
          </Container>
          <button type='submit' disabled={disable}>save</button>
          <button onClick={() => setAddForm(false)}>cancel</button>
        </form>
      )}
      {trailer && <Iframe 
        src={`https://www.youtube.com/embed/${trailer.id}`} 
        title={trailer.id}
        width="80%"
        height="400"
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
}
