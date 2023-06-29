import {Input, Select} from "antd"
import {useActions, useDebouncedFilter} from "../../../../common"
import {postsActions} from "../../slice"
import {FlexContainer} from "../../../../common/styles/common-styled-components"
import {useState} from "react"
import {FilterFields} from "../../enums"
import {SearchOutlined} from "@ant-design/icons"
import {PostAddWithModal} from "../post-add-with-modal"

//TODO вынести значения сортировки в константы или enum

const selectSortOptions = [
  {
    label: "По возрастанию:",
    options: [
      { value: "asc Id", label: "ID поста" },
      { value: "asc title", label: "Заголовку" },
      { value: "asc userName", label: "Автору" },
      { value: "asc favourite", label: "Избранному" },
    ],
  },
  {
    label: "По убыванию:",
    options: [
      { value: "desc Id", label: "ID поста" },
      { value: "desc title", label: "Заголовку" },
      { value: "desc userName", label: "Автору" },
      { value: "desc favourite", label: "Избранному" },
    ],
  },
]

const selectFilterOptions = [
  { value: FilterFields.title, label: "Заголовку" },
  {
    value: FilterFields.userName,
    label: "Автору",
  },
  { value: FilterFields.favourite, label: "Избранному" },
]

export const FiltersPanel = () => {
  const [filterField, setFilterField] = useState<FilterFields | "">("")
  const { setSortingPosts, setFilteringPosts } = useActions(postsActions)

  const { filterValue, handleFilterChange } = useDebouncedFilter(
    (value: string) =>
      setFilteringPosts(filterValue && filterField + " " + value),
  )

  return (
    <FlexContainer
      gap={"10px"}
      alignitems={"flex-end"}
      justifycontent={"flex-start"}
    >
      <FlexContainer flexdirection={"column"} gap={"5px"} width={"max-content"}>
        Сортировать посты по:
        <Select
          allowClear
          size={"small"}
          style={{ width: 180 }}
          onChange={setSortingPosts}
          options={selectSortOptions}
        />
      </FlexContainer>
      <FlexContainer flexdirection={"column"} gap={"5px"} width={"max-content"}>
        Фильтровать посты по:
        <Select
          allowClear
          size={"small"}
          style={{ width: 180 }}
          onChange={setFilterField}
          options={selectFilterOptions}
        />
      </FlexContainer>
      <FlexContainer flexdirection={"column"} gap={"5px"}>
        <Input.Search
          size={"small"}
          placeholder={"Фильтр"}
          enterButton={<SearchOutlined />}
          value={filterValue}
          onChange={handleFilterChange}
          onSearch={() =>
            setFilteringPosts(filterValue && filterField + " " + filterValue)
          }
          allowClear={true}
          maxLength={50}
        />
      </FlexContainer>
      <PostAddWithModal />
    </FlexContainer>
  )
}
