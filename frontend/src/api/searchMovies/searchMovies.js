export async function searchMovies(title){
  const response = await fetch('https://tmdb.sandbox.zoosh.ie/dev/graphql', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query SearchMovies {
        searchMovies(query: "${title}") {
          name
          genres {name}
          score
        }
      }`,
    }),
  })
  .then((response) => response.json())
  .then((data) => (data));
  return response;
}