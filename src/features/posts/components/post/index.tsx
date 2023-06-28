import { Card, Skeleton, Tooltip } from "antd"
import { FC, memo, useState } from "react"
import { PostEntityType } from "../../types"
import { useActions, useAppSelector, useDeleteModal } from "../../../../common"
import { Comments } from "../comments"
import {
  FlexContainer,
  SecondaryText,
} from "../../../../common/styles/common-styled-components"
import Title from "antd/lib/typography/Title"
import { ActionsGroup } from "../actions-group"
import { postsThunks } from "../../slice"
import { PostCard, ShowComments } from "./styles"
import { EditPostForm } from "../edit-post-form"
import { favouriteActions, usersThunks } from "../../../../common/slices"

type PostProps = {
  post: PostEntityType
}
export const Post: FC<PostProps> = memo(({ post }) => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const isFavourite = useAppSelector((state) => state.favorite.postsId[post.id])
  const user = useAppSelector((state) => state.users[post.userId])
  const { deletePost, updatePost } = useActions(postsThunks)
  const { updateUserName } = useActions(usersThunks)
  const { changePostFav } = useActions(favouriteActions)

  const { modal, handleOpenModal } = useDeleteModal("пост", () =>
    deletePost(post.id),
  )

  const handleFormSubmit = ({
    title,
    userName,
    body,
  }: {
    title: string
    userName: string
    body: string
  }) => {
    if (user.name !== userName) {
      updateUserName({ userName, userId: user.id })
    }
    if (post.title !== title || post.body !== body)
      updatePost({
        postId: post.id,
        title,
        body,
      })
    setIsEdit(false)
  }

  if (post.isPostLoading) {
    return (
      <Card>
        <Skeleton />
      </Card>
    )
  }

  return (
    <PostCard favourite={isFavourite ? "favourite" : ""}>
      <ActionsGroup
        favourite={isFavourite}
        onFavourite={() => changePostFav(post.id)}
        onDelete={handleOpenModal}
        onEdit={() => {
          setIsEdit((prev) => !prev)
        }}
      />
      {isEdit ? (
        <EditPostForm
          title={post.title}
          body={post.body}
          userName={user.name}
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

      <FlexContainer justifycontent={"flex-end"} padding={"5px 0 0 0"}>
        <Tooltip
          title={showComments ? "Скрыть комментарии" : "Показать комментарии"}
        >
          <ShowComments
            active={showComments ? "active" : ""}
            onClick={() => {
              setShowComments((prev) => !prev)
            }}
          />
        </Tooltip>
      </FlexContainer>

      {showComments && (
        <Comments
          content={post.comments}
          isLoading={post.isCommentsLoading}
          postId={post.id}
        />
      )}
      {modal}
    </PostCard>
  )
})
