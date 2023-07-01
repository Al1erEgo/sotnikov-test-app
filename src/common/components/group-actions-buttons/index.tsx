import { FC } from 'react'

import { CloseOutlined, HeartFilled } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

import { PostsGroupActionsContainer } from './styles'

type GroupActionsButtonsProps = {
  onDelete?: () => void
  onAddFav?: () => void
}

export const GroupActionsButtons: FC<GroupActionsButtonsProps> = ({ onDelete, onAddFav }) => {
  return (
    <PostsGroupActionsContainer>
      {onAddFav && (
        <Tooltip title={'Добавить в избранное'}>
          <Button type="primary" shape="circle" onClick={onAddFav}>
            <HeartFilled />
          </Button>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={'Удалить выбранные'}>
          <Button type="primary" shape="circle" danger onClick={onDelete}>
            <CloseOutlined />
          </Button>
        </Tooltip>
      )}
    </PostsGroupActionsContainer>
  )
}
