// validators/planned.validators.ts
import * as yup from "yup";

// Re-usable helpers
const objectId = yup
  .string()
  .required("id is required")
  .matches(/^[a-fA-F0-9]{24}$/, "must be a valid Mongo ObjectId");

const futureDate = yup
  .date()
  .typeError("plannedAt must be a valid date")
  .min(new Date(Date.now() + 60_000), "plannedAt must be in the future"); // allow 1-min skew

// ---------- Params (/:id) ----------
export const plannedParamsSchema = yup.object({
  id: objectId,
});

// ---------- Create (POST /api/planned) ----------
/**
 * You usually derive userId from auth (req.user.id), so it’s not accepted from body.
 * mediaItemId is required; plannedAt must be in the future.
 * leadMinutes defaults to 60, between 0 and 10080 (7 days).
 * reminderSent is server-managed: stripped if provided.
 */
export const createPlannedBodySchema = yup
  .object({
    mediaItemId: objectId.clone().label("mediaItemId"),
    plannedAt: futureDate.required("plannedAt is required"),
    leadMinutes: yup
      .number()
      .min(0)
      .max(10080)
      .default(60)
      .optional(),
    // server-managed fields: strip if user tries to send them
    reminderSent: yup.boolean().strip(true),
    active: yup.boolean().default(true).optional(),
  })
  .noUnknown(true, "Unknown field in request body");

// ---------- Update (PUT/PATCH /api/planned/:id) ----------
/**
 * Only allow fields you actually support changing.
 * Typically you do NOT allow changing mediaItemId/userId after creation.
 * Require at least one updatable field to be present.
 */
export const updatePlannedBodySchema = yup
  .object({
    plannedAt: futureDate.optional(),
    leadMinutes: yup.number().min(0).max(10080).optional(),
    active: yup.boolean().optional(),

    // server-managed fields: strip on input
    userId: yup.mixed().strip(true),
    mediaItemId: yup.mixed().strip(true),
    reminderSent: yup.mixed().strip(true),
  })
  .noUnknown(true, "Unknown field in request body")
  .test(
    "at-least-one",
    "Provide at least one of: plannedAt, leadMinutes, active",
    (value) => !!value && ["plannedAt", "leadMinutes", "active"].some((k) => k in value)
  );

// ---------- Query (GET /api/planned) ----------
/**
 * Flexible list endpoint:
 *  - mediaItemId (optional) to filter by item
 *  - active (optional) to include inactive plans
 *  - upcoming=true to only show future plans (server can interpret this as plannedAt >= now)
 *  - before/after (optional) date range
 *  - pagination: page/limit
 */
export const listPlannedQuerySchema = yup
  .object({
    mediaItemId: objectId.clone().label("mediaItemId").optional(),
    active: yup.boolean().optional(),
    upcoming: yup.boolean().optional(),

    before: yup.date().typeError("before must be a valid date").optional(),
    after: yup.date().typeError("after must be a valid date").optional(),

    page: yup.number().integer().min(1).default(1).optional(),
    limit: yup.number().integer().min(1).max(100).default(20).optional(),
  })
  .noUnknown(true, "Unknown query parameter")
  .test(
    "range-order",
    "`before` must be after `after` when both are provided",
    (q) => {
      if (!q?.before || !q?.after) return true;
      return new Date(q.before).getTime() > new Date(q.after).getTime();
    }
  );
