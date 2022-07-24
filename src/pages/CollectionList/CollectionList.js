import React, { useContext, useState } from 'react'
import { CollectionContext } from '../../context/collection'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

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
        <input placeholder='new collection name' onChange={e => setInputTextNew(e.target.value)} value={inputTextNew} />
        <button disabled={disableSave} onClick={handleSaveNewCollection}>save new collection</button>
      </Wrapper>
      {Object.keys(collections.data).map(name => (
        <Wrapper key={name}>
          <div>
            {isOpenRename === name ? (
              <div>
                <input onChange={e => setInputTextRename(e.target.value)} value={inputTextRename} />
                <button onClick={() => handleSaveRename(name)}>save</button>
                <button onClick={() => setIsOpenRename('')}>cancel</button>
              </div>
            ) : (
              <div>
                <p><b>{name}</b> <small>({collections.data[name].length} data)</small> </p>
                <button onClick={() => handleOpenRename(name)}>rename</button>
              </div>
            )}
          </div>
          <div>
            <Link to={`/collections/${name}`}>
              <button>Detail</button>
            </Link>
            <button onClick={() => handleDelete(name)}>Delete</button>
          </div>
        </Wrapper>
      ))}
    </Container>
  )
}
