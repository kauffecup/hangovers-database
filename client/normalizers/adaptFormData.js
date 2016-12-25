export const activeAdapter = a =>
  a && typeof a === 'boolean' ? 'yes' : 'no';

export const albumFormatter = (a = {}) => `${a.name} ${semesterFormatter(a.semester)}`.trim();

export const albumAdapter = (a = {}, sMap = {}) => ({
  value: a._id, label: albumFormatter(a, sMap && sMap[a.semester] ? sMap[a.semester].year : ''),
});

export const albumFormatAdapter = (af = {}) => ({
  value: af._id, label: af.name,
});

export const arrangementFormatter = (a = {}) => a.name;

export const arrangementAdapter = (a = {}) => ({
  value: a._id, label: arrangementFormatter(a),
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

export const concertFormatter = (c = {}) => `${c.name} ${semesterFormatter(c.semester)}`.trim();

export const concertAdapter = (c = {}, sMap = {}) => ({
  value: c._id, label: concertFormatter(c, sMap && sMap[c.semester] ? sMap[c.semester].year : ''),
});

export const concertTypeAdapter = (ct = {}) => ({
  value: ct._id, label: ct.name,
});

export const genreAdapter = (g = {}) => ({
  value: g._id, label: g.name,
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

export const tagFormatter = (t = {}) => t.name;

export const tagAdapter = (t = {}) => ({
  value: t._id, label: tagFormatter(t),
});

export const fullAlbumAdapter = (a = {}) => Object.assign({}, a, {
  format: (typeof a.format !== 'undefined') && albumFormatAdapter(a.format),
  semester: (typeof a.semester !== 'undefined') && semesterAdapter(a.semester),
  trackList: (a.trackList || []).map(arrangementAdapter),
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

export const fullArtistAdapter = (a = {}) => Object.assign({}, a, {
  arrangements: (a.arrangements || []).map(arrangementAdapter),
});

export const fullConcertAdapter = (c = {}) => Object.assign({}, c, {
  concertType: (typeof c.concertType !== 'undefined') && concertTypeAdapter(c.concertType),
  md: (c.md || []).map(hangoverAdapter),
  semester: (typeof c.semester !== 'undefined') && semesterAdapter(c.semester),
  setList: (c.setList || []).map(arrangementAdapter),
});

export const fullHangoverAdapter = (h = {}) => Object.assign({}, h, {
  arranged: (h.arranged || []).map(arrangementAdapter),
  concertsMDed: (h.concertsMDed || []).map(concertAdapter),
  graduationSemester: (h.graduationSemester || []).map(semesterAdapter),
  semestersBMed: (h.semestersBMed || []).map(semesterAdapter),
  semestersMDed: (h.semestersMDed || []).map(semesterAdapter),
  semestersPresided: (h.semestersPresided || []).map(semesterAdapter),
  soloed: (h.soloed || []).map(arrangementAdapter),
});

export const fullSemesterAdapter = (s = {}) => Object.assign({}, s, {
  albums: (s.albums || []).map(albumAdapter),
  arrangements: (s.arrangements || []).map(arrangementAdapter),
  bm: (s.bm || []).map(hangoverAdapter),
  concerts: (s.concerts || []).map(concertAdapter),
  md: (s.md || []).map(hangoverAdapter),
  performed: (s.performed || []).map(arrangementAdapter),
  president: (s.president || []).map(hangoverAdapter),
  graduatingHangs: (s.graduatingHangs || []).map(hangoverAdapter),
});

export const fullTagAdapter = (t = {}) => Object.assign({}, t, {
  arrangements: (t.arrangements || []).map(arrangementAdapter),
});
