import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  const { data, loading } = useQuery(GET_ANIME_DETAIL, { variables: { id: animeId } })
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

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
  `

  const Content = styled.div`
    display: flex;
    margin-top: 24px;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 80%
  `

  const Image = styled.img`
    object-fit: contain;
  `

  const Paragraph = styled.p`
    margin-left: 20px;
    text-align: justify;
    max-width: 80%;
  `

  const Iframe = styled.iframe`
    margin-top: 32px;
    max-width: 80%;
  `

  const Label = styled.label`
    margin-right: 16px
  `

  const Bold = styled.b`
    margin: 16px;
  `

  const Form = styled.form`
    text-align: center
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
        <Bold>{names.length} collection(s)</Bold>
        <Container>
          {names.map(name => <Link key={name} to={`/collections/${name}`}>{name}</Link>)}
        </Container>
      </div>
    )
  }

  if(loading){
    return (
      <Container>
        <h3>Loading...</h3>
      </Container>
    )
  }
  
  return (
    <Container>
      <h3>{title.english || title.native}</h3>
      <div>
        <Bold>anime saved in :</Bold>
        {_renderCollected()}
      </div>
      {!addForm && <button onClick={() => setAddForm(true)}>add to collection</button>}
      {addForm && (
        <Form onSubmit={addToCollection}>
          <Container>
            {Object.keys(collections.data).length > 0 ? (
              <div>
                <Label>Your Collections </Label>
                <select
                  name='collectionsOptions'
                  onChange={e => setSelectedCollection(e.target.value)} 
                  value={selectedCollection}
                  disabled={newCollection}
                >
                  <option />
                  {Object.keys(collections.data).map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <Label>New Collection </Label>
                <input
                  name="collectionName"
                  type="text"
                  onChange={e => setNewCollection(e.target.value)} 
                  value={newCollection}
                  placeholder="collection names"
                  disabled={selectedCollection}
                  pattern="[a-zA-Z0-9\s]+"
                />
              </div>
            )}
          </Container>
          <button type='submit' disabled={disable}>save</button>
          <button onClick={() => setAddForm(false)}>cancel</button>
        </Form>
      )}
      {trailer && <Iframe 
        src={`https://www.youtube.com/embed/${trailer.id}`} 
        title={trailer.id}
        width="500"
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
