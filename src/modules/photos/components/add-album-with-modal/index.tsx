import { useState } from "react"
import { AddEntityButton, useActions } from "../../../../common"
import { Modal } from "antd"
import { photosThunks } from "../../slice"
import { AddAlbumPayloadType } from "../../types"
import { AlbumForm } from "../album-form"

export const AddAlbumWithModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { addAlbum } = useActions(photosThunks)

  const handleAddPost = (arg: AddAlbumPayloadType) => {
    addAlbum(arg)
    setModalOpen(false)
  }

  return (
    <>
      <AddEntityButton
        tooltip={"Добавить альбом"}
        onClick={() => setModalOpen(true)}
      />
      {modalOpen && (
        <Modal
          open={modalOpen}
          title={"Добавить альбом"}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <AlbumForm
            type={"new"}
            onCancel={() => setModalOpen(false)}
            onSubmit={handleAddPost}
          />
        </Modal>
      )}
    </>
  )
}
