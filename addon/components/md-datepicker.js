import Ember from 'ember';
import layout from '../templates/components/md-datepicker';

// TODO change to auto generated docs
// dateFormat
// required
// disabled
// selectedDate
// placeholder
// relaxValidation
// inputClass
// errorMessage
// minDate
// maxDate

export default Ember.Component.extend({
  layout,
  classNames: ['md-datepicker-group'],
  init() {
    let selectedDate = this.get('selectedDate');
    if (selectedDate) {
      this.set('_viewingDate', moment(selectedDate).toDate());
    }
    else {
      this.set('_viewingDate', moment().toDate());
    }

    return this._super(...arguments);
  },
  didInsertElement() {
    // Currently unable to get right click cut/paste to work, so disable right click for now
    this.$('input').on('contextmenu', function() {
      return false;
    });

    return this._super(...arguments);
  },
  dateText: Ember.computed('selectedDate', 'format', {
    set(key, val) {
      this.set('_dateText', val);
      return val;
    },
    get() {
      let dateText = null;
      let _dateText = this.get('_dateText');
      let selectedDate = this.get('selectedDate');
      if (selectedDate) {
        dateText = moment(selectedDate).format(this.get('format'));
      }
      else {
        dateText = _dateText;
      }
      this.set('_dateText', dateText);
      return dateText;
    }
  }),
  daySpans: Ember.computed('_viewingDate', 'selectedDate', 'minDate', 'maxDate', function() {
    let viewingDate = this.get('_viewingDate')
    let selectedDate = this.get('selectedDate');
    let minDate = this.get('minDate');
    let maxDate = this.get('maxDate');

    let daySpans = Ember.A([]);

    // Add blank days from Monday to the first day of the month
    let firstDay = Number(moment(viewingDate).startOf('month').format('E'));
    for (let i = 0; i < firstDay - 1; i++) {
      daySpans.pushObject({ day: '', today: false, isSelectedDate: false, date: null, disabled: false });
    }

    // Populate for each day
    let daysInMonth = moment(viewingDate).daysInMonth();
    let today = moment();
    for (let i = 0; i < daysInMonth; i++) {
      let day = (i + 1);
      let date = moment(moment(viewingDate).startOf('month')).add(day - 1, 'days');
      let isSelectedDate = false;
      if (selectedDate) {
        isSelectedDate = moment(selectedDate).isSame(date, 'day');
      }

      let disabled = false;
      if (minDate && moment(minDate).isAfter(date, 'day')) {
        disabled = true;
      }
      else if (maxDate && moment(maxDate).isBefore(date, 'day')) {
        disabled = true;
      }

      daySpans.pushObject({ day: day.toString(), today: today.isSame(date, 'day'), isSelectedDate, date, disabled });
    }

    // Fill out remaining row
    let lastDay = Number(moment(viewingDate).endOf('month').format('E'));
    for (let i = lastDay; i < 7; i++) {
      daySpans.pushObject({ day: '', today: false, isSelectedDate: false, date: null, disabled: false });
    }

    return daySpans;
  }),
  weekSpans: Ember.computed('daySpans.[]', function() {
    let daySpans = this.get('daySpans');
    let weekSpans = Ember.A([]);
    let splitSize = 7;

    for (let i = 0; i < daySpans.get('length'); i += splitSize) {
      weekSpans.addObject({ daySpans: daySpans.slice(i, i + splitSize) });
    }

    return weekSpans;
  }),
  defaultErrorMessage: Ember.computed('format', 'required', 'dateText', 'isEarly', 'isLate', 'minDate', 'maxDate', function() {
    let dateText = this.get('dateText');
    if (this.get('required') && (dateText === undefined || dateText === null || dateText === '')) {
      return 'Date is required';
    }

    let format = this.get('format');

    if (this.get('isEarly')) {
      return 'Date entered must be on or after ' + moment(this.get('minDate')).format(format);
    }

    if (this.get('isLate')) {
      return 'Date entered must be on or before ' + moment(this.get('maxDate')).format(format);
    }

    return 'Invalid date, required format is ' + format;
  }),
  errorMessageShown: Ember.computed('errorMessage', 'isInvalidDate', function() {
    return this.get('errorMessage.length') > 0 || this.get('isInvalidDate');
  }),
  format: Ember.computed('dateFormat', function() {
    let dateFormat = this.get('dateFormat');
    if (dateFormat) {
      return dateFormat;
    }

    return 'MM/DD/YYYY';
  }),
  isEarly: Ember.computed('dateText', 'minDate', 'format', 'useStrictMode', function() {
    let dateText = this.get('dateText');
    let minDate = this.get('minDate');

    if (!minDate) {
      return false;
    }

    return moment(dateText, this.get('format'), this.get('useStrictMode')).isBefore(moment(minDate), 'day');
  }),
  isLate: Ember.computed('dateText', 'maxDate', 'format', 'useStrictMode', function() {
    let dateText = this.get('dateText');
    let maxDate = this.get('maxDate');

    if (!maxDate) {
      return false;
    }

    return moment(dateText, this.get('format'), this.get('useStrictMode')).isAfter(moment(maxDate), 'day');
  }),
  isValidDate: Ember.computed('dateText', 'required', 'isEarly', 'isLate', function() {
    let dateText = this.get('dateText');

    if (!this.get('required') && (dateText === undefined || dateText === null || dateText === '')) {
      return true;
    }

    return moment(dateText, this.get('format'), this.get('useStrictMode')).isValid() && !this.get('isEarly') && !this.get('isLate');
  }),
  isInvalidDate: Ember.computed.not('isValidDate'),
  mdClass: Ember.computed('inputClass', 'isValidDate', function() {
    let result = '';
    let inputClass = this.get('inputClass');
    if (inputClass) {
      result += inputClass;
    }

    if (this.get('isValidDate')) {
      return result;
    }
    return result === '' ? 'invalid' : result + ' ' + 'invalid';
  }),
  placeholderClass: Ember.computed('dateText', function() {
    if (this.get('dateText.length') > 0) {
      return 'text-present';
    }

    return '';
  }),
  selectedDayMonth: Ember.computed('selectedDate', 'isInvalidDate', 'dateText', function() {
    let selectedDate = this.get('selectedDate');
    let dateText = this.get('dateText');

    if (selectedDate) {
      return moment(selectedDate).format('ddd, MMM D');
    }
    if (this.get('isInvalidDate')) {
      if (this.get('required') && (dateText === undefined || dateText === null || dateText === '')) {
        return 'Date is required';
      }

      return 'Invalid date';
    }

    return '';
  }),
  viewingLongMonth: Ember.computed('_viewingDate', function() {
    let _viewingDate = this.get('_viewingDate');
    return moment(_viewingDate).format('MMMM');
  }),
  viewingYear: Ember.computed('_viewingDate', function() {
    let _viewingDate = this.get('_viewingDate');
    return moment(_viewingDate).format('YYYY');
  }),
  selectedYear: Ember.computed('selectedDate', function() {
    let selectedDate = this.get('selectedDate');
    if (selectedDate) {
      return moment(selectedDate).format('YYYY');
    }
    return '';
  }),
  useStrictMode: Ember.computed('relaxValidation', function() {
    if (this.get('relaxValidation')) {
      return false;
    }

    return true;
  }),
  actions: {
    absorbMouseDown() {
      // Used to retain focus in the input by absorbing mouse down 'clicks' on the datepicker that do not have explicit actions
    },
    dateClicked(date) {
      this.sendAction('dateChanged', date);
    },
    downArrowClick() {
      this.$('input').focus();
    },
    keyUp() {
      let dateText = this.get('dateText');
      if (this.get('isValidDate') && dateText !== undefined && dateText !== null && dateText !== '') {
        this.sendAction('dateChanged', moment(dateText, this.get('format')).toDate());
      }
      else {
        this.sendAction('dateChanged', null);
      }
    },
    monthToggle(value) {
      this.set('_viewingDate', moment(this.get('_viewingDate')).add(Number(value), 'months').toDate());
    }
  }
});
