import { useEffect } from 'react'

import { message } from 'antd'

import { getAppErrorMessage } from '../../../app/app-selectors'
import { appActions } from '../../../app/app-slice'
import { useActions, useAppSelector } from '../../hooks'

export const ErrorPopup = () => {
  const appErrorMessage = useAppSelector(getAppErrorMessage)
  const { clearError } = useActions(appActions)

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const showError = () => {
      messageApi.open({
        type: 'error',
        content: appErrorMessage,
        duration: 5,
        onClose: clearError,
      })
    }

    if (appErrorMessage) {
      showError()
    }
  }, [appErrorMessage])

  return <>{contextHolder}</>
}
