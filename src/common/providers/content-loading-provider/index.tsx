import { FC, PropsWithChildren } from 'react'

import { StyledLoader } from '../../styles'

type ContentLoadingProviderProps = {
  isLoading: boolean
}
export const ContentLoadingProvider: FC<PropsWithChildren<ContentLoadingProviderProps>> = ({
  isLoading,
  children,
}) => {
  if (isLoading) {
    return <StyledLoader />
  }

  return <>{children}</>
}
