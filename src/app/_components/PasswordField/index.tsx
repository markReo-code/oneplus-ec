"use client";

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  id: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  autoComplete?: "current-password" | "new-password" | string;
};

export function PasswordField({
  id,
  name = "password",
  value,
  onChange,
  placeholder = "パスワード",
  label = "パスワード",
  required = false,
  autoComplete = "current-password",
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="formField">
      <label htmlFor={id} className="srOnly">
        {label}
      </label>
      <div className="formInputWrapper">
        <input
          className="formInput"
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-label={label}
        />
        <button
          type="button"
          onClick={togglePassword}
          aria-label={
            showPassword ? "パスワードを非表示にする" : "パスワードを表示する"
          }
          className="formToggleButton"
        >
         <Image 
           src={showPassword ? "/icon-eye_open.svg" : "/icon-eye_close.svg"}
           width={19}
           height={16}
           alt={showPassword ? "非表示アイコン" : "表示アイコン"}
         />
        </button>
      </div>
    </div>
  );
}
