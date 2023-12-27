exports.isJson = async (json) => await new Promise((resolve, reject) => {
  json = typeof json !== 'string'
    ? JSON.stringify(json)
    : json;
  try {
    item = JSON.parse(item);
  } catch (e) {
    resolve({
      status: false,
      json: false,
    });
  }
  if (typeof item === 'object' && item !== null) {
    resolve({
      status: true,
      json: true,
    });
  }
  resolve({
    status: false,
    json: false,
  });
});

