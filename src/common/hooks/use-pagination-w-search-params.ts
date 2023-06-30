import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"

//TODO добавить проверку - если в url введены недопустимые значения, выставить дефолт
export const usePaginationWSearchParams = <T>(data: T[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  console.log("currentPage", searchParams.get("currentPage"))
  console.log("pageSize", searchParams.get("pageSize"))

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
  }, [paginationConfig])

  useEffect(() => {
    setPaginationConfig([
      Number(searchParams.get("currentPage")) || 1,
      Number(searchParams.get("pageSize")) || 10,
    ])
  }, [searchParams])

  return { currentPageContent, paginationConfig, handlePaginationChange }
}
