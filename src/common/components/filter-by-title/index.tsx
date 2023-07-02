import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

import { useActions, useAppSelector, useDebouncedFilter } from '../../hooks'
import { filtersSortActions, selectFilterByTitle } from '../../slices'
import { FlexContainer } from '../../styles'

export const FilterByTitle = () => {
  const postsFilterByTitle = useAppSelector(selectFilterByTitle)

  const { setFilteringByTitleValue } = useActions(filtersSortActions)

  const { filterValue, handleFilterChange } = useDebouncedFilter(
    setFilteringByTitleValue,
    postsFilterByTitle
  )

  return (
    <FlexContainer gap={'5px'} flexdirection={'column'}>
      Фильтровать по заголовку:
      <Input.Search
        size={'small'}
        style={{ width: '90%' }}
        placeholder={'Заголовку'}
        enterButton={<SearchOutlined />}
        onChange={handleFilterChange}
        onSearch={setFilteringByTitleValue}
        allowClear={true}
        maxLength={50}
        value={filterValue}
      />
    </FlexContainer>
  )
}
