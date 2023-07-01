import {Button, Tooltip} from "antd"
import {FilterByFavourite, FilterByUser, FiltersCleanupButton, Sorter,} from "../../index"
import {FlexContainer} from "../../styles"
import {DownCircleOutlined, UpCircleOutlined} from "@ant-design/icons"
import {useState} from "react"
import {FilterByTitle} from "../filter-by-title"

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

export const CommonFiltersPanel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
          <Sorter options={selectSortOptions} />
          <FilterByUser />
        </FlexContainer>
        <FlexContainer gap={"5px"}>
          <FilterByFavourite options={selectFavouriteOptions} />
          <FilterByTitle />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer gap={"5px"} flexdirection={"column"} width={"10%"}>
        <FiltersCleanupButton />
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
