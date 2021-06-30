'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const newDate = date.split(`${fromFormat[3]}`);
  const newFormat = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const element = toFormat[i];
    let index = fromFormat.indexOf(element);

    if (index >= 0) {
      newFormat.push(newDate[index]);
    }

    if (element === 'YYYY' || element === 'YY') {
      if (element === 'YYYY' && index < 0) {
        index = fromFormat.indexOf('YY');

        const dateYY = newDate[index] >= 30 ? '19' : '20';

        newFormat.push(dateYY + newDate[index]);
      }

      if (element === 'YY' && index < 0) {
        index = fromFormat.indexOf('YYYY');
        newFormat.push((newDate[index]).substr(2));
      }
    }
  }

  return newFormat.join(`${toFormat[3]}`);
}

module.exports = formatDate;
