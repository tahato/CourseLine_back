// Express 4 does not catch errors thrown (or rejected) inside async handlers:
// the request just hangs. These helpers forward them to the error handler.

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Wrap every function exported by a controller module.
const wrapController = (controller) =>
  Object.fromEntries(
    Object.entries(controller).map(([name, fn]) => [
      name,
      typeof fn === "function" ? asyncHandler(fn) : fn,
    ])
  );

module.exports = { asyncHandler, wrapController };
