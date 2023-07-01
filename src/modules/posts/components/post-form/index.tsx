import { FC, useEffect, useState } from 'react'

import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

import { FlexContainer, useAppSelector } from '../../../../common'
import { AddPostPayloadType } from '../../types'

type PostFormProps = {
  userId?: number
  title?: string
  body?: string
  onCancel: () => void
  onSubmit: ({ title, userId, body }: AddPostPayloadType) => void
}

//TODO сделать сообщения валидации если превышено количество символов
//TODO посмотреть можно ли вынести отдельные инпуты формы в компоненты
export const PostForm: FC<PostFormProps> = ({ userId, title, body, onCancel, onSubmit }) => {
  //TODO вынести в отдельный хук useForm

  const [submittable, setSubmittable] = useState<boolean>(false)
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)

  const users = useAppSelector(state => state.users)
  const userNames = Object.values(users).map(user => ({
    value: user.id,
    label: user.name,
  }))

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      }
    )
  }, [values, form])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        title: title,
        userId: userId,
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
            message: 'Пожалуйста, введите заголовок!',
            max: 100,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Имя пользователя"
        name="userId"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, выберите имя!',
          },
        ]}
      >
        <Select options={userNames} />
      </Form.Item>
      <Form.Item
        label="Пост"
        name="body"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите текст!',
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <FlexContainer gap={'10px'} flexdirection={'row'} justifycontent={'start'}>
          <Button type="primary" htmlType="submit" disabled={!submittable}>
            Ок
          </Button>
          <Button onClick={onCancel}>Отменить</Button>
        </FlexContainer>
      </Form.Item>
    </Form>
  )
}
