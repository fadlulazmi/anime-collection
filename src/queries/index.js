import { gql } from '@apollo/client'

export const GET_ANIME_LIST = gql(`
query ($page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media {
      id
      title {
        english
        native
      }
      coverImage {
        medium
      }
      bannerImage
    }
  }
}`)

export const GET_ANIME_DETAIL = gql(`
query ($id: Int) { 
  Media (id: $id) {
    id
    title {
      english
      native
    }
    coverImage {
      medium
      large
    }
    bannerImage
    description
    episodes
    genres
    averageScore
    trailer {
      id
      site
      thumbnail
    }
  }
}`)