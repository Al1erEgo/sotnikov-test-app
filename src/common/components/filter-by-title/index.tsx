import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { FlexContainer } from "../../styles"
import { useActions, useAppSelector, useDebouncedFilter } from "../../hooks"
import { filtersSortActions, getFilterByTitle } from "../../slices"

export const FilterByTitle = () => {
  const postsFilterByTitle = useAppSelector(getFilterByTitle)

  const { setFilteringByTitleValue } = useActions(filtersSortActions)

  const { filterValue, handleFilterChange } = useDebouncedFilter(
    setFilteringByTitleValue,
    postsFilterByTitle,
  )

  return (
    <FlexContainer gap={"5px"} flexdirection={"column"}>
      Фильтровать по заголовку:
      <Input.Search
        size={"small"}
        style={{ width: "90%" }}
        placeholder={"Заголовку"}
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