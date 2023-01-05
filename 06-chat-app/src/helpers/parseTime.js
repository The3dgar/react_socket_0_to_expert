import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export const parseTime = (date) => {
  return moment(date).format('HH:mm a | MMMM D YYYY');
};
