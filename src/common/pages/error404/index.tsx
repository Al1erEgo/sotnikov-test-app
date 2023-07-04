import { FC } from 'react'

import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

import { APP_PATHS } from '@/common'

const Error404Page: FC = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Запрошенная страница в данный момент недоступна или не существует."
      extra={
        <Button onClick={() => navigate(APP_PATHS.ROOT)} type="primary">
          На главную
        </Button>
      }
    />
  )
}

export default Error404Page
