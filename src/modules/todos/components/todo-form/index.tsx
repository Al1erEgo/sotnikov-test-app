import React, { FC, useEffect, useState } from "react"
import { AddTodoPayloadType } from "../../types"
import { Button, Form, Switch } from "antd"
import { FlexContainer } from "../../../../common"
import { TodoFormInput } from "./styles"

type TodoFormProps = {
  title?: string
  completed?: boolean
  onCancel: () => void
  onSubmit: ({ title, completed }: AddTodoPayloadType) => void
}
export const TodoForm: FC<TodoFormProps> = ({
  title,
  completed,
  onCancel,
  onSubmit,
}) => {
  const [submittable, setSubmittable] = useState<boolean>(false)
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)

  // const users = useAppSelector((state) => state.users)
  // const userNames = Object.values(users).map((user) => ({
  //   value: user.name,
  //   label: user.name,
  // }))

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      },
    )
  }, [values, form])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        title: title,
        completed: completed,
      }}
      onFinish={onSubmit}
    >
      <FlexContainer justifycontent={"space-between"} flexdirection={"row"}>
        <Form.Item
          label="Заголовок"
          name="title"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите заголовок!",
              max: 100,
            },
          ]}
        >
          <TodoFormInput />
        </Form.Item>
        <FlexContainer width={"20%"}>
          <Form.Item label="Статус" name="completed" valuePropName="checked">
            <Switch />
          </Form.Item>
        </FlexContainer>
      </FlexContainer>
      <Form.Item>
        <FlexContainer
          gap={"10px"}
          flexdirection={"row"}
          justifycontent={"start"}
        >
          <Button type="primary" htmlType="submit" disabled={!submittable}>
            Ок
          </Button>
          <Button onClick={onCancel}>Отменить</Button>
        </FlexContainer>
      </Form.Item>
    </Form>
  )
}
