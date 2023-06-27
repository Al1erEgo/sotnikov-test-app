import { Button, Form, Input } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { FC, useEffect, useState } from "react"
import { FlexContainer } from "../../../../common/styles/common-styled-components"

type EditPostFormProps = {
  userName?: string
  title: string
  body: string
  onCancel: () => void
  onSubmit: ({
    title,
    userName,
    body,
  }: {
    title: string
    userName: string
    body: string
  }) => void
}

//TODO сделать сообщения валидации если превышено количество символов
export const EditPostForm: FC<EditPostFormProps> = ({
  userName,
  title,
  body,
  onCancel,
  onSubmit,
}) => {
  const [submittable, setSubmittable] = useState<boolean>(false)
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      },
    )
  }, [values])
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        title: title,
        userName: userName,
        body: body,
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
      <Form.Item
        label="Имя пользователя"
        name="userName"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите имя!",
            max: 40,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Пост"
        name="body"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите текст!",
          },
        ]}
      >
        <TextArea rows={4} />
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
