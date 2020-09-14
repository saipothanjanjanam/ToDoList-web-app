module.exports = function getDate() {
  const date = new Date();

  // options for the date format
  const options = {weekday: 'long', year: 'numeric', month: 'long', day:'numeric'}
  const dateStr = date.toLocaleDateString('en-US', options);

  return dateStr;
}
