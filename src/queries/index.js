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
      }
      coverImage {
        medium
      }
      bannerImage
    }
  }
}`)