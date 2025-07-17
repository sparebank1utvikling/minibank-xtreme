import { useEffect } from "react"

interface InputFieldProps {
  data: string
  setData: (s: string) => void
  id: string
  name: string
  placeholder: string
  answer: string
  validator: (input: string, answer: string) => boolean
  success: boolean
  successHook: (success: boolean) => void
  inputRef: React.RefObject<HTMLInputElement>
}

export const InputField = ({data, setData, id, name, placeholder, answer, validator, success, successHook, inputRef}: InputFieldProps) => {

  
  useEffect(() => {
    const correctAnswer = validator(data, answer)
    if(!success && correctAnswer) {
      successHook(true)
      setData("")
    }
    
  }, [data, answer, success])

  const handleChange = (value: string) => {
    setData(value)
  }

  return(
    <div className={"form-group"}>
      <label htmlFor={id}>PIN:</label>
      <input
        ref={inputRef}
        value={data}
        id={id}
        name={name}
        className={"faktura-spill-input-field"}
        type={"text"}
        disabled={success}
        maxLength={9}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.currentTarget.value)}
      />
    </div>
  )
}