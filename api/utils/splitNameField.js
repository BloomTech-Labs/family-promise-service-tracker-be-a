const splitNameField = (fullName) => {
  const index = fullName.lastIndexOf(' ');
  const lastName = fullName.substring(index + 1);
  const firstName = fullName.substring(0, index);
  return { firstName, lastName };
};

module.exports = splitNameField;
