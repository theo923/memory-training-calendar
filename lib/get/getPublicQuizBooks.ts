import { client } from 'lib/apollo'
import { QUIZBOOK_RANKING_FETCH_COUNT } from 'lib/data/fetch_numbers'
import { READ_PUBLIC_QUIZBOOK_QUERY } from 'lib/queries/read-public-quizbook'

export const getPublicQuizBooks = async (page: number, num?: number) => {
  try {
    const {
      data: {
        publicQuizBooks: { meta, data },
      },
    } = await client.query({
      query: READ_PUBLIC_QUIZBOOK_QUERY,
      variables: {
        start: page,
        limit: num || QUIZBOOK_RANKING_FETCH_COUNT,
      },
    })

    if (data.length > 0) {
      return {
        metadata: meta.pagination,
        publicQuizBooks: data.map((pqb: any) => {
          const item = pqb.attributes
          return {
            ...item.quizBook,
            like: item.like,
            dislike: item.dislike,
            comments: item.comments,
            publishedAt: item.publishedAt,
            __typename: item.__typename,
          }
        }),
      }
    }

    return {
      metadata: {},
      publicQuizBooks: [],
    }
  } catch (err) {
    console.log(err)
    return {
      metadata: {},
      publicQuizBooks: [],
    }
  }
}
