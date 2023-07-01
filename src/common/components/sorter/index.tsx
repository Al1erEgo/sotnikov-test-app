import { Select } from "antd"
import { FlexContainer } from "../../styles"
import { useActions, useAppSelector } from "../../hooks"
import { filtersSortActions, getSorting } from "../../slices"
import { FC } from "react"

type SorterProps = {
  options: { label: string; options: { value: string; label: string }[] }[]
}

export const Sorter: FC<SorterProps> = ({ options }) => {
  const sorting = useAppSelector(getSorting)

  const { setSorting } = useActions(filtersSortActions)

  return (
    <FlexContainer gap={"5px"} flexdirection={"column"}>
      Сортировать по:
      <Select
        allowClear
        size={"small"}
        style={{ width: "90%" }}
        onChange={setSorting}
        options={options}
        value={sorting}
      />
    </FlexContainer>
  )
}
