import { useState } from 'react'

import { Modal } from 'antd'

import { todosThunks } from '../../slice'
import { AddTodoPayloadType } from '../../types'
import { TodoForm } from '../todo-form'

import { AddEntityButton, useActions } from '@/common'

export const AddTodoButtonWithModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { addTodo } = useActions(todosThunks)

  const handleAddTodo = (arg: AddTodoPayloadType) => {
    addTodo(arg)
    setModalOpen(false)
  }

  return (
    <>
      <AddEntityButton tooltip={'Добавить задачу'} onClick={() => setModalOpen(true)} />
      {modalOpen && (
        <Modal
          open={modalOpen}
          title={'Добавить задачу'}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <TodoForm onCancel={() => setModalOpen(false)} onSubmit={handleAddTodo} />
        </Modal>
      )}
    </>
  )
}
