import {
  objectFields as ofs,
  objectArrayFields as oafs,
  binaryFields as bs,
  newFields as nfs,
  newArrayFields as nafs,
  fileFields as ffs,
  checkFields as cfs,
  NEW_IDENTIFIER,
} from '../shared/FormConstants';

/** Helper methods for adapting the datatypes into what the backend is expecting */
const adaptObject = o => o && o.value;
const adaptObjectArray = oa => oa && oa.length && oa.map(adaptObject);
const adaptBinary = b => (b && typeof b.value === 'boolean') ? (b.value ? '1' : '0') : null;
const adaptNew = n => n && (n.value === n.label ? `${NEW_IDENTIFIER}${n.value}` : n.value); // allows the server to identify a new value
const adaptNewArray = na => na && na.length && na.map(adaptNew);
const adaptFile = ff => (ff || []).map(f => (f && f.fileName && f.bucketName) ? JSON.stringify(f) : f);
const adaptCheck = c => c ? '1' : '0';

/**
 * Our adapter function. Iterate over the fields and the form and adapt the data
 * before submit time. For the fields described above, adapt 'em. The final
 * return will be the original data with the described fields adapted.
 */
const adaptSubmit = (values, { objectFields = [], objectArrayFields = [], binaryFields = [], newFields = [], newArrayFields = [], fileFields = [], checkFields = [] }) => {
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

  for (const checkField of checkFields) {
    adaptedValues[checkField] = adaptCheck(values[checkField]);
  }

  return Object.assign({}, values, adaptedValues);
};

// if the arrangerNotAHangover box is not checked, remove the non hangover arrangers before adapting the rest
export const adaptArrangementSubmit = values => adaptSubmit(Object.assign({}, values, {
  nonHangoverArrangers: values.arrangerNotAHangover ? values.nonHangoverArrangers : [],
}), {
  objectFields: ofs, objectArrayFields: oafs, binaryFields: bs, newFields: nfs, newArrayFields: nafs, fileFields: ffs, checkFields: cfs,
});
export const adaptAlbumSubmit = values => adaptSubmit(values, {
  objectFields: ['semester'],
  objectArrayFields: ['format', 'trackList'],
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
export const adaptNonHangoverSubmit = values => adaptSubmit(values, {
  objectArrayFields: ['arrangements'],
});
