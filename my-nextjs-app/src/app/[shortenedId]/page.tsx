import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return []; // No pre-rendering, dynamic paths
}

export default async function ShortenedIdPage({
  params,
}: {
  params: { shortenedId: string };
}) {
  try {
    // Fetch original URL from the API
    const res = await fetch(
      `http://localhost:3000/api/shorten/${params.shortenedId}`
    );

    // Check if the response is successful
    if (!res.ok) {
      // If the response is not okay (e.g., 404 or 500), handle it accordingly
      return <h1>Shortened URL not found.</h1>;
    }

    const data = await res.json();

    if (data.originalUrl) {
      // Redirect to the original URL if found
      redirect(data.originalUrl);
    }
  } catch (error) {
    console.error("Error fetching shortened URL:", error);
    return <h1>Something went wrong.</h1>;
  }

  return <h1>Shortened URL not found.</h1>;
}
