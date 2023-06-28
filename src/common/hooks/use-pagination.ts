import { useState } from "react"

export const usePagination = <T>(data: T[]) => {
  const [paginationConfig, setPaginationConfig] = useState<[number, number]>([
    1, 10,
  ])

  const currentPageContent = data.slice(
    paginationConfig[0] * paginationConfig[1] - paginationConfig[1],
    paginationConfig[0] * paginationConfig[1],
  )

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPaginationConfig([page, pageSize])
  }

  return { currentPageContent, paginationConfig, handlePaginationChange }
}
