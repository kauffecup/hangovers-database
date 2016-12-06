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

export const adaptHangoverSubmit = (values) => {
  const adaptedValues = {};

  const hObjectFields = ['graduationSemester'];
  for (const objectField of hObjectFields) {
    adaptedValues[objectField] = adaptObject(values[objectField]);
  }

  const hObjectArrayFields = ['concertsMDed', 'semestersBMed', 'semestersMDed', 'semestersPresided'];
  for (const objectArrayField of hObjectArrayFields) {
    adaptedValues[objectArrayField] = adaptObjectArray(values[objectArrayField]);
  }

  return Object.assign({}, values, adaptedValues);
};
