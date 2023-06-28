import {PostAddWithModal} from "../post-add-with-modal"
import {Select} from "antd"
import {useActions} from "../../../../common"
import {postsActions} from "../../slice"

//TODO вынести значения сортировки в константы или enum

const selectOptions = [
  {
    label: "По возрастанию:",
    options: [
      { value: "asc Id", label: "ID поста" },
      { value: "asc title", label: "Заголовку" },
      { value: "asc userName", label: "Автору" },
      { value: "asc favourite", label: "Избранному" },
    ],
  },
  {
    label: "По убыванию:",
    options: [
      { value: "desc Id", label: "ID поста" },
      { value: "desc title", label: "Заголовку" },
      { value: "desc userName", label: "Автору" },
      { value: "desc favourite", label: "Избранному" },
    ],
  },
]

export const FiltersPanel = () => {
  const { setSortingPosts } = useActions(postsActions)
  return (
    <div>
      Сортировать посты по:
      <Select
        allowClear
        size={"small"}
        style={{ width: 120 }}
        onChange={setSortingPosts}
        options={selectOptions}
      />
      <PostAddWithModal />
    </div>
  )
}
