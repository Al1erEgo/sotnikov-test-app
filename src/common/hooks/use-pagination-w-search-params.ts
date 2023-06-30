import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const usePaginationWSearchParams = <T>(data: T[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [paginationConfig, setPaginationConfig] = useState<[number, number]>([
    Number(searchParams.get("currentPage")) || 1,
    Number(searchParams.get("pageSize")) || 10,
  ])

  const currentPageContent = data.slice(
    paginationConfig[0] * paginationConfig[1] - paginationConfig[1],
    paginationConfig[0] * paginationConfig[1],
  )

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPaginationConfig([page, pageSize])
  }

  useEffect(() => {
    setSearchParams({
      currentPage: paginationConfig[0].toString(),
      pageSize: paginationConfig[1].toString(),
    })
  }, [paginationConfig, setSearchParams])

  return { currentPageContent, paginationConfig, handlePaginationChange }
}