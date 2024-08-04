import React from "react";
import { FieldError } from "react-hook-form";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: FieldError;
}

export const TextArea: React.FC<TextAreaProps> = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({label, error, ...params}, ref) => {
    return (
        <div>
            <label htmlFor={params.id} className="text-xs text-gray-500 font-semibold">{label}</label>
            <textarea ref={ref} {...params} className={`w-full p-2 bg-gray-100 rounded-md ${error ? "ring-2 ring-red-500" : ""}`} rows={6} aria-invalid={error ? "true" : "false"}/>
            {
                error && (
                    <p className="text-xs text-red-500">{error.type === "required" ? "Required" : error.message}</p>
                )
            }
        </div>
    )
})