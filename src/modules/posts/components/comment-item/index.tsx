import { FC } from 'react'

import Title from 'antd/lib/typography/Title'

import { CommentType } from '../../types'

import { CommentCard } from './styles'

import { SecondaryText } from '@/common'

type CommentItemProps = {
  content: CommentType
}
export const Comment: FC<CommentItemProps> = ({ content }) => {
  return (
    <CommentCard>
      <Title level={5}>{content.name}</Title>
      <SecondaryText>{content.email}</SecondaryText>
      <div>{content.body}</div>
    </CommentCard>
  )
}
