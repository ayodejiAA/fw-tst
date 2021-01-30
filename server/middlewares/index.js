export const notFoundErrorHandler = (_req, res) => {
  res.status(404).json({
    message: 'Not found.',
    status: 'error',
    data: null
  });
};


// eslint-disable-next-line no-unused-vars
export const serverErrorHandler = (err, _req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null
    });
  }

  return res.status(500).json({
    message: 'Server error.',
    status: 'error',
    data: null
  });
};
