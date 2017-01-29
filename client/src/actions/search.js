import { stringify } from 'query-string';
import myFetch from './myFetch';
import {
  hangoverAdapter,
  artistAdapter,
  genreAdapter,
  arrangementAdapter,
  nonHangoverAdapter,
} from '../normalizers/adaptFormData';

export function searchHangovers(hangover) {
  if (!hangover) {
    return Promise.resolve({ options: [] });
  }
  return myFetch(`/api/search/hangovers?${stringify({ hangover: hangover.trim() })}`)
    .then(hangovers => ({ options: hangovers.map(hangoverAdapter) }));
}

export function searchArtists(artist) {
  if (!artist) {
    return Promise.resolve({ options: [] });
  }
  return myFetch(`/api/search/artists?${stringify({ artist: artist.trim() })}`)
    .then(artists => ({ options: artists.map(artistAdapter) }));
}

export function searchArrangements(arrangement) {
  if (!arrangement) {
    return Promise.resolve({ options: [] });
  }
  return myFetch(`/api/search/arrangements?${stringify({ arrangement: arrangement.trim() })}`)
    .then(arrangements => ({ options: arrangements.map(arrangementAdapter) }));
}

export function searchGenres(genre) {
  if (!genre) {
    return Promise.resolve({ options: [] });
  }
  return myFetch(`/api/search/genres?${stringify({ genre: genre.trim() })}`)
    .then(genres => ({ options: genres.map(genreAdapter) }));
}

export function searchTags(tag) {
  if (!tag) {
    return Promise.resolve({ options: [] });
  }
  return myFetch(`/api/search/tags?${stringify({ tag: tag.trim() })}`)
    .then(genres => ({ options: genres.map(genreAdapter) }));
}

export function searchNonHangovers(nonHangover) {
  if (!nonHangover) {
    return Promise.resolve({ options: [] });
  }
  return myFetch(`/api/search/nonhangovers?${stringify({ nonHangover: nonHangover.trim() })}`)
    .then(nonHangovers => ({ options: nonHangovers.map(nonHangoverAdapter) }));
}

export function arrangementExists(name) {
  return myFetch(`/api/arrangementexists?${stringify({ name })}`);
}
