import {Input, Select} from "antd"
import {useActions, useAppSelector, useDebouncedFilter,} from "../../../../common"
import {getPostsFilterByTitle, getPostsFilterByUserId, postsActions,} from "../../slice"
import {FlexContainer} from "../../../../common/styles/common-styled-components"
import {SearchOutlined} from "@ant-design/icons"
import {PostAddWithModal} from "../post-add-with-modal"
import {getUsers} from "../../../../common/slices"
import {UserType} from "../../../../common/types"

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
  const postsFilterByUserId = useAppSelector(getPostsFilterByUserId)
  const postsFilterByTitle = useAppSelector(getPostsFilterByTitle)
  const users = useAppSelector(getUsers)
  const {
    setSortingPosts,
    setFilteringPostsByUserId,
    setFilteringByTitleValue,
    setFilteringByFavourite,
  } = useActions(postsActions)

  const { filterValue, handleFilterChange } = useDebouncedFilter(
    setFilteringByTitleValue,
    postsFilterByTitle,
  )

  return (
    <FlexContainer
      gap={"10px"}
      alignitems={"center"}
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
      {/*<FlexContainer flexdirection={"column"} gap={"5px"} width={"max-content"}>*/}
      {/*  Фильтровать посты по:*/}
      {/*  <Select*/}
      {/*    allowClear*/}
      {/*    size={"small"}*/}
      {/*    style={{ width: 180 }}*/}
      {/*    onChange={setFilteringPostsField}*/}
      {/*    options={selectFilterOptions}*/}
      {/*  />*/}
      {/*</FlexContainer>*/}
      <FlexContainer gap={"5px"} flexdirection={"column"}>
        Фильтровать по:
        <FlexContainer gap={"5px"}>
          <Select
            placeholder={"Автору"}
            allowClear
            size={"small"}
            style={{ width: 350 }}
            onChange={setFilteringPostsByUserId}
            options={getSelectUserNameOptions(users)}
          />
          <Select
            placeholder={"Избранному"}
            allowClear
            size={"small"}
            style={{ width: 180 }}
            onChange={setFilteringByFavourite}
            options={selectFavouriteOptions}
          />
          <Input.Search
            size={"small"}
            placeholder={"Заголовку"}
            enterButton={<SearchOutlined />}
            value={filterValue}
            onChange={handleFilterChange}
            onSearch={setFilteringByTitleValue}
            allowClear={true}
            maxLength={50}
          />
        </FlexContainer>
      </FlexContainer>
      <PostAddWithModal />
    </FlexContainer>
  )
}
