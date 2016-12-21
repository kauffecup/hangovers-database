export const activeAdapter = a =>
  a && typeof a === 'boolean' ? 'yes' : 'no';

export const albumFormatter = (a = {}, y = '') => `${a.name} ${y}`.trim();

export const albumAdapter = (a = {}, sMap = {}) => ({
  value: a._id, label: albumFormatter(a, sMap && sMap[a.semester] ? sMap[a.semester].year : ''),
});

export const arrangementAdapter = (a = {}) => ({
  value: a._id, label: a.name,
});

export const arrangementTypeAdapter = (at = {}) => ({
  value: at._id, label: `${at.name}`,
});

export const artistFormatter = (a = {}) => a.name;

export const artistAdapter = (a = {}) => ({
  value: a._id, label: artistFormatter(a),
});

export const attatchmentAdapter = (a = {}, type = '') => {
  for (const fileName of Object.keys(a)) {
    const split = (fileName || '').split('.');
    if ((split.length && split[split.length - 1] === type) ||
      (a[fileName].content_type && a[fileName].content_type.indexOf(type) > -1)
    ) {
      return {
        name: fileName,
        type: a[fileName].content_type,
        size: a[fileName].length,
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

export const tagAdapter = (t = {}) => ({
  value: t._id, label: t.name,
});

export const fullArrangementAdapter = (a = {}) => Object.assign({}, a, {
  active: (typeof a.active !== 'undefined') && activeAdapter(a.active),
  albums: (a.albums || []).map(albumAdapter),
  arrangers: (a.arrangers || []).map(hangoverAdapter),
  arrangementType: (typeof a.arrangementType !== 'undefined') && arrangementTypeAdapter(a.arrangementType),
  artists: (a.artists || []).map(artistAdapter),
  concerts: (a.concerts || []).map(concertAdapter),
  finale: attatchmentAdapter(a._attachments, 'mus'),
  genre: (a.genre || []).map(genreAdapter),
  key: (typeof a.key !== 'undefined') && keyAdapter(a.key),
  recording: attatchmentAdapter(a._attachments, 'audio'),
  pdf: attatchmentAdapter(a._attachments, 'pdf'),
  soloists: (a.soloists || []).map(hangoverAdapter),
  syllables: (typeof a.syllables !== 'undefined') && syllableAdapter(a.syllables),
  semesterArranged: (typeof a.semesterArranged !== 'undefined') && semesterAdapter(a.semesterArranged),
  semestersPerformed: (a.semestersPerformed || []).map(semesterAdapter),
  tags: (a.tags || []).map(tagAdapter),
});

export const fullHangoverAdapter = (h = {}) => Object.assign({}, h, {
  arranged: (h.arranged || []).map(arrangementAdapter),
  concertsMDed: (h.concertsMDed || []).map(concertAdapter),
  graduationSemester: h.graduationSemester && h.graduationSemester.length === 1 && semesterAdapter(h.graduationSemester[0]),
  semestersBMed: (h.semestersBMed || []).map(semesterAdapter),
  semestersMDed: (h.semestersMDed || []).map(semesterAdapter),
  semestersPresided: (h.semestersPresided || []).map(semesterAdapter),
  soloed: (h.soloed || []).map(arrangementAdapter),
});
