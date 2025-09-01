module.exports = {
  // available in every template as `dict`
  dict: (data) => data.i18n?.[data.locale?.code],
};
