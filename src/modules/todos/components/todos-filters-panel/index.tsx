import { useState } from "react"
import {
  FilterByCompleted,
  FilterByTitle,
  FiltersCleanupButton,
  FlexContainer,
  Sorter,
} from "../../../../common"
import { Button, Tooltip } from "antd"
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons"
import { TODOS_SORT_DIRECTIONS } from "../../constants"

const selectSortOptions = [
  {
    label: "По возрастанию:",
    options: [
      { value: TODOS_SORT_DIRECTIONS.complete.asc, label: "Статусу" },
      { value: TODOS_SORT_DIRECTIONS.title.asc, label: "Названию" },
    ],
  },
  {
    label: "По убыванию:",
    options: [
      { value: TODOS_SORT_DIRECTIONS.complete.desc, label: "Статусу" },
      { value: TODOS_SORT_DIRECTIONS.title.desc, label: "Названию" },
    ],
  },
]

const selectCompleteOptions = [
  { value: true, label: "Выполнено" },
  {
    value: false,
    label: "Не выполнено",
  },
]

export const TodosFiltersPanel = () => {
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
          <FilterByTitle />
          <FilterByCompleted options={selectCompleteOptions} />
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
