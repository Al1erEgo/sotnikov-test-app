import { Button, Tooltip } from "antd"
import { ClearOutlined } from "@ant-design/icons"
import { useActions } from "../../hooks"
import { filtersSortActions } from "../../slices"

export const FiltersCleanupButton = () => {
  const { clearFiltersAndSort } = useActions(filtersSortActions)
  return (
    <Tooltip title={"Очистить фильтры"}>
      <Button
        shape="circle"
        size={"small"}
        onClick={() => clearFiltersAndSort()}
      >
        <ClearOutlined />
      </Button>
    </Tooltip>
  )
}
