const types = require('./DBTypes');

module.exports.getArrangementID = arrangement =>
  `${types.ARRANGEMENT_TYPE}_${arrangement.name.toLowerCase().replace(/\s/g, '_')}`;

module.exports.getArrangementTypeID = arrangementType =>
  `${types.ARRANGEMENT_TYPE_TYPE}_${arrangementType.name.toLowerCase().replace(/\s/g, '_')}`;

module.exports.getHangoverID = hangover =>
  `${types.HANGOVER_TYPE}_${hangover.lastName.toLowerCase().replace(/\s/g, '_')}_${hangover.firstName.toLowerCase().replace('.', '').replace(/\s/g, '_')}`;

module.exports.getSemesterID = semester =>
  `${types.SEMESTER_TYPE}_${semester.year}_${semester.semester_type.toLowerCase()}`;

module.exports.getAlbumID = album =>
  `${types.ALBUM_TYPE}_${album.name.toLowerCase().replace(/\s/g, '_')}`;

module.exports.getAlbumFormatID = albumFormat =>
  `${types.ALBUM_FORMAT_TYPE}_${albumFormat.name.toLowerCase().replace(/\s/g, '_')}`;

module.exports.getConcertID = concert =>
  `${types.CONCERT_TYPE}_${concert.name.toLowerCase().replace(/\s/g, '_')}`;

module.exports.getConcertTypeID = concertType =>
  `${types.CONCERT_TYPE_TYPE}_${concertType.name.toLowerCase().replace(/\s/g, '_')}`;

module.exports.getGenreID = genre =>
  `${types.GENRE_TYPE}_${genre.name.toLowerCase().replace(/\s/g, '_')}`;

module.exports.getArtistID = artist =>
  `${types.ARTIST_TYPE}_${artist.name.toLowerCase().replace(/\s/g, '_')}`;

module.exports.getKeyID = key =>
  `${types.KEY_TYPE}_${key.name.toLowerCase().replace(/\s/g, '_')}_${key.tonality.toLowerCase().replace(/\s/g, '_')}`;

module.exports.getTagID = tag =>
  `${types.TAG_TYPE}_${tag.name.toLowerCase().replace(/\s/g, '_')}`;

module.exports.getNonHangoverID = nonHangover =>
  `${types.NON_HANGOVER_TYPE}_${nonHangover.name.toLowerCase().replace(/\s/g, '_')}`;


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
