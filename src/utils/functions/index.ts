const printByPattern = (pattern) => (format, data) =>
  format.replace(pattern, (match) => data[match.replace(/\W/g, '')]);

export const formatUrl = printByPattern(/:(\w+)/g);
