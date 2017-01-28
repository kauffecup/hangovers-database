/**
 * A fun lil helper that puts some abstraction over fetch
 */
export default function myFetch(endpoint, opts) {
  return fetch(endpoint, opts)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    });
}
