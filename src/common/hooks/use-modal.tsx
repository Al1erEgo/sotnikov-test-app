import { useState } from 'react'

import { Button, Modal } from 'antd'

import { FlexContainer } from '@/common'

export const useModal = (message: string, action: () => void) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleAction = () => {
    setModalOpen(false)
    action()
  }

  const modal = (
    <Modal open={modalOpen} title={message} footer={null} onCancel={() => setModalOpen(false)}>
      <FlexContainer gap={'10px'} flexdirection={'row'} justifycontent={'start'}>
        <Button danger onClick={handleAction}>
          {message.split(' ')[0]}
        </Button>
        <Button onClick={() => setModalOpen(false)}>Отмена</Button>
      </FlexContainer>
    </Modal>
  )

  return { modal, handleOpenModal }
}
