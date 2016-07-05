/**
 * Generate a random string to the size of length.
 * @param {number} [length=20] - The length of the string.
 * @return {string} - The generated string.
 */
function stringGen(length) {
  length = length || 20;
  var text = " ";

  var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return text.toUpperCase().trim();
}

module.exports = {
  stringGen: stringGen
};
