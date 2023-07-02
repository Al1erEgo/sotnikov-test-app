import { FC } from 'react'

import { Select, Typography } from 'antd'

import { useActions, useAppSelector } from '../../hooks'
import { filtersSortActions, selectSorting } from '../../slices'
import { FlexContainer } from '../../styles'

type SorterProps = {
  options: { label: string; options: { value: string; label: string }[] }[]
}

export const Sorter: FC<SorterProps> = ({ options }) => {
  const sorting = useAppSelector(selectSorting)

  const { setSorting } = useActions(filtersSortActions)

  return (
    <FlexContainer gap={'5px'} flexdirection={'column'}>
      <Typography.Text>Сортировать по:</Typography.Text>
      <Select
        allowClear
        size={'small'}
        style={{ width: '90%' }}
        onChange={setSorting}
        options={options}
        value={sorting}
      />
    </FlexContainer>
  )
}
