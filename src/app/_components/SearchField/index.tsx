"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

type Props = {
  isOpen: boolean;
}

export default function SearchField({isOpen}: Props) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null); 

  useEffect(() => {
    if (isOpen) {
      setInputValue("");
      inputRef.current?.focus();
    }
  },[isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();

       const searchQuery = inputValue.trim();
       if (!searchQuery) return;

       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="searchInput" className="srOnly">キーワードを入力</label>
        <div className={styles.search}>
          <input
            ref={inputRef}
            id="searchInput"
            type="text"
            name="q"
            placeholder="キーワードを入力"
            className={styles.searchInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn} aria-label="検索">
            <Image src="/search.svg" width={20} height={20} alt="検索" />
          </button>
        </div>
      </form>
    </>
  );
}
