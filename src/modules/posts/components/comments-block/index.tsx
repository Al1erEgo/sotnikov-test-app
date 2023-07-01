import { FC, useEffect } from 'react'

import { Skeleton } from 'antd'

import { FlexContainer, useActions } from '../../../../common'
import { postsThunks } from '../../slice'
import { CommentType } from '../../types'
import { Comment } from '../comment-item'

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
      {content?.map(comment => (
        <Comment key={comment.id} content={comment} />
      ))}
    </FlexContainer>
  )
}
