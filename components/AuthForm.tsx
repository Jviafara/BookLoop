'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, DefaultValues, FieldValues } from 'react-hook-form'
import { ZodType } from 'zod'

interface Props<T extends FieldValues> {
  type: 'SIGN_IN' | 'SIGN_UP'
  schema: ZodType<T, FieldValues>
  defaultValues: T
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }> | void
}

const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const handleSubmit: SubmitHandler<T> = async data => {
    // Do something with the form values.
    console.log(data)
  }

  return <div>AuthForm -- {type}</div>
}

export default AuthForm
