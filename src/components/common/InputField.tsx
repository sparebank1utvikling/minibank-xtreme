import {Dispatch, useEffect, useRef, useState } from "react"

interface InputFieldProps {
  data: string
  dataHook: Dispatch<React.SetStateAction<string>>
  id: string
  name: string
  placeholder: string
  answer: string
  validator: (input: string, answer: string) => boolean
  success: boolean
  successHook: Dispatch<React.SetStateAction<boolean>>
  inputRef: React.RefObject<HTMLInputElement>
}

export const InputField = ({data, dataHook, id, name, placeholder, answer, validator, success, successHook, inputRef}: InputFieldProps) => {
  useEffect(() => {
    if(!success && validator(data, answer)) successHook(true)
  }, [data, answer])
  return(
    <div className={"form-group"}>
      <label htmlFor={"kid"}>KID:</label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        className={"faktura-spill-input-field"}
        type={"text"}
        disabled={success}
        maxLength={9}
        placeholder={placeholder}
        onChange={(change) => {dataHook(change.currentTarget.value)}}
      />
    </div>
  )
}