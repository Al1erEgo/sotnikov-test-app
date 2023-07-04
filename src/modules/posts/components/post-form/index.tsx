import { FC } from 'react'

import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

import { AddPostPayloadType } from '../../types'

import { FlexContainer, selectUsersNames, useAppSelector, useCustomForm } from '@/common'

type PostFormProps = {
  userId?: number
  title?: string
  body?: string
  onCancel: () => void
  onSubmit: ({ title, userId, body }: AddPostPayloadType) => void
}

//TODO сделать сообщения валидации если превышено количество символов
export const PostForm: FC<PostFormProps> = ({ userId, title, body, onCancel, onSubmit }) => {
  const { form, submittable } = useCustomForm()

  const usersNames = useAppSelector(selectUsersNames)
  const usersNamesSelectOptions = usersNames.map(user => ({
    value: user.id,
    label: user.name,
  }))

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
        <Select options={usersNamesSelectOptions} />
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
