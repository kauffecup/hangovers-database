import {
  objectFields,
  objectArrayFields,
  binaryFields,
  newFields,
  newArrayFields,
  fileFields,
  NEW_IDENTIFIER,
} from '../../shared/FormConstants';

/** Helper methods for adapting the datatypes into what the backend is expecting */
const adaptObject = o => o && o.value;
const adaptObjectArray = oa => oa && oa.length && oa.map(adaptObject);
const adaptBinary = b => b && b === 'yes';
const adaptNew = n => n && (n.value === n.label ? `${NEW_IDENTIFIER}${n.value}` : n.value); // allows the server to identify a new value
const adaptNewArray = na => na && na.length && na.map(adaptNew);
const adaptFile = f => (f && f.inCloudant) ? `${f.name},${f.type}` : f;

/**
 * Our adapter function. Iterate over the fields and the form and adapt the data
 * before submit time. For the fields described above, adapt 'em. The final
 * return will be the original data with the described fields adapted.
 */
export default (values) => {
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

export const adaptAlbumSubmit = (values) => {
  const adaptedValues = {};
  const aObjectFields = ['format', 'semester'];
  for (const objectField of aObjectFields) {
    adaptedValues[objectField] = adaptObject(values[objectField]);
  }

  const aObjectArrayFields = ['trackList'];
  for (const objectArrayField of aObjectArrayFields) {
    adaptedValues[objectArrayField] = adaptObjectArray(values[objectArrayField]);
  }

  return Object.assign({}, values, adaptedValues);
};

export const adaptArtistSubmit = (values) => {
  const adaptedValues = {};
  const aObjectArrayFields = ['arrangements'];
  for (const objectArrayField of aObjectArrayFields) {
    adaptedValues[objectArrayField] = adaptObjectArray(values[objectArrayField]);
  }

  return Object.assign({}, values, adaptedValues);
};

export const adaptConcertSubmit = (values) => {
  const adaptedValues = {};
  const cObjectFields = ['concertType', 'semester'];
  for (const objectField of cObjectFields) {
    adaptedValues[objectField] = adaptObject(values[objectField]);
  }

  const cObjectArrayFields = ['md', 'setList'];
  for (const objectArrayField of cObjectArrayFields) {
    adaptedValues[objectArrayField] = adaptObjectArray(values[objectArrayField]);
  }

  return Object.assign({}, values, adaptedValues);
};

export const adaptHangoverSubmit = (values) => {
  const adaptedValues = {};
  const hObjectArrayFields = ['arranged', 'concertsMDed', 'graduationSemester', 'semestersBMed', 'semestersMDed', 'semestersPresided', 'soloed'];
  for (const objectArrayField of hObjectArrayFields) {
    adaptedValues[objectArrayField] = adaptObjectArray(values[objectArrayField]);
  }

  return Object.assign({}, values, adaptedValues);
};

export const adaptSemesterSubmit = (values) => {
  const adaptedValues = {};
  const sObjectArrayFields = ['albums', 'arrangements', 'bm', 'concerts', 'md', 'performed', 'president', 'graduatingHangs'];
  for (const objectArrayField of sObjectArrayFields) {
    adaptedValues[objectArrayField] = adaptObjectArray(values[objectArrayField]);
  }

  return Object.assign({}, values, adaptedValues);
};
