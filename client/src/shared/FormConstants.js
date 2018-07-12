/**
 * Define and manage fields for our form. We do so here because these values
 * will be referenced by both the client and the server.
 */

/** Fields that are, ya know, just normal text */
module.exports.textFields = ['alternateName', 'name', 'notes', 'whenWritten'];

/** Fields that are arrays of text */
module.exports.textArrayFields = ['spotifyHangoverLink', 'spotifyOriginalLink', 'youtube'];

 /** Fields that are of the form {value, label} for displaying a pretty label for a given key */
module.exports.objectFields = ['arrangementType', 'key', 'quality', 'semesterArranged'];

 /** Fields that are arrays of the above datatype */
module.exports.objectArrayFields = ['albums', 'arrangers', 'nonHangoverArrangers', 'concerts', 'genre', 'soloists', 'semestersPerformed'];

 /** Fields that are "yes"/"no" that we want to convert into booleans */
module.exports.binaryFields = ['active', 'syllables'];

/** Fields that are on/off */
module.exports.checkFields = ['arrangerNotAHangover'];

 /** Fields that allow the user to define new input dynamically */
module.exports.newFields = [];

 /** Fields that are arrays of the above datatype */
module.exports.newArrayFields = ['artists', 'tags', 'nonHangoverArrangers'];

 /** Fields that are files */
module.exports.fileFields = ['finale', 'recording', 'pdf'];

/** Custom metadata the client appends to file objects */
module.exports.fileMetadata = ['version'];

/** Appended to the end of file fields. Contains metadata to mix into file values. */
module.exports.FILE_METADATA_MODIFIER = 'Metadata';

/** String appended to form objects to let the server know it should create a new object */
module.exports.NEW_IDENTIFIER = 'new:';

/** Indicates to the backend that a certain file field should be removed from the database */
module.exports.DELETE_IDENTIFIER = 'delete_file';
