import { Skeleton, Tooltip } from "antd"
import { FC, memo, useState } from "react"
import { AddPostPayloadType, PostEntityType } from "../../types"
import {
  ActionsBar,
  favouriteActions,
  FlexContainer,
  SecondaryText,
  useActions,
  useAppSelector,
  useModal,
} from "../../../../common"
import { Comments } from "../comments"
import Title from "antd/lib/typography/Title"
import { postsActions, postsThunks } from "../../slice"
import { PostCard, ShowCommentsIcon } from "./styles"
import { PostForm } from "../post-form"

type PostProps = {
  post: PostEntityType
}
export const Post: FC<PostProps> = memo(({ post }) => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const isFavourite = useAppSelector((state) => state.favourite.posts[post.id])
  const isSelected = useAppSelector(
    (state) => state.posts.selectedPosts[post.id],
  )
  const user = useAppSelector((state) => state.users[post.userId])

  const { deletePost, updatePost } = useActions(postsThunks)
  const { changePostSelection } = useActions(postsActions)
  const { changePostFav } = useActions(favouriteActions)

  const { modal: deletePostModal, handleOpenModal } = useModal(
    "Удалить пост?",
    () => deletePost(post.id),
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
      <PostCard favourite={isFavourite ? "favourite" : ""}>
        <Skeleton />
      </PostCard>
    )
  }

  return (
    <PostCard favourite={isFavourite ? "favourite" : ""}>
      <ActionsBar
        selected={isSelected}
        favourite={isFavourite}
        onSelect={() => changePostSelection(post.id)}
        onFavourite={() => changePostFav(post.id)}
        onDelete={handleOpenModal}
        onEdit={() => {
          setIsEdit((prev) => !prev)
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

      <FlexContainer justifycontent={"flex-end"} padding={"5px 0 0 0"}>
        <Tooltip
          title={showComments ? "Скрыть комментарии" : "Показать комментарии"}
        >
          <ShowCommentsIcon
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
      {deletePostModal}
    </PostCard>
  )
})
