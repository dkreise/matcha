import { Input } from "./ui/Input"

const InputField = ({ label, type, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">{label}:</label>
            <Input
                type={type}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default InputField;