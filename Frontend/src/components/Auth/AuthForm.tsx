import type React from "react";
import Button from "../Common/Button";
import { useState, useEffect } from "react";

type Field = {
  name: string;
  label: string;
  type: string;
};

type FooterLink = {
  text: string;
  linkText: string;
  onClick: () => void;
};

type AuthFormProps = {
  title: string;
  fields: Field[];
  submitText: string;
  onSubmit: (data: Record<string, string>) => void;
  footerLink: FooterLink;
  error: string | null;
  isLoading?: boolean;
};

const AuthForm = ({
  title,
  fields,
  submitText,
  onSubmit,
  footerLink,
  error,
  isLoading = false,
}: AuthFormProps) => {
  const [displayError, setDisplayError] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    onSubmit(data);
  };

  useEffect(() => {
    setDisplayError(error);
    const timer = setTimeout(() => {
      setDisplayError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-[#296374] mb-8 text-center">
          {title}
        </h2>

        {fields.map((field) => (
          <div key={field.name} className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0 transition"
            />
          </div>
        ))}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#296374] text-white py-3 rounded-lg font-semibold hover:bg-[#1f4f5c] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : submitText}
        </Button>

        {footerLink && (
          <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
            {footerLink.text}{" "}
            <span
              className="text-[#296374] font-semibold cursor-pointer hover:underline"
              onClick={footerLink.onClick}
            >
              {footerLink.linkText}
            </span>
          </p>
        )}
        {displayError && (
          <p className="text-red-500 text-center mt-4">{displayError}</p>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
