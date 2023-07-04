import { ClearOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

import { filtersSortActions, useActions } from '@/common'

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
