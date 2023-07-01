import { Select } from "antd"
import { FlexContainer } from "../../styles"
import { useActions, useAppSelector } from "../../hooks"
import { filtersSortActions, getFilterByFavourite } from "../../slices"
import { FC } from "react"

type FilterByFavouriteProps = {
  options: { value: boolean; label: string }[]
}

export const FilterByFavourite: FC<FilterByFavouriteProps> = ({ options }) => {
  const postsFilterByFavourite = useAppSelector(getFilterByFavourite)

  const { setFilteringByFavourite } = useActions(filtersSortActions)
  return (
    <FlexContainer gap={"5px"} flexdirection={"column"}>
      Фильтровать по избранному:
      <Select
        placeholder={"Избранному"}
        allowClear
        size={"small"}
        style={{ width: "90%" }}
        onChange={setFilteringByFavourite}
        options={options}
        value={postsFilterByFavourite}
      />
    </FlexContainer>
  )
}
