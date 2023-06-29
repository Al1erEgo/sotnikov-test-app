import { ChangeEventHandler, useEffect, useState } from "react"

export const useDebouncedFilter = (onFilter: (value: string) => void) => {
  const [filterValue, setFilterValue] = useState<string>("")

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFilterValue(e.target.value)

  // debounce search input
  useEffect(() => {
    const timer = setTimeout(() => onFilter(filterValue), 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [filterValue, onFilter])

  return { filterValue, handleFilterChange }
}
