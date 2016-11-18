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
  `${types.KEY_TYPE}_${key.name.toLowerCase().replace(/\s/g, '_')}`;
