import { FC } from 'react'

import { Select, Typography } from 'antd'

import {
  filtersSortActions,
  FlexContainer,
  selectFilterByCompleted,
  useActions,
  useAppSelector,
} from '@/common'

type FilterByCompletedProps = {
  options: { value: boolean; label: string }[]
}

export const FilterByCompleted: FC<FilterByCompletedProps> = ({ options }) => {
  const filterByCompleted = useAppSelector(selectFilterByCompleted)

  const { setFilteringByCompleted } = useActions(filtersSortActions)

  return (
    <FlexContainer gap={'5px'} flexdirection={'column'}>
      <Typography.Text>Фильтровать по статусу:</Typography.Text>
      <Select
        placeholder={'Статус'}
        allowClear
        size={'small'}
        style={{ width: '90%' }}
        onChange={setFilteringByCompleted}
        options={options}
        value={filterByCompleted}
      />
    </FlexContainer>
  )
}
