import { createClient } from "@supabase/supabase-js";

import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function createSupabaseClient(token: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  }); 
}

// GET /api/profile




export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 });
  }

  const supabase = createSupabaseClient(token);

  const {
    data: { user },

    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase

    .from("profiles")


.select("id, full_name, phone, avatar_url, penyimpanan, account_type")



    .eq("id", user.id)

    .single();

  if (profileError) {
    return NextResponse.json(
      { message: profileError.message },
      { status: 500 }
    );
  }

  return NextResponse.json(profile);
}

// PUT /api/profile

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,

  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function uploadToStorage(file: File, path: string, bucket: string) {
  const { error } = await supabaseAdmin.storage

    .from(bucket)

    .upload(path, file, {
      cacheControl: "3600",

      upsert: true,
    });

  if (error) throw new Error(error.message);

  const { publicUrl } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(path).data;

  return publicUrl;
}

export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type");

    let full_name = "", phone = "", penyimpanan = "", avatar_url = "";

    // ✨ Handle multipart/form-data
    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();
      const avatarFile = formData.get("avatar") as File;
      full_name = formData.get("full_name") as string || "";
      phone = formData.get("phone") as string || "";
      penyimpanan = formData.get("penyimpanan") as string || "";

      if (avatarFile && avatarFile.size > 0) {
        const path = `avatars/${user.id}-${Date.now()}-${avatarFile.name}`;
        avatar_url = await uploadToStorage(avatarFile, path, "smartpantry");
      }
    }
    // ✨ Handle application/json
    else if (contentType?.includes("application/json")) {
      const body = await req.json();
      full_name = body.full_name || "";
      phone = body.phone || "";
      penyimpanan = body.penyimpanan || "";
      avatar_url = body.avatar_url || ""; // optional, if sent
    }
    // ❌ Unsupported content type
    else {
      return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 415 });
    }

    const updateData: any = {
      ...(full_name && { full_name }),
      ...(phone && { phone }),
      ...(penyimpanan && { penyimpanan }),
      ...(avatar_url && { avatar_url }),
    };

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update(updateData)
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Profile updated", avatar_url }, { status: 200 });

  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }

}

