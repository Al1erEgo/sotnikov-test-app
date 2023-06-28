import { useState } from "react"

import { Button, Modal } from "antd"
import { FlexContainer } from "../styles/common-styled-components"

export const useDeleteModal = (entity: string, handler: () => void) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const modal = (
    <Modal
      open={modalOpen}
      title={`Удалить ${entity}?`}
      footer={null}
      onCancel={() => setModalOpen(false)}
    >
      <FlexContainer
        gap={"10px"}
        flexdirection={"row"}
        justifycontent={"start"}
      >
        <Button danger onClick={handler}>
          Удалить
        </Button>
        <Button onClick={() => setModalOpen(false)}>Отмена</Button>
      </FlexContainer>
    </Modal>
  )

  return { modal, handleOpenModal }
}
