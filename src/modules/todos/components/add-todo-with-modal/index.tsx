import { useState } from "react"
import { AddEntityButton, useActions } from "../../../../common"
import { Modal } from "antd"
import { AddTodoPayloadType } from "../../types"
import { todosThunks } from "../../slice"
import { TodoForm } from "../todo-form"

export const AddTodoWithModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { addTodo } = useActions(todosThunks)

  const handleAddTodo = (arg: AddTodoPayloadType) => {
    addTodo(arg)
    setModalOpen(false)
  }

  return (
    <>
      <AddEntityButton
        tooltip={"Добавить задачу"}
        onClick={() => setModalOpen(true)}
      />
      {modalOpen && (
        <Modal
          open={modalOpen}
          title={"Добавить задачу"}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <TodoForm
            onCancel={() => setModalOpen(false)}
            onSubmit={handleAddTodo}
          />
        </Modal>
      )}
    </>
  )
}
