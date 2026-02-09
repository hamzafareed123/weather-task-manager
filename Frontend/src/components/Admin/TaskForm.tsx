import { X } from "lucide-react";
import Button from "../Common/Button";
import InputField from "../Common/InputField";
import React from "react";

type Field = {
  name: string;
  label: string;
  type: string;
  options?: string[];
};

type TaskFormProps = {
  title: string;
  fields: Field[];
  submitText: string;
  onSubmit: (data: Record<string, string>) => void;
  error: string | null;
  isLoading?: boolean;
  onClose?: () => void;
};

const TaskForm = ({
  title,
  fields,
  submitText,
  onSubmit,
  error,
  isLoading,
  onClose,
}: TaskFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <X
            className=" text-gray-500 hover:text-gray-800 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              {field.type === "select" ? (
                <>
                  <label
                    htmlFor={field.name}
                    className="mb-1 text-gray-700 font-medium"
                  >
                    {field.label}
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <InputField
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  onChange={(e) => {
                    console.log(
                      "Input changed:",
                      e.target.name,
                      e.target.value,
                    );
                  }}
                />
              )}
            </div>
          ))}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 btn primary"
          >
            {submitText}
          </Button>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
