
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      if (!env.TMDB_API_KEY) {
        return Response.json(
          { status_message: "TMDB API key is not configured" },
          { status: 503 }
        );
      }

      const target = new URL(
        "https://api.themoviedb.org/3/" +
        url.pathname.slice(5)
      );

      target.search = url.search;
      target.searchParams.set("api_key", env.TMDB_API_KEY);

      const response = await fetch(target, {
        headers: { accept: "application/json" }
      });

      return new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
