// src/middleware/validate.js
import * as yup from "yup";

/**
 * validate({ body, params, query })
 * - Awaits Yup validation
 * - Strips unknown keys
 * - Puts results at req.validated
 * - Sends 400s with readable errors
 */
export function validate(schemas = {}) {
  return async (req, res, next) => {
    try {
      const out = {};

      if (schemas.body) {
        out.body = await schemas.body
          .noUnknown(true)
          .validate(req.body, { abortEarly: false, stripUnknown: true });
      }

      if (schemas.params) {
        out.params = await schemas.params
          .noUnknown(true)
          .validate(req.params, { abortEarly: false, stripUnknown: true });
      }

      if (schemas.query) {
        out.query = await schemas.query
          .noUnknown(true)
          .validate(req.query, { abortEarly: false, stripUnknown: true });
      }

      req.validated = out;   // ✅ attach
      return next();         // ✅ continue
    } catch (err) {
      // Yup gives an array of messages at err.errors
      return res.status(400).json({
        error: "Validation failed",
        details: Array.isArray(err.errors) ? err.errors : [String(err.message || err)],
      });
    }
  };
}
