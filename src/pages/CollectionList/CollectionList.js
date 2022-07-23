import React, { useContext, useState } from 'react'
import { CollectionContext } from '../../context/collection'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Form, Button, Stack } from 'react-bootstrap'

export default function CollectionList() {
  const { collections, dispatch } = useContext(CollectionContext)
  const [inputTextNew, setInputTextNew] = useState('')
  const [inputTextRename, setInputTextRename] = useState('')
  const [isOpenRename, setIsOpenRename] = useState('')

  const handleSaveNewCollection = () => {
    dispatch({ type: 'SET_COLLECTION', data: {...collections.data, [inputTextNew]: [] } })
    setInputTextNew('')
  }

  const handleSaveRename = (name) => {
    const currentData = {...collections.data}
    currentData[inputTextRename] = [...currentData[name]]
    delete currentData[name]
    dispatch({ type: 'SET_COLLECTION', data: currentData })
    setIsOpenRename('')
  }

  const handleDelete = (name) => {
    const currentData = {...collections.data}
    delete currentData[name]
    dispatch({ type: 'SET_COLLECTION', data: currentData })
  }

  const handleOpenRename = (name) => {
    setIsOpenRename(name)
    setInputTextRename(name)
  }

  const disableSave = !inputTextNew || Object.keys(collections.data).includes(inputTextNew)

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
      <Wrapper>
        <Form.Control className='form-control-lg' placeholder='new collection name' onChange={e => setInputTextNew(e.target.value)} value={inputTextNew} />
        <Button size="lg" variant='success' disabled={disableSave} onClick={handleSaveNewCollection}>save</Button>
      </Wrapper>
      {Object.keys(collections.data).map(name => (
        <Wrapper key={name}>
          <div>
            {isOpenRename === name ? (
              <div>
                <Form.Control onChange={e => setInputTextRename(e.target.value)} value={inputTextRename} />
                <Button variant='success' onClick={() => handleSaveRename(name)}>save</Button>
                <Button variant='light' onClick={() => setIsOpenRename('')}>cancel</Button>
              </div>
            ) : (
              <div>
                <p><b>{name}</b> <small>({collections.data[name].length} data)</small> </p>
                <Button variant='light' onClick={() => handleOpenRename(name)}>rename</Button>
              </div>
            )}
          </div>
          <div>
            <Link to={`/collections/${name}`}>
              <Button variant='light'>Detail</Button>
            </Link>
            <Button variant='danger' onClick={() => handleDelete(name)}>delete collection</Button>
          </div>
        </Wrapper>
      ))}
    </Container>
  )
}
