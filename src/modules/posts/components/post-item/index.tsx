import { FC, memo, useState } from 'react'

import { Skeleton, Tooltip } from 'antd'
import Title from 'antd/lib/typography/Title'

import {
  postsActions,
  postsThunks,
  selectIsPostFavourite,
  selectIsPostSelected,
  selectUserByPost,
} from '../../slice'
import { AddPostPayloadType, PostEntityType } from '../../types'
import { CommentsBlock } from '../comments-block'
import { PostForm } from '../post-form'

import { PostCard, ShowCommentsIcon } from './styles'

import {
  ActionsBar,
  favouriteActions,
  FlexContainer,
  SecondaryText,
  useActions,
  useAppSelector,
  useModal,
} from '@/common'

type PostItemProps = {
  post: PostEntityType
}
export const PostItem: FC<PostItemProps> = memo(({ post }) => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const isFavourite = useAppSelector(state => selectIsPostFavourite(state, post.id))
  const isSelected = useAppSelector(state => selectIsPostSelected(state, post.id))
  const user = useAppSelector(state => selectUserByPost(state, post.userId))

  const { deletePost, updatePost } = useActions(postsThunks)
  const { changePostSelection } = useActions(postsActions)
  const { changePostFav } = useActions(favouriteActions)

  const { modal: deletePostModal, handleOpenModal } = useModal('Удалить пост?', () =>
    deletePost(post.id)
  )

  const handleFormSubmit = ({ title, userId, body }: AddPostPayloadType) => {
    if (post.title !== title || post.body !== body || post.userId !== userId)
      updatePost({
        postId: post.id,
        userId,
        title,
        body,
      })
    setIsEdit(false)
  }

  if (post.isPostLoading) {
    return (
      <PostCard favourite={isFavourite ? 'favourite' : ''}>
        <Skeleton />
      </PostCard>
    )
  }

  return (
    <PostCard favourite={isFavourite ? 'favourite' : ''}>
      <ActionsBar
        selected={isSelected}
        favourite={isFavourite}
        onSelect={() => changePostSelection(post.id)}
        onFavourite={() => changePostFav(post.id)}
        onDelete={handleOpenModal}
        onEdit={() => {
          setIsEdit(prev => !prev)
        }}
      />
      {isEdit ? (
        <PostForm
          title={post.title}
          body={post.body}
          userId={post.userId}
          onCancel={() => setIsEdit(false)}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <>
          <Title level={4}>{post.title}</Title>
          <SecondaryText>by {user?.name}</SecondaryText>
          {post.body}
        </>
      )}

      <FlexContainer justifycontent={'flex-end'} padding={'5px 0 0 0'}>
        <Tooltip title={showComments ? 'Скрыть комментарии' : 'Показать комментарии'}>
          <ShowCommentsIcon
            active={showComments ? 'active' : ''}
            onClick={() => {
              setShowComments(prev => !prev)
            }}
          />
        </Tooltip>
      </FlexContainer>

      {showComments && (
        <CommentsBlock
          content={post.comments}
          isLoading={post.isCommentsLoading}
          postId={post.id}
        />
      )}
      {deletePostModal}
    </PostCard>
  )
})
