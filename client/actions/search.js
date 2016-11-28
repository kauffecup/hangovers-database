import { stringify } from 'query-string';
import { hangoverAdapter, artistAdapter, genreAdapter } from '../normalizers/adaptFormData';
import myFetch from './myFetch';

export function searchHangovers(hangover) {
  if (!hangover) {
    return Promise.resolve({ options: [] });
  }
  return myFetch(`/search/hangovers?${stringify({ hangover: hangover.trim() })}`)
    .then(hangovers => ({ options: hangovers.map(hangoverAdapter) }));
}

export function searchArtists(artist) {
  if (!artist) {
    return Promise.resolve({ options: [] });
  }
  return myFetch(`/search/artists?${stringify({ artist: artist.trim() })}`)
    .then(hangovers => ({ options: hangovers.map(artistAdapter) }));
}

export function searchGenres(genre) {
  if (!genre) {
    return Promise.resolve({ options: [] });
  }
  return myFetch(`/search/genres?${stringify({ genre: genre.trim() })}`)
    .then(genres => ({ options: genres.map(genreAdapter) }));
}

export function searchTags(tag) {
  if (!tag) {
    return Promise.resolve({ options: [] });
  }
  return myFetch(`/search/tags?${stringify({ tag: tag.trim() })}`)
    .then(genres => ({ options: genres.map(genreAdapter) }));
}

export function arrangementExists(name) {
  return myFetch(`/arrangementexists?${stringify({ name })}`);
}
