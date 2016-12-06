const types = require('./DBTypes');

const getArrangementID = arrangement =>
  `${types.ARRANGEMENT_TYPE}_${arrangement.name.toLowerCase().replace(/\s/g, '_')}`;

const getArrangementTypeID = arrangementType =>
  `${types.ARRANGEMENT_TYPE_TYPE}_${arrangementType.name.toLowerCase().replace(/\s/g, '_')}`;

const getHangoverID = hangover =>
  `${types.HANGOVER_TYPE}_${hangover.lastName.toLowerCase().replace(/\s/g, '_')}_${hangover.firstName.toLowerCase().replace('.', '').replace(/\s/g, '_')}`;

const getSemesterID = semester =>
  `${types.SEMESTER_TYPE}_${semester.year}_${semester.semester_type.toLowerCase()}`;

const getAlbumID = album =>
  `${types.ALBUM_TYPE}_${album.name.toLowerCase().replace(/\s/g, '_')}`;

const getAlbumFormatID = albumFormat =>
  `${types.ALBUM_FORMAT_TYPE}_${albumFormat.name.toLowerCase().replace(/\s/g, '_')}`;

const getConcertID = concert =>
  `${types.CONCERT_TYPE}_${concert.name.toLowerCase().replace(/\s/g, '_')}`;

const getConcertTypeID = concertType =>
  `${types.CONCERT_TYPE_TYPE}_${concertType.name.toLowerCase().replace(/\s/g, '_')}`;

const getGenreID = genre =>
  `${types.GENRE_TYPE}_${genre.name.toLowerCase().replace(/\s/g, '_')}`;

const getArtistID = artist =>
  `${types.ARTIST_TYPE}_${artist.name.toLowerCase().replace(/\s/g, '_')}`;

const getKeyID = key =>
  `${types.KEY_TYPE}_${key.name.toLowerCase().replace(/\s/g, '_')}_${key.tonality.toLowerCase().replace(/\s/g, '_')}`;

const getTagID = tag =>
  `${types.TAG_TYPE}_${tag.name.toLowerCase().replace(/\s/g, '_')}`;


// relationship IDs

const getAlbumSemesterID = (album, semester) =>
  `${types.ALBUM_SEMESTER_RELATIONSHIP_TYPE}_${getAlbumID(album)}_${getSemesterID(semester)}`;

const getHangoverGraduationID = (hangover, semester) =>
  `${types.HANGOVER_GRADUATION_SEMESTER_RELATIONSHIP_TYPE}_${getHangoverID(hangover)}_${getSemesterID(semester)}`;

const getBMSemesterID = (hangover, semester) =>
  `${types.BM_SEMESTER_RELATIONSHIP_TYPE}_${getHangoverID(hangover)}_${getSemesterID(semester)}`;

const getConcertSemesterID = (concert, semester) =>
  `${types.CONCERT_SEMESTER_RELATIONSHIP_TYPE}_${getConcertID(concert)}_${getSemesterID(semester)}`;

const getMDConcertID = (hangover, concert) =>
`${types.MD_CONCERT_RELATIONSHIP_TYPE}_${getHangoverID(hangover)}_${getConcertID(concert)}`;

const getMDSemesterID = (hangover, semester) =>
  `${types.MD_SEMESTER_RELATIONSHIP_TYPE}_${getHangoverID(hangover)}_${getSemesterID(semester)}`;

const getPresidentSemesterID = (hangover, semester) =>
  `${types.PRESIDENT_SEMESTER_RELATIONSHIP_TYPE}_${getHangoverID(hangover)}_${getSemesterID(semester)}`;

// exports

module.exports.getArrangementID = getArrangementID;
module.exports.getArrangementTypeID = getArrangementTypeID;
module.exports.getHangoverID = getHangoverID;
module.exports.getSemesterID = getSemesterID;
module.exports.getAlbumID = getAlbumID;
module.exports.getAlbumFormatID = getAlbumFormatID;
module.exports.getConcertID = getConcertID;
module.exports.getConcertTypeID = getConcertTypeID;
module.exports.getGenreID = getGenreID;
module.exports.getArtistID = getArtistID;
module.exports.getKeyID = getKeyID;
module.exports.getTagID = getTagID;
module.exports.getAlbumSemesterID = getAlbumSemesterID;
module.exports.getHangoverGraduationID = getHangoverGraduationID;
module.exports.getBMSemesterID = getBMSemesterID;
module.exports.getConcertSemesterID = getConcertSemesterID;
module.exports.getMDConcertID = getMDConcertID;
module.exports.getMDSemesterID = getMDSemesterID;
module.exports.getPresidentSemesterID = getPresidentSemesterID;
