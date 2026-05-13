"use client";

import React, { forwardRef, useState } from "react";
import Image from "next/image";

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "className"
> & {
  id: string;
  label?: string;
};

export const PasswordField = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      name = "password",
      placeholder = "パスワード",
      label = "パスワード",
      autoComplete = "current-password",
      required = false,
      ...inputProps
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);
    return (
      <div className="formField">
        <label htmlFor={id} className="srOnly">
          {label}
        </label>

        <div className="formInputWrapper">
          <input
            ref={ref}
            className="formInput"
            id={id}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            {...inputProps}
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
  },
);

PasswordField.displayName = "PasswordField";
