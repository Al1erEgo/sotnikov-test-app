import { Button, Tooltip } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { AddEntityButtonContainer } from "./styles"
import { FC } from "react"

type AddEntityButtonProps = {
  tooltip: string
  onClick: () => void
}
export const AddEntityButton: FC<AddEntityButtonProps> = ({
  tooltip,
  onClick,
}) => {
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
