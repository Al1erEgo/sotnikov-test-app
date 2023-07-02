import { FC } from 'react'

import { Select } from 'antd'

import { useActions, useAppSelector } from '../../hooks'
import { filtersSortActions, selectFilterByFavourite } from '../../slices'
import { FlexContainer } from '../../styles'

type FilterByFavouriteProps = {
  options: { value: boolean; label: string }[]
}

export const FilterByFavourite: FC<FilterByFavouriteProps> = ({ options }) => {
  const filterByFavourite = useAppSelector(selectFilterByFavourite)

  const { setFilteringByFavourite } = useActions(filtersSortActions)

  return (
    <FlexContainer gap={'5px'} flexdirection={'column'}>
      Фильтровать по избранному:
      <Select
        placeholder={'Избранному'}
        allowClear
        size={'small'}
        style={{ width: '90%' }}
        onChange={setFilteringByFavourite}
        options={options}
        value={filterByFavourite}
      />
    </FlexContainer>
  )
}
