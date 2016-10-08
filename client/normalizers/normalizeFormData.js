export const arrangementAdapter = at => ({
  value: at._id, label: `${at.name} (${at.description})`,
});

export const qualityAdapter = q => ({
  value: q._id, label: `${q.name} (${q.description})`,
});

export const semesterAdapter = s => ({
  value: s._id, label: `${s.semester_type} ${s.year}`,
});

export const albumAdapter = a => ({
  value: a._id, label: `${a.name} (${a.year})`,
});

export const concertAdapter = c => ({
  value: c._id, label: `${c.name}`,
});

export const genreAdapter = g => ({
  value: g._id, label: `${g.name}`,
});

export const keyAdapter = k => ({
  value: k._id, label: k.name,
});

export const hangoverAdapter = h => ({
  value: h._id, label: `${h.firstName} ${h.lastName}`,
});

export const artistAdapter = a => ({
  value: a._id, label: a.name,
});
