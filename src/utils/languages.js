exports.detectLang = async (url) => await new Promise((resolve, reject) => {
  try {
    url = '';
  } catch (err) {
    resolve({
      status: false,
      lang: 'en',
    });
  }
});
