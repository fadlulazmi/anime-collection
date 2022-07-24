import styled from '@emotion/styled'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const Container = styled.div`
    border-bottom: 5px solid grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px;
    background-color: lightgrey;
    border-radius: 25px;
    position: fixed;
    top: 0;
    width: 100%;
  `

  const Button = styled.div`
    border: none;
    margin-right: 32px;
    cursor: pointer;
  `

  const Wrapper = styled.div`
    display: flex;
  `

  return (
    <Container>
      <Wrapper>
        <Button onClick={() => navigate(-1)}><b>{'<'}</b></Button>
      </Wrapper>
      <Wrapper>
        <Link to="/">
          <Button>
            Anime List
          </Button>
        </Link>
        <Link to="/collections">
          <Button>
            My Collection
          </Button>
        </Link>
      </Wrapper>
    </Container>
  )
}
