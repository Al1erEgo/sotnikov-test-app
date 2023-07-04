import { useMemo } from 'react'

import {
  ActionCreator,
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators,
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/app/store'

const useAppDispatch: () => AppDispatch = useDispatch

export const useActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch])
}

// Types
type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key]
}

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>
