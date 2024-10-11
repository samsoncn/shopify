import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// In-memory database to store URL mappings
const urlDatabase: { [key: string]: string } = {};

// POST /api/shorten
export async function POST(req: Request) {
  const { originalUrl } = await req.json();

  if (!originalUrl) {
    return NextResponse.json(
      { error: "Please provide a valid URL" },
      { status: 400 }
    );
  }

  // Generate a unique identifier using UUID
  const shortenedId = uuidv4().slice(0, 8); // Shorten UUID
  const shortenedUrl = `http://localhost:3000/${shortenedId}`;

  // Store the mapping in memory (in a real app, use a database)
  urlDatabase[shortenedId] = originalUrl;

  // Return the shortened URL in the response
  return NextResponse.json({ originalUrl, shortenedUrl });
}

// GET /api/redirect/:id
export async function GET(req: Request) {
  const url = new URL(req.url);
  const shortenedId = url.pathname.split("/").pop(); // Extract shortened ID from the path

  const originalUrl = urlDatabase[shortenedId || ""];

  if (originalUrl) {
    console.log(`Redirecting to: ${originalUrl}`);
    return NextResponse.redirect(originalUrl);
  }

  return NextResponse.json(
    { error: "Shortened URL not found" },
    { status: 404 }
  );
}
