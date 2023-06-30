import React, { FC, useEffect, useState } from "react"
import { AddTodoPayloadType } from "../../types"
import { Button, Form, Input, Switch } from "antd"
import { FlexContainer } from "../../../../common"

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
        <Input />
      </Form.Item>
      <Form.Item label="Статус" name="completed" valuePropName="checked">
        Не выполнено <Switch /> Выполнено
      </Form.Item>
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
