import { Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  readOnly?: boolean;
}

interface FormSelectProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = ({ 
  label, 
  placeholder, 
  type = "text", 
  value, 
  onChange,
  required = false,
  className = "",
  readOnly = false
}: FormInputProps) => (
  <div className={className}>
    <Label className="block text-sm font-medium text-slate-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full border-slate-200 ${readOnly ? 'bg-slate-50 text-slate-500' : ''}`}
    />
  </div>
);

export const FormSelect = ({ 
  label, 
  options, 
  value, 
  onChange,
  placeholder = "Select an option",
  required = false,
  className = ""
}: FormSelectProps) => (
  <div className={className}>
    <Label className="block text-sm font-medium text-slate-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full border-slate-200">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="border-slate-200">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
); 