import { FC } from 'react'

import { Select } from 'antd'

import { useActions, useAppSelector } from '../../hooks'
import { filtersSortActions, getFilterByCompleted } from '../../slices'
import { FlexContainer } from '../../styles'

type FilterByCompletedProps = {
  options: { value: boolean; label: string }[]
}

export const FilterByCompleted: FC<FilterByCompletedProps> = ({ options }) => {
  const filterByCompleted = useAppSelector(getFilterByCompleted)

  const { setFilteringByCompleted } = useActions(filtersSortActions)

  return (
    <FlexContainer gap={'5px'} flexdirection={'column'}>
      Фильтровать по статусу:
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
