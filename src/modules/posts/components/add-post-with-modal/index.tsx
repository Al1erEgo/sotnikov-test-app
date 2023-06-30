import { Modal } from "antd"
import { useState } from "react"
import { PostForm } from "../index"
import { AddEntityButton, useActions } from "../../../../common"
import { postsThunks } from "../../slice"
import { AddPostPayloadType } from "../../types"

export const AddPostWithModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { addPost } = useActions(postsThunks)

  const handleAddPost = (arg: AddPostPayloadType) => {
    addPost(arg)
    setModalOpen(false)
  }

  return (
    <>
      <AddEntityButton
        tooltip={"Добавить пост"}
        onClick={() => setModalOpen(true)}
      />
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
    </>
  )
}
