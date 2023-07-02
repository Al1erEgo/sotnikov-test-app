import { ClearOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

import { useActions } from '../../hooks'
import { filtersSortActions } from '../../slices'

export const FiltersCleanupButton = () => {
  const { clearFiltersAndSort } = useActions(filtersSortActions)

  return (
    <Tooltip title={'Очистить фильтры'}>
      <Button shape="circle" size={'large'} onClick={() => clearFiltersAndSort()}>
        <ClearOutlined />
      </Button>
    </Tooltip>
  )
}
