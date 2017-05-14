const types = require('./DBTypes');

/** Helper that replaces spaces and slashes with _ and removes all other non alphanumeric characters */
const normalizeString = string =>
  string.toLowerCase().replace(/\s|\//g, '_').replace(/[^_a-z0-9+]/g, '');
module.exports.normalizeString = normalizeString;

module.exports.getArrangementID = arrangement =>
  `${types.ARRANGEMENT_TYPE}_${normalizeString(arrangement.name)}`;

module.exports.getArrangementTypeID = arrangementType =>
  `${types.ARRANGEMENT_TYPE_TYPE}_${normalizeString(arrangementType.name)}`;

module.exports.getHangoverID = hangover =>
  `${types.HANGOVER_TYPE}_${normalizeString(hangover.lastName)}_${normalizeString(hangover.firstName)}`;

module.exports.getSemesterID = semester =>
  `${types.SEMESTER_TYPE}_${semester.year}_${semester.semester_type.toLowerCase()}`;

module.exports.getAlbumID = album =>
  `${types.ALBUM_TYPE}_${normalizeString(album.name)}`;

module.exports.getAlbumFormatID = albumFormat =>
  `${types.ALBUM_FORMAT_TYPE}_${normalizeString(albumFormat.name)}`;

module.exports.getConcertID = concert =>
  `${types.CONCERT_TYPE}_${normalizeString(concert.name)}`;

module.exports.getConcertTypeID = concertType =>
  `${types.CONCERT_TYPE_TYPE}_${normalizeString(concertType.name)}`;

module.exports.getGenreID = genre =>
  `${types.GENRE_TYPE}_${normalizeString(genre.name)}`;

module.exports.getArtistID = artist =>
  `${types.ARTIST_TYPE}_${normalizeString(artist.name)}`;

module.exports.getKeyID = key =>
  `${types.KEY_TYPE}_${normalizeString(key.name)}_${normalizeString(key.tonality)}`;

module.exports.getTagID = tag =>
  `${types.TAG_TYPE}_${normalizeString(tag.name)}`;

module.exports.getNonHangoverID = nonHangover =>
  `${types.NON_HANGOVER_TYPE}_${normalizeString(nonHangover.name)}`;


// relationship IDs

module.exports.getAlbumSemesterID = (albumID, semesterID) =>
  `${types.ALBUM_SEMESTER_RELATIONSHIP_TYPE}_${albumID}_${semesterID}`;

module.exports.getArrangementAlbumID = (arrangementID, albumID) =>
  `${types.ARRANGEMENT_ALBUMS_RELATIONSHIP_TYPE}_${arrangementID}_${albumID}`;

module.exports.getArrangementArrangerID = (arrangementID, hangoverID) =>
  `${types.ARRANGEMENT_ARRANGERS_RELATIONSHIP_TYPE}_${arrangementID}_${hangoverID}`;

module.exports.getArrangementNonHangoverArrangerID = (arrangementID, nonHangoverID) =>
  `${types.ARRANGEMENT_NON_HANGOVER_ARRANGERS_RELATIONSHIP_TYPE}_${arrangementID}_${nonHangoverID}`;

module.exports.getArrangementArtistID = (arrangementID, artistID) =>
  `${types.ARRANGEMENT_ARTIST_RELATIONSHIP_TYPE}_${arrangementID}_${artistID}`;

module.exports.getArrangementConcertID = (arrangementID, concertID) =>
  `${types.ARRANGEMENT_CONCERTS_RELATIONSHIP_TYPE}_${arrangementID}_${concertID}`;

module.exports.getArrangementGenreID = (arrangementID, genreID) =>
  `${types.ARRANGEMENT_GENRE_RELATIONSHIP_TYPE}_${arrangementID}_${genreID}`;

module.exports.getArrangementSemesterArrangedID = (arrangementID, semesterID) =>
  `${types.ARRANGEMENT_SEMESTER_ARRANGED_RELATIONSHIP_TYPE}_${arrangementID}_${semesterID}`;

module.exports.getArrangementSemesterPerformedID = (arrangementID, semesterID) =>
  `${types.ARRANGEMENT_SEMESTERS_PERFORMED_RELATIONSHIP_TYPE}_${arrangementID}_${semesterID}`;

module.exports.getArrangementSoloistID = (arrangementID, hangoverID) =>
  `${types.ARRANGEMENT_SOLOISTS_RELATIONSHIP_TYPE}_${arrangementID}_${hangoverID}`;

module.exports.getArrangementTagID = (arrangementID, tagID) =>
  `${types.ARRANGEMENT_TAG_RELATIONSHIP_TYPE}_${arrangementID}_${tagID}`;

module.exports.getBMSemesterID = (hangoverID, semesterID) =>
  `${types.BM_SEMESTER_RELATIONSHIP_TYPE}_${hangoverID}_${semesterID}`;

module.exports.getConcertSemesterID = (concertID, semesterID) =>
  `${types.CONCERT_SEMESTER_RELATIONSHIP_TYPE}_${concertID}_${semesterID}`;

module.exports.getHangoverGraduationID = (hangoverID, semesterID) =>
  `${types.HANGOVER_GRADUATION_SEMESTER_RELATIONSHIP_TYPE}_${hangoverID}_${semesterID}`;

module.exports.getMDConcertID = (hangoverID, concertID) =>
`${types.MD_CONCERT_RELATIONSHIP_TYPE}_${hangoverID}_${concertID}`;

module.exports.getMDSemesterID = (hangoverID, semesterID) =>
  `${types.MD_SEMESTER_RELATIONSHIP_TYPE}_${hangoverID}_${semesterID}`;

module.exports.getPresidentSemesterID = (hangoverID, semesterID) =>
  `${types.PRESIDENT_SEMESTER_RELATIONSHIP_TYPE}_${hangoverID}_${semesterID}`;
