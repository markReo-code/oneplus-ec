"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./index.module.css"

export function notify(message = "カートに入れました") {
    toast(message, {
        position: "top-right", // 画面上部に表示
        // autoClose: 3000, // 3秒で消える
        hideProgressBar: true, // プログレスバーを非表示
        closeOnClick: false, // クリックで閉じない
        pauseOnHover: false, // ホバー時に一時停止しない
        draggable: false, // ドラッグできない
        theme: "light", // テーマを適用
        className: styles.customToast, // カスタムCSS
    })
}

export default function CustomToast() {
    
    return (
        <>
         <ToastContainer />
        </>
    )
}