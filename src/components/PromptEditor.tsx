import type { PromptEditorType } from "@/types/all-types"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"


const PromptEditor = ({ id, label, placeholder, value, onChange, onApply }: PromptEditorType) => {
  return (
    <div>
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      <Textarea id={id} placeholder={placeholder} className="mt-2" value={value} onChange={(e) => onChange(e.currentTarget.value)} />

      <Button size='sm' variant='secondary' className="mt-3 w-full" onClick={onApply} disabled={!value.trim()}>
          Apply Changes
      </Button>
    </div>
  )
}

export default PromptEditor