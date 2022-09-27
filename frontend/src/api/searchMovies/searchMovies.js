export async function searchMovies(title){
  const response = await fetch('https://tmdb.sandbox.zoosh.ie/dev/graphql', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query SearchMovies {
        searchMovies(query: "${title}") {
          id
          name
          overview
          releaseDate
          cast {
            id
            person {
              name
            }
            role {
              ... on Cast {
                character
              }
            }
          }
        }
      }`,
    }),
  })
  .then((response) => response.json())
  .then((data) => console.log(data));
  return response;
}