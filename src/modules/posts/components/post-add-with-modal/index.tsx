import { Button, Modal, Tooltip } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useState } from "react"
import { PostForm } from "../post-form"
import { useActions } from "../../../../common"
import { postsThunks } from "../../slice"
import { AddPostPayloadType } from "../../types/posts-payloads"
import { PostAddWithModalContainer } from "./styles"

export const PostAddWithModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { addPost } = useActions(postsThunks)

  const handleAddPost = (arg: AddPostPayloadType) => {
    addPost(arg)
    setModalOpen(false)
  }

  return (
    <PostAddWithModalContainer>
      <Tooltip title={"Добавить пост"}>
        <Button
          type="primary"
          shape="circle"
          onClick={() => setModalOpen(true)}
        >
          <PlusOutlined />
        </Button>
      </Tooltip>
      {modalOpen && (
        <Modal
          open={modalOpen}
          title={"Добавить новый пост"}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <PostForm
            type={"new"}
            onCancel={() => setModalOpen(false)}
            onSubmit={handleAddPost}
          />
        </Modal>
      )}
    </PostAddWithModalContainer>
  )
}
