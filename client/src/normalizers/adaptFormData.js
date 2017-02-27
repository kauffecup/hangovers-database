export const activeAdapter = a =>
  typeof a === 'boolean' ?  { value: a, label: a ? 'Yes' : 'No'} : {};

export const albumFormatter = (a = {}, useSemester) => useSemester ?
  `${a.name} ${semesterFormatter(a.semester)}`.trim() : a.name;

export const albumAdapter = (a = {}) => ({
  value: a._id, label: albumFormatter(a, true),
});

export const albumFormatFormatter = (af = {}) => af.name;

export const albumFormatAdapter = (af = {}) => ({
  value: af._id, label: albumFormatFormatter(af),
});

export const arrangementFormatter = (a = {}) => `${a.name}${a.alternateName ? ` (${a.alternateName})` : ''}`;

export const arrangementAdapter = (a = {}) => ({
  value: a._id, label: arrangementFormatter(a),
});

export const arrangementTypeFormatter = (at = {}) => at.name;

export const arrangementTypeAdapter = (at = {}) => ({
  value: at._id, label: arrangementTypeFormatter(at),
});

export const artistFormatter = (a = {}) => a.name;

export const artistAdapter = (a = {}) => ({
  value: a._id, label: artistFormatter(a),
});

export const concertFormatter = (c = {}, useSemester) => useSemester ?
  `${c.name} ${semesterFormatter(c.semester)}`.trim() : c.name;


export const concertAdapter = (c = {}) => ({
  value: c._id, label: concertFormatter(c, true),
});

export const concertTypeAdapter = (ct = {}) => ({
  value: ct._id, label: ct.name,
});

export const genreAdapter = (g = {}) => ({
  value: g._id, label: g.name,
});

export const hangoverFormatter = (h = {}) => `${h.firstName}${h.hangsName ? ` "${h.hangsName}" ` : ' '}${h.lastName}`;

export const hangoverAdapter = (h = {}) => ({
  value: h._id, label: hangoverFormatter(h),
});

export const keyFormatter = (k = {}) => `${k.name} ${k.tonality}`;

export const keyAdapter = (k = {}) => ({
  value: k._id, label: keyFormatter(k),
});

export const semesterFormatter = (s = {}) => `${s.semester_type || ''} ${s.year || ''}`.trim();

export const semesterAdapter = (s = {}) => ({
  value: s._id, label: semesterFormatter(s),
});

export const syllableAdapter = a =>
  typeof a === 'boolean' ?  { value: a, label: a ? 'Yes' : 'No'} : {};

export const tagFormatter = (t = {}) => t.name;

export const tagAdapter = (t = {}) => ({
  value: t._id, label: tagFormatter(t),
});

export const nonHangoverFormatter = (nh = {}) => nh.name;

export const nonHangoverAdapter = (nh = {}) => ({
  value: nh._id, label: nonHangoverFormatter(nh),
});

export const fullAlbumAdapter = (a = {}) => Object.assign({}, a, {
  format: (a.format || []).map(albumFormatAdapter),
  semester: (typeof a.semester !== 'undefined') && semesterAdapter(a.semester),
  trackList: (a.trackList || []).map(arrangementAdapter),
});

export const fullArrangementAdapter = (a = {}) => Object.assign({}, a, {
  active: activeAdapter(a.active),
  albums: (a.albums || []).map(albumAdapter),
  arrangers: (a.arrangers || []).map(hangoverAdapter),
  nonHangoverArrangers: (a.nonHangoverArrangers || []).map(nonHangoverAdapter),
  arrangerNotAHangover: (a.nonHangoverArrangers || []).length > 0,
  arrangementType: (typeof a.arrangementType !== 'undefined') && arrangementTypeAdapter(a.arrangementType),
  artists: (a.artists || []).map(artistAdapter),
  concerts: (a.concerts || []).map(concertAdapter),
  genre: (a.genre || []).map(genreAdapter),
  key: (typeof a.key !== 'undefined') && keyAdapter(a.key),
  soloists: (a.soloists || []).map(hangoverAdapter),
  syllables: syllableAdapter(a.syllables),
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

export const fullNonHangoverAdapter = (nh = {}) => Object.assign({}, nh, {
  arrangements: (nh.arrangements || []).map(arrangementAdapter),
});
