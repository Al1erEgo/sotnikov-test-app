import {Button, Input, Select, Tooltip} from "antd"
import {useActions, useAppSelector, useDebouncedFilter} from "../../index"
import {FlexContainer} from "../../styles"
import {ClearOutlined, DownCircleOutlined, SearchOutlined, UpCircleOutlined,} from "@ant-design/icons"
import {
  filtersSortActions,
  getFilterByFavourite,
  getFilterByTitle,
  getFilterByUserId,
  getSorting,
  getUsers,
} from "../../slices"
import {UserType} from "../../types"
import {useState} from "react"

//TODO вынести значения сортировки в константы или enum
//TODO реализовать дизейбл невозможных опций(если нет ничего в избранном - дизейблить пункт)

const selectSortOptions = [
  {
    label: "По возрастанию:",
    options: [
      { value: "asc Id", label: "ID" },
      { value: "asc title", label: "Заголовку" },
      { value: "asc userName", label: "Автору" },
      { value: "asc favourite", label: "Избранному" },
    ],
  },
  {
    label: "По убыванию:",
    options: [
      { value: "desc Id", label: "ID" },
      { value: "desc title", label: "Заголовку" },
      { value: "desc userName", label: "Автору" },
      { value: "desc favourite", label: "Избранному" },
    ],
  },
]

const selectFavouriteOptions = [
  { value: true, label: "Да" },
  {
    value: false,
    label: "Нет",
  },
]

const getSelectUserNameOptions = (users: { [p: string]: UserType }) => {
  return Object.values(users).map((user) => ({
    value: user.id,
    label: user.name,
  }))
}

export const FiltersPanel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const postsFilterByUserId = useAppSelector(getFilterByUserId)
  const postsFilterByTitle = useAppSelector(getFilterByTitle)
  const postsFilterByFavourite = useAppSelector(getFilterByFavourite)
  const postsSorting = useAppSelector(getSorting)

  const users = useAppSelector(getUsers)
  const {
    setSorting,
    setFilteringByUserId,
    setFilteringByTitleValue,
    setFilteringByFavourite,
    clearFiltersAndSort,
  } = useActions(filtersSortActions)

  const { filterValue, handleFilterChange } = useDebouncedFilter(
    setFilteringByTitleValue,
    postsFilterByTitle,
  )

  if (!isOpen) {
    return (
      <FlexContainer gap={"5px"}>
        <Tooltip title={"Открыть панель фильтров"}>
          <Button shape="circle" size={"small"} onClick={() => setIsOpen(true)}>
            <DownCircleOutlined />
          </Button>
        </Tooltip>
      </FlexContainer>
    )
  }

  return (
    <FlexContainer gap={"5px"}>
      <FlexContainer
        gap={"10px"}
        flexdirection={"column"}
        alignitems={"center"}
        justifycontent={"flex-start"}
        padding={"5px"}
      >
        <FlexContainer gap={"5px"}>
          <FlexContainer gap={"5px"} flexdirection={"column"}>
            Сортировать посты по:
            <Select
              allowClear
              size={"small"}
              style={{ width: "90%" }}
              onChange={setSorting}
              options={selectSortOptions}
              value={postsSorting}
            />
          </FlexContainer>
          <FlexContainer gap={"5px"} flexdirection={"column"}>
            Фильтровать по автору:
            <Select
              mode="multiple"
              placeholder={"Автору"}
              allowClear
              size={"small"}
              style={{ width: "90%" }}
              onChange={setFilteringByUserId}
              options={getSelectUserNameOptions(users)}
              value={postsFilterByUserId}
            />
          </FlexContainer>
        </FlexContainer>
        <FlexContainer gap={"5px"}>
          <FlexContainer gap={"5px"} flexdirection={"column"}>
            Фильтровать по избранному:
            <Select
              placeholder={"Избранному"}
              allowClear
              size={"small"}
              style={{ width: "90%" }}
              onChange={setFilteringByFavourite}
              options={selectFavouriteOptions}
              value={postsFilterByFavourite}
            />
          </FlexContainer>
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
        </FlexContainer>
      </FlexContainer>
      <FlexContainer gap={"5px"} flexdirection={"column"} width={"10%"}>
        <Tooltip title={"Очистить фильтры"}>
          <Button
            shape="circle"
            size={"small"}
            onClick={() => clearFiltersAndSort()}
          >
            <ClearOutlined />
          </Button>
        </Tooltip>
        <Tooltip title={"Закрыть панель фильтров"}>
          <Button
            shape="circle"
            size={"small"}
            onClick={() => setIsOpen(false)}
          >
            <UpCircleOutlined />
          </Button>
        </Tooltip>
      </FlexContainer>
    </FlexContainer>
  )
}
