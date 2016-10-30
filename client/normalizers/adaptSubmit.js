/** Fields that are of the form {value, label} for displaying a pretty label for a given key */
const objectFields = ['arrangementType', 'genre', 'key', 'quality', 'whenArranged'];
/** Fields that are arrays of the above datatype */
const objectArrayFields = ['albums', 'arrangers', 'concerts', 'soloists', 'whenPerformed'];
/** Fields that are "yes"/"no" that we want to convert into booleans */
const binaryFields = ['syllables'];
/** Fields that allow the user to define new input dynamically */
const newFields = [];
/** Fields that are arrays of the above datatype */
const newArrayFields = ['originalArtists'];
/** Fields that are files */
const fileFields = ['finale', 'mp3', 'pdf'];

/** Helper methods for adapting the datatypes into what the backend is expecting */
const adaptObject = o => o && o.value;
const adaptObjectArray = oa => oa && oa.length && oa.map(adaptObject);
const adaptBinary = b => b && b === 'yes';
const adaptNew = n => n && (n.value === n.label ? `new:${n.value}` : n.value); // allows the server to identify a new value
const adaptNewArray = na => na && na.length && na.map(adaptNew);
const adaptFile = f => (f && f.inCloudant) ? f.name : f;

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
