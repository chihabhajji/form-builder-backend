interface Field {
  name: string;
  label: string;
  component: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  multiple?: boolean;
  accept?: string;
  min?: string;
  max?: string;
}