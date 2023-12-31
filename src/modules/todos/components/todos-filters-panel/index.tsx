import { useState } from 'react'

import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

import { TODOS_SORTING_DIRECTIONS } from '../../constants'

import {
  FilterByCompleted,
  FilterByTitle,
  FiltersCleanupButton,
  FlexContainer,
  Sorter,
} from '@/common'

const selectSortOptions = [
  {
    label: 'По возрастанию:',
    options: [
      { value: TODOS_SORTING_DIRECTIONS.asc.complete, label: 'Статусу \u2191' },
      { value: TODOS_SORTING_DIRECTIONS.asc.title, label: 'Названию \u2191' },
    ],
  },
  {
    label: 'По убыванию:',
    options: [
      { value: TODOS_SORTING_DIRECTIONS.desc.complete, label: 'Статусу \u2193' },
      { value: TODOS_SORTING_DIRECTIONS.desc.title, label: 'Названию \u2193' },
    ],
  },
]

const selectCompleteOptions = [
  { value: true, label: 'Выполнено' },
  {
    value: false,
    label: 'Не выполнено',
  },
]

export const TodosFiltersPanel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (!isOpen) {
    return (
      <FlexContainer gap={'5px'}>
        <Tooltip title={'Открыть панель фильтров'}>
          <Button shape="circle" size={'small'} onClick={() => setIsOpen(true)}>
            <DownCircleOutlined />
          </Button>
        </Tooltip>
      </FlexContainer>
    )
  }

  return (
    <FlexContainer flexdirection={'column'}>
      <FlexContainer gap={'5px'}>
        <FlexContainer
          gap={'10px'}
          flexdirection={'column'}
          alignitems={'center'}
          justifycontent={'flex-start'}
          padding={'5px'}
        >
          <FlexContainer gap={'5px'}>
            <Sorter options={selectSortOptions} />
            <FilterByTitle />
            <FilterByCompleted options={selectCompleteOptions} />
          </FlexContainer>
        </FlexContainer>
        <FlexContainer gap={'5px'} flexdirection={'column'} width={'10%'}>
          <FiltersCleanupButton />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer padding={'10px'}>
        <Tooltip title={'Закрыть панель фильтров'}>
          <Button shape="circle" size={'small'} onClick={() => setIsOpen(false)}>
            <UpCircleOutlined />
          </Button>
        </Tooltip>
      </FlexContainer>
    </FlexContainer>
  )
}
