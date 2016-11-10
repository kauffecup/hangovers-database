/**
 * Define and manage fields for our form. We do so here because these values
 * will be referenced by both the client and the server.
 */

/** Fields that are, ya know, just normal text */
module.exports.textFields = ['alternateName', 'name', 'spotifyHangoverLink', 'spotifyOriginalLink', 'whenWritten', 'youtube'];

 /** Fields that are of the form {value, label} for displaying a pretty label for a given key */
module.exports.objectFields = ['arrangementType', 'genre', 'key', 'quality', 'whenArranged'];

 /** Fields that are arrays of the above datatype */
module.exports.objectArrayFields = ['albums', 'arrangers', 'concerts', 'soloists', 'whenPerformed'];

 /** Fields that are "yes"/"no" that we want to convert into booleans */
module.exports.binaryFields = ['active', 'syllables'];

 /** Fields that allow the user to define new input dynamically */
module.exports.newFields = [];

 /** Fields that are arrays of the above datatype */
module.exports.newArrayFields = ['originalArtists'];

 /** Fields that are files */
module.exports.fileFields = ['finale', 'mp3', 'pdf'];