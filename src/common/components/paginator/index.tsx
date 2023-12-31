import { FC } from 'react'

import { Pagination } from 'antd'
import Link from 'antd/lib/typography/Link'

import { FlexContainer } from '../../styles'

type PaginatorProps = {
  totalCount: number
  config: [number, number]
  handleChange: (page: number, pageSize: number) => void
}

export const Paginator: FC<PaginatorProps> = ({ totalCount, config, handleChange }) => {
  return (
    <FlexContainer padding={'10px'} gap={'10px'}>
      <Pagination
        onChange={handleChange}
        current={config[0]}
        pageSize={config[1]}
        total={totalCount}
        responsive
      />
      {config[1] !== totalCount ? (
        <Link onClick={() => handleChange(1, totalCount)}>Показать все</Link>
      ) : (
        <Link onClick={() => handleChange(1, 10)}>Постранично</Link>
      )}
    </FlexContainer>
  )
}
