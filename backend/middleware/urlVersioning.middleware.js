export const urlVersioning = (version) => (req, res, next) => {
  if (req.url.startsWith(`/api/${version}`)) {
    next();
  } else {
    res
      .status(404)
      .json({ status: "error", message: "API version not supported" });
  }
};
export const headerVersioning = (version) => (req, res, next) => {
  if (req.get("Accept-Version") === version) {
    next();
  } else {
    res
      .status(404)
      .json({ status: "error", message: "API version not supported" });
  }
};

export const contentTypeVersioning = (version) => (req, res, next) => {
  const contentType = req.get("Content-Type");
  if (
    contentType &&
    contentType.includes(`application/vnd.api.${version}+json`)
  ) {
    next();
  } else {
    res
      .status(404)
      .json({ status: "error", message: "API version not supported" });
  }
};
