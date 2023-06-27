import Link from "antd/lib/typography/Link"
import { AdaptiveFlexContainer } from "../../styles/common-styled-components"
import { FC } from "react"
import { Pagination } from "antd"

type PaginatorProps = {
  totalCount: number
  config: [number, number]
  handleChange: (page: number, pageSize: number) => void
}

export const Paginator: FC<PaginatorProps> = ({
  totalCount,
  config,
  handleChange,
}) => {
  return (
    <AdaptiveFlexContainer>
      <Pagination
        onChange={handleChange}
        current={config[0]}
        pageSize={config[1]}
        total={totalCount}
        responsive
      />
      <Link onClick={() => handleChange(1, totalCount)}>Show all posts</Link>
    </AdaptiveFlexContainer>
  )
}
