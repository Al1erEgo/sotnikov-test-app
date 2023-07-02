import { useEffect, useState } from 'react'

import { Form } from 'antd'

export const useCustomForm = () => {
  const [submittable, setSubmittable] = useState<boolean>(false)
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      }
    )
  }, [values, form])

  return { form, submittable }
}
