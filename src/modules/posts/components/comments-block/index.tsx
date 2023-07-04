import { FC, useEffect } from 'react'

import { Skeleton } from 'antd'

import { postsThunks } from '../../slice'
import { CommentType } from '../../types'
import { Comment } from '../comment-item'

import { FlexContainer, NoContentMessageProvider, useActions } from '@/common'

type CommentsBlockProps = {
  content?: CommentType[]
  isLoading: boolean
  postId: number
}

export const CommentsBlock: FC<CommentsBlockProps> = ({ content, isLoading, postId }) => {
  const { fetchComments } = useActions(postsThunks)

  useEffect(() => {
    fetchComments(postId)
  }, [])

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <FlexContainer flexdirection={'column'} alignitems={'flex-start'} gap={'5px'} padding={'5px'}>
      <NoContentMessageProvider message={'Комментариев нет :('} isContent={!!content?.length}>
        {content?.map(comment => (
          <Comment key={comment.id} content={comment} />
        ))}
      </NoContentMessageProvider>
    </FlexContainer>
  )
}
