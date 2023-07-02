import { useState } from 'react'

import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

import { COMMON_SORTING_DIRECTIONS } from '../../constants/common-sorting-directions'
import { FilterByFavourite, FilterByUser, FiltersCleanupButton, Sorter } from '../../index'
import { FlexContainer } from '../../styles'
import { FilterByTitle } from '../filter-by-title' //TODO реализовать дизейбл невозможных опций в сортировке(если нет ничего в избранном - дизейблить пункт)

//TODO реализовать дизейбл невозможных опций в сортировке(если нет ничего в избранном - дизейблить пункт)

const selectSortOptions = [
  {
    label: 'По возрастанию:',
    options: [
      { value: COMMON_SORTING_DIRECTIONS.asc.id, label: 'ID \u2191' },
      { value: COMMON_SORTING_DIRECTIONS.asc.title, label: 'Заголовку \u2191' },
      { value: COMMON_SORTING_DIRECTIONS.asc.userName, label: 'Автору \u2191' },
      { value: COMMON_SORTING_DIRECTIONS.asc.favourite, label: 'Избранному \u2191' },
    ],
  },
  {
    label: 'По убыванию:',
    options: [
      { value: COMMON_SORTING_DIRECTIONS.desc.id, label: 'ID \u2193' },
      { value: COMMON_SORTING_DIRECTIONS.desc.title, label: 'Заголовку \u2193' },
      { value: COMMON_SORTING_DIRECTIONS.desc.userName, label: 'Автору \u2193' },
      { value: COMMON_SORTING_DIRECTIONS.desc.favourite, label: 'Избранному \u2193' },
    ],
  },
]

const selectFavouriteOptions = [
  { value: true, label: 'Да' },
  {
    value: false,
    label: 'Нет',
  },
]

export const CommonFiltersPanel = () => {
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
            <FilterByUser />
          </FlexContainer>
          <FlexContainer gap={'5px'}>
            <FilterByFavourite options={selectFavouriteOptions} />
            <FilterByTitle />
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
