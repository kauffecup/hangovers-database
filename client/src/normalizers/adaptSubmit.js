import {
  objectFields as ofs,
  objectArrayFields as oafs,
  binaryFields as bs,
  newFields as nfs,
  newArrayFields as nafs,
  fileField as ffs,
  NEW_IDENTIFIER,
} from '../../../shared/FormConstants';

/** Helper methods for adapting the datatypes into what the backend is expecting */
const adaptObject = o => o && o.value;
const adaptObjectArray = oa => oa && oa.length && oa.map(adaptObject);
const adaptBinary = b => (b && typeof b.value === 'boolean') ? (b.value ? '1' : '0') : null;
const adaptNew = n => n && (n.value === n.label ? `${NEW_IDENTIFIER}${n.value}` : n.value); // allows the server to identify a new value
const adaptNewArray = na => na && na.length && na.map(adaptNew);
const adaptFile = f => (f && f.inCloudant) ? `${f.name},${f.type}` : f;

/**
 * Our adapter function. Iterate over the fields and the form and adapt the data
 * before submit time. For the fields described above, adapt 'em. The final
 * return will be the original data with the described fields adapted.
 */
const adaptSubmit = (values, { objectFields = [], objectArrayFields = [], binaryFields = [], newFields = [], newArrayFields = [], fileFields = [] }) => {
  const adaptedValues = {};
  for (const objectField of objectFields) {
    adaptedValues[objectField] = adaptObject(values[objectField]);
  }

  for (const objectArrayField of objectArrayFields) {
    adaptedValues[objectArrayField] = adaptObjectArray(values[objectArrayField]);
  }

  for (const binaryField of binaryFields) {
    adaptedValues[binaryField] = adaptBinary(values[binaryField]);
  }

  for (const newField of newFields) {
    adaptedValues[newField] = adaptNew(values[newField]);
  }

  for (const newArrayField of newArrayFields) {
    adaptedValues[newArrayField] = adaptNewArray(values[newArrayField]);
  }

  for (const fileField of fileFields) {
    adaptedValues[fileField] = adaptFile(values[fileField]);
  }

  return Object.assign({}, values, adaptedValues);
};

export const adaptAlbumSubmit = values => adaptSubmit(values, {
  objectFields: ['semester'],
  objectArrayFields: ['format', 'trackList'],
});
export const adaptArrangementSubmit = values => adaptSubmit(values, {
  objectFields: ofs, objectArrayFields: oafs, binaryFields: bs, newFields: nfs, newArrayFields: nafs, fileFields: ffs,
});
export const adaptArtistSubmit = values => adaptSubmit(values, {
  objectArrayFields: ['arrangements'],
});
export const adaptConcertSubmit = values => adaptSubmit(values, {
  objectFields: ['concertType', 'semester'],
  objectArrayFields: ['md', 'setList'],
});
export const adaptHangoverSubmit = values => adaptSubmit(values, {
  objectArrayFields: ['arranged', 'concertsMDed', 'graduationSemester', 'semestersBMed', 'semestersMDed', 'semestersPresided', 'soloed'],
});
export const adaptSemesterSubmit = values => adaptSubmit(values, {
  objectFields: ['semester_type'],
  objectArrayFields: ['albums', 'arrangements', 'bm', 'concerts', 'md', 'performed', 'president', 'graduatingHangs'],
});
export const adaptTagSubmit = values => adaptSubmit(values, {
  objectArrayFields: ['arrangements'],
});
