import {
  INITIALIZE_FORMS,
  INITIALIZE_FORMS_SUCCESS,
  INITIALIZE_FORMS_FAILURE,
} from '../actions';

const initialState = {
  initialLoading: false,
  arrangementTypes: [],
  albumFormats: [],
  concertTypes: [],
  semesters: [],
  albums: [],
  concerts: [],
  keys: [],
};

const semesterSort = (a, b) => {
  if (a.year < b.year) return 1;
  if (a.year > b.year) return -1;
  if (a.semester_type === 'spring') return 1;
  if (a.semester_type === 'fall') return -1;
  return 0;
};

const fieldSemesterSort = field => (a, b) => semesterSort(a[field], b[field]);

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_FORMS:
      return {
        ...state,
        initialLoading: true,
      };

    case INITIALIZE_FORMS_SUCCESS:
      return {
        ...state,
        initialLoading: false,
        arrangementTypes: action.data.arrangementTypes.rows,
        albumFormats: action.data.albumFormats.rows,
        concertTypes: action.data.concertTypes.rows,
        semesters: action.data.semesters.rows.sort(semesterSort),
        albums: action.data.albums.rows.sort(fieldSemesterSort('semester')),
        concerts: action.data.concerts.rows.sort(fieldSemesterSort('semester')),
        keys: action.data.keys.rows,
      }

    case INITIALIZE_FORMS_FAILURE:
      return {
        ...state,
        initialLoading: false,
      };

    default:
      return state;
  }
}
