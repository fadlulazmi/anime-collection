import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Pagination(props) {
  const [pages, setPages] = useState([])
  const {
    currentPage,
    hasNextPage,
    lastPage,
    total
  } = props

  useEffect(() => {
    let arr = []
    if(currentPage === 1) {
      arr = [1, 2, 3]
    } else if(currentPage === lastPage){
      arr = [currentPage-2, currentPage-1, currentPage]
    } else {
      arr = [currentPage-1, currentPage, currentPage+1]
    }
    setPages(arr)
  }, [currentPage, lastPage])

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  const ActivePage = styled.button`
    background-color: lightblue;
    pointer-events: none;
  `

  const Info = styled.small`
    text-align: center;
  `

  const initalIndex = currentPage === 1 ? '1' : `${currentPage-1}1` 
  const lastIndex = `${currentPage}0`

  return (
    <Container>
      <div>
        {currentPage > 1 && (
          <Link to={`/?page=${currentPage-1}`}>
            <button>{'<'}</button>
          </Link>
        )}
        {pages.map(page => (
          <Link to={`/?page=${page}`}>
            {page === currentPage ? (
              <ActivePage>{page}</ActivePage>
            ) : (
              <button>{page}</button>
            )}
          </Link>
        ))}
        {hasNextPage && (
          <Link to={`/?page=${currentPage+1}`}>
            <button>{'>'}</button>
          </Link>
        )}
      </div>
      <Info>{initalIndex} - {lastIndex} of {total}</Info>
    </Container>
  )
}
