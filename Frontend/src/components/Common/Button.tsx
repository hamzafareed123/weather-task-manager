import type React from "react";
import "../../styles/button.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
