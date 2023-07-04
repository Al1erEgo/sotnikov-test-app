import { Select, Typography } from 'antd'

import {
  filtersSortActions,
  FlexContainer,
  selectFilterByUserId,
  selectUsers,
  useActions,
  useAppSelector,
  UserType,
} from '@/common'

const getSelectUserNameOptions = (users: { [p: string]: UserType }) => {
  return Object.values(users).map(user => ({
    value: user.id,
    label: user.name,
  }))
}

export const FilterByUser = () => {
  const filterByUserId = useAppSelector(selectFilterByUserId)
  const users = useAppSelector(selectUsers)

  const { setFilteringByUserId } = useActions(filtersSortActions)

  return (
    <FlexContainer gap={'5px'} flexdirection={'column'}>
      <Typography.Text>Фильтровать по автору:</Typography.Text>
      <Select
        mode="multiple"
        placeholder={'Автору'}
        allowClear
        size={'small'}
        style={{ width: '90%' }}
        onChange={setFilteringByUserId}
        options={getSelectUserNameOptions(users)}
        value={filterByUserId}
      />
    </FlexContainer>
  )
}
