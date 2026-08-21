import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, selectedOption, note } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const optionTextMap: Record<string, string> = {
      mvp: "Build an MVP",
      improve: "Improve a product",
      ai: "Explore AI",
      something_else: "Something else",
    };

    const projectCategory = optionTextMap[selectedOption] || selectedOption || "General Inquiry";

    // Send email via FormSubmit AJAX service directly to user's inbox
    const targetEmail = process.env.CONTACT_EMAIL || "abhishekkr.ssh@gmail.com";
    const reqReferer = req.headers.get("referer") || "http://localhost:3000";
    const reqOrigin = req.headers.get("origin") || "http://localhost:3000";

    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": reqReferer,
        "Origin": reqOrigin,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        email: email,
        _subject: `Portfolio Lead: ${projectCategory}`,
        _template: "table",
        _captcha: "false",
        Category: projectCategory,
        Note: note || "No note provided.",
      }),
    });

    const responseText = await response.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    if (!response.ok) {
      console.warn("FormSubmit response not OK:", response.status, responseText);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
