import { NextResponse } from "next/server";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY ?? "";

const GROUPS = {
  default: "181219912219362737",        // Coaching Sorteo
  calientes: "181387617375356278",       // Coaching - Leads Calientes
  tibios: "181387623226410211",          // Coaching - Leads Tibios
} as const;

export async function POST(req: Request) {
  try {
    const { email, name, lastName, group } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const groupId = group === "calientes"
      ? GROUPS.calientes
      : group === "tibios"
        ? GROUPS.tibios
        : GROUPS.default;

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        fields: {
          name: name || "",
          last_name: lastName || "",
        },
        groups: [groupId],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
