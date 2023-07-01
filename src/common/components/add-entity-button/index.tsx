import { FC } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

import { AddEntityButtonContainer } from './styles'

type AddEntityButtonProps = {
  tooltip: string
  onClick: () => void
}
export const AddEntityButton: FC<AddEntityButtonProps> = ({ tooltip, onClick }) => {
  return (
    <AddEntityButtonContainer>
      <Tooltip title={tooltip}>
        <Button type="primary" shape="circle" onClick={onClick}>
          <PlusOutlined />
        </Button>
      </Tooltip>
    </AddEntityButtonContainer>
  )
}
