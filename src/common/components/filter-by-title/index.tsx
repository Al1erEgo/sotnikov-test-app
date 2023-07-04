import { SearchOutlined } from '@ant-design/icons'
import { Input, Typography } from 'antd'

import {
  filtersSortActions,
  FlexContainer,
  selectFilterByTitle,
  useActions,
  useAppSelector,
  useDebouncedFilter,
} from '@/common'

export const FilterByTitle = () => {
  const postsFilterByTitle = useAppSelector(selectFilterByTitle)

  const { setFilteringByTitleValue } = useActions(filtersSortActions)

  const { filterValue, handleFilterChange } = useDebouncedFilter(
    setFilteringByTitleValue,
    postsFilterByTitle
  )

  return (
    <FlexContainer gap={'5px'} flexdirection={'column'}>
      <Typography.Text>Фильтровать по заголовку:</Typography.Text>
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
