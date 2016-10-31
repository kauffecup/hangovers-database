export const activeAdapter = a =>
  a && typeof a === 'boolean' ? 'yes' : 'no';

export const albumAdapter = (a = {}, sMap = {}) => ({
  value: a._id, label: `${a.name} ${sMap[a.semester] ? sMap[a.semester].year : ''}`.trim(),
});

export const arrangementTypeAdapter = at => ({
  value: at._id, label: `${at.name} (${at.description})`,
});

export const artistAdapter = (a = {}) => ({
  value: a._id, label: a.name,
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

export const concertAdapter = (c = {}, sMap = {}) => ({
  value: c._id, label: `${c.name} ${sMap[c.semester] ? sMap[c.semester].year : ''}`.trim(),
});

export const genreAdapter = (g = {}) => ({
  value: g._id, label: `${g.name}`,
});

export const hangoverAdapter = (h = {}) => ({
  value: h._id, label: `${h.firstName} ${h.lastName}`,
});

export const keyAdapter = (k = {}) => ({
  value: k._id, label: k.name,
});

export const qualityAdapter = (q = {}) => ({
  value: q._id, label: `${q.name} (${q.description})`,
});

export const semesterAdapter = (s = {}) => ({
  value: s._id, label: `${s.semester_type} ${s.year}`,
});

export const syllableAdapter = s =>
  s && typeof s === 'boolean' ? 'yes' : 'no';

export const fullArrangementAdapter = (a = {}) => Object.assign({}, a, {
  active: activeAdapter(a.active),
  albums: (a.albums || []).map(albumAdapter),
  arrangers: (a.arrangers || []).map(hangoverAdapter),
  arrangementType: arrangementTypeAdapter(a.arrangementType),
  concerts: (a.concerts || []).map(concertAdapter),
  finale: attatchmentAdapter(a._attachments, 'mus'),
  genre: genreAdapter(a.genre),
  key: keyAdapter(a.key),
  mp3: attatchmentAdapter(a._attachments, 'mp3'),
  originalArtists: (a.originalArtists || []).map(artistAdapter),
  pdf: attatchmentAdapter(a._attachments, 'pdf'),
  quality: qualityAdapter(a.quality),
  soloists: (a.soloists || []).map(hangoverAdapter),
  syllables: syllableAdapter(a.syllables),
  whenArranged: semesterAdapter(a.whenArranged),
  whenPerformed: (a.whenPerformed || []).map(semesterAdapter),
});
