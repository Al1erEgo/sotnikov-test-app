import { useState } from 'react'

import { Modal } from 'antd'

import { postsThunks } from '../../slice'
import { AddPostPayloadType } from '../../types'
import { PostForm } from '../index'

import { AddEntityButton, useActions } from '@/common'

export const AddPostButtonWithModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { addPost } = useActions(postsThunks)

  const handleAddPost = (arg: AddPostPayloadType) => {
    addPost(arg)
    setModalOpen(false)
  }

  return (
    <>
      <AddEntityButton tooltip={'Добавить пост'} onClick={() => setModalOpen(true)} />
      {modalOpen && (
        <Modal
          open={modalOpen}
          title={'Добавить новый пост'}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <PostForm onCancel={() => setModalOpen(false)} onSubmit={handleAddPost} />
        </Modal>
      )}
    </>
  )
}
