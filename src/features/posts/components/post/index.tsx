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
import { ShowComments } from "./styles"
import { EditPostForm } from "../edit-post-form"
import { favouriteActions, usersThunks } from "../../../../common/slices"

type PostProps = {
  content: PostEntityType
}
export const Post: FC<PostProps> = memo(({ content }) => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const user = useAppSelector((state) => state.users[content.userId])
  const { deletePost, updatePost } = useActions(postsThunks)
  const { updateUserName } = useActions(usersThunks)
  const { changePostFav } = useActions(favouriteActions)

  const { modal, handleOpenModal } = useDeleteModal("пост", () =>
    deletePost(content.id),
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
    if (content.title !== title || content.body !== body)
      updatePost({
        postId: content.id,
        title,
        body,
      })
    setIsEdit(false)
  }

  if (content.isPostLoading) {
    return (
      <Card>
        <Skeleton />
      </Card>
    )
  }

  return (
    <Card>
      <ActionsGroup
        onFavourite={() => changePostFav(content.id)}
        onDelete={handleOpenModal}
        onEdit={() => {
          setIsEdit((prev) => !prev)
        }}
      />
      {isEdit ? (
        <EditPostForm
          title={content.title}
          body={content.body}
          userName={user.name}
          onCancel={() => setIsEdit(false)}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <>
          <Title level={4}>{content.title}</Title>
          <SecondaryText>by {user?.name}</SecondaryText>
          {content.body}
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
          content={content.comments}
          isLoading={content.isCommentsLoading}
          postId={content.id}
        />
      )}
      {modal}
    </Card>
  )
})
