import { FC } from 'react'

import { Button, Form, Input, Select } from 'antd'

import { FlexContainer, selectUsersNames, useAppSelector, useCustomForm } from '../../../../common'
import { AlbumPayloadType } from '../../types'

type AlbumFormProps = {
  userId?: number
  title?: string
  onCancel: () => void
  onSubmit: ({ title, userId }: AlbumPayloadType) => void
}

export const AlbumForm: FC<AlbumFormProps> = ({ userId, title, onCancel, onSubmit }) => {
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
      initialValues={{ title: title, userId: userId }}
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
