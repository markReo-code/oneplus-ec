import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            //クッキーの取得方法を定義
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                //setAll() でクッキーを更新 (リクエストの cookiesToSet に入っているクッキーを、request.cookies にセット)
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value}) => 
                        request.cookies.set(name, value)
                    )
                    // supabaseResponse を更新
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    //ブラウザにクッキーを返す
                    cookiesToSet.forEach(({name, value, options}) => 
                      supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )
    // 現在のユーザーを取得（認証トークンをリフレッシュ）
    await supabase.auth.getUser();

     // 更新されたレスポンスを返す
    return supabaseResponse;
}

