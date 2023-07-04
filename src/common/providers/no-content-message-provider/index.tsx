import { FC, PropsWithChildren } from 'react'

import { Typography } from 'antd'

import { FlexContainer } from '@/common'

type NoContentMessageProviderProps = {
  message?: string
  isContent: boolean
}

export const NoContentMessageProvider: FC<PropsWithChildren<NoContentMessageProviderProps>> = ({
  message = 'Нечего отобразить :(',
  isContent,
  children,
}) => {
  if (!isContent) {
    return (
      <FlexContainer>
        <Typography.Text>{message}</Typography.Text>
      </FlexContainer>
    )
  }

  return <>{children}</>
}
