import { ChangeEventHandler, useEffect, useState } from "react"

export const useDebouncedFilter = (
  onFilter: (value: string) => void,
  filterValue?: string,
) => {
  const [localFilterValue, setLocalFilterValue] = useState<string>("")

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setLocalFilterValue(e.target.value)

  useEffect(() => {
    if (!filterValue) {
      setLocalFilterValue("")
    }
  }, [filterValue])

  useEffect(() => {
    const timer = setTimeout(() => onFilter(localFilterValue), 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [localFilterValue, onFilter])

  return { filterValue: localFilterValue, handleFilterChange }
}
