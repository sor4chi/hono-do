// src/utils/body.ts
var parseBody = async (request) => {
  let body = {};
  const contentType = request.headers.get("Content-Type");
  if (contentType && (contentType.startsWith("multipart/form-data") || contentType.startsWith("application/x-www-form-urlencoded"))) {
    const formData = await request.formData();
    if (formData) {
      const form = {};
      formData.forEach((value, key) => {
        form[key] = value;
      });
      body = form;
    }
  }
  return body;
};
export {
  parseBody
};
