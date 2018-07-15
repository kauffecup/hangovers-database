/**
 * A fun lil helper that puts some abstraction over fetch
 */
export default function myFetch(endpoint, opts) {
  return fetch(endpoint, {
    ...opts,
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    });
}
