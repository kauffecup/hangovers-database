export const activeAdapter = a =>
  a && typeof a === 'boolean' ? 'yes' : 'no';

export const albumFormatter = (a = {}, y = '') => `${a.name} ${y}`.trim();

export const albumAdapter = (a = {}, sMap = {}) => ({
  value: a._id, label: albumFormatter(a, sMap && sMap[a.semester] ? sMap[a.semester].year : ''),
});

export const arrangementTypeAdapter = (at = {}) => ({
  value: at._id, label: `${at.name} (${at.description})`,
});

export const artistFormatter = (a = {}) => a.name;

export const artistAdapter = (a = {}) => ({
  value: a._id, label: artistFormatter(a),
});

export const attatchmentAdapter = (a = {}, type = '') => {
  for (const attachment of Object.keys(a)) {
    const split = (attachment || '').split('.');
    if (split.length && split[split.length - 1] === type) {
      return {
        name: attachment,
        type: a[attachment].content_type,
        size: a[attachment].length,
        inCloudant: true,
      };
    }
  }
  return null;
};

export const concertFormatter = (c = {}, y = '') => `${c.name} ${y}`.trim();

export const concertAdapter = (c = {}, sMap = {}) => ({
  value: c._id, label: concertFormatter(c, sMap && sMap[c.semester] ? sMap[c.semester].year : ''),
});

export const genreAdapter = (g = {}) => ({
  value: g._id, label: `${g.name}`,
});

export const hangoverFormatter = (h = {}) => `${h.firstName} ${h.lastName}`;

export const hangoverAdapter = (h = {}) => ({
  value: h._id, label: hangoverFormatter(h),
});

export const keyFormatter = (k = {}) => `${k.name} ${k.tonality}`;

export const keyAdapter = (k = {}) => ({
  value: k._id, label: keyFormatter(k),
});

export const semesterFormatter = (s = {}) => `${s.semester_type} ${s.year}`;

export const semesterAdapter = (s = {}) => ({
  value: s._id, label: semesterFormatter(s),
});

export const syllableAdapter = s =>
  s && typeof s === 'boolean' ? 'yes' : 'no';

export const fullArrangementAdapter = (a = {}) => Object.assign({}, a, {
  active: (typeof a.active !== 'undefined') && activeAdapter(a.active),
  albums: (a.albums || []).map(albumAdapter),
  arrangers: (a.arrangers || []).map(hangoverAdapter),
  arrangementType: (typeof a.arrangementType !== 'undefined') && arrangementTypeAdapter(a.arrangementType),
  concerts: (a.concerts || []).map(concertAdapter),
  finale: attatchmentAdapter(a._attachments, 'mus'),
  genre: (typeof a.genre !== 'undefined') && genreAdapter(a.genre),
  key: (typeof a.key !== 'undefined') && keyAdapter(a.key),
  mp3: attatchmentAdapter(a._attachments, 'mp3'),
  originalArtists: (a.originalArtists || []).map(artistAdapter),
  pdf: attatchmentAdapter(a._attachments, 'pdf'),
  soloists: (a.soloists || []).map(hangoverAdapter),
  syllables: (typeof a.syllables !== 'undefined') && syllableAdapter(a.syllables),
  whenArranged: (typeof a.whenArranged !== 'undefined') && semesterAdapter(a.whenArranged),
  whenPerformed: (a.whenPerformed || []).map(semesterAdapter),
});
