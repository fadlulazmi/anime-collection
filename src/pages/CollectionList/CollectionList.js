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
    if(window.confirm(`Delete collection "${name}" ?`) === true){
      const currentData = {...collections.data}
      delete currentData[name]
      dispatch({ type: 'SET_COLLECTION', data: currentData })
    }
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
    flex-wrap: wrap;
  `

  return (
    <Container>
      <Wrapper>
        <input 
          type="text"
          placeholder='new collection name' 
          onChange={e => setInputTextNew(e.target.value)} 
          value={inputTextNew} 
          pattern="[a-zA-Z0-9\s]+"
        />
        <button disabled={disableSave} onClick={handleSaveNewCollection}>save new collection</button>
      </Wrapper>
      {Object.keys(collections.data).map(name => (
        <Wrapper key={name}>
          <div>
            {isOpenRename === name ? (
              <input onChange={e => setInputTextRename(e.target.value)} value={inputTextRename} />
            ) : (
              <p><Link to={`/collections/${name}`}>{name}</Link> <small>({collections.data[name].length} data)</small> </p>
            )}
          </div>
          <div>
            {isOpenRename === name ? (
              <>
                <button disabled={name === inputTextRename} onClick={() => handleSaveRename(name)}>save</button>
                <button onClick={() => setIsOpenRename('')}>cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => handleOpenRename(name)}>rename</button>
                <button onClick={() => handleDelete(name)}>Delete</button>
              </>
            )}
          </div>
        </Wrapper>
      ))}
    </Container>
  )
}
