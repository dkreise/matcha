import { Input } from "./ui/Input"
import { Label } from "./ui/Label"

const InputField = ({ label, type, id, value, onChange }) => {
    return (
        <div className="mb-4">
            <Label>{label}:</Label>
            <Input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default InputField;