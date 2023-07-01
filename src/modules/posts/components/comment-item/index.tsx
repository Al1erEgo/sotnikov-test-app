import { FC } from 'react'

import Title from 'antd/lib/typography/Title'

import { SecondaryText } from '../../../../common'
import { CommentType } from '../../types'

import { CommentCard } from './styles'

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
