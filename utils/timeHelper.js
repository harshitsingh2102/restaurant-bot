const { DateTime } = require('luxon');

const parseTimeTo24Hr = (date, time) => {
  try {
    let cleanTime = time.toLowerCase().trim();

    if (/^\d{1,2}\s?(am|pm)$/.test(cleanTime)) {
      cleanTime = cleanTime.replace(/(\d{1,2})\s?(am|pm)/, '$1:00 $2');
    }

    const fullString = `${date} ${cleanTime}`;
    const dateTime = DateTime.fromFormat(fullString, 'yyyy-MM-dd h:mm a');

    if (!dateTime.isValid) {
      console.error('⛔ Time Parsing Error:', dateTime.invalidExplanation);
      return null;
    }

    return dateTime.toFormat('yyyy-MM-dd HH:mm:ss');
  } catch (err) {
    console.error('⛔ Time parse exception:', err.message);
    return null;
  }
};

module.exports = { parseTimeTo24Hr };
