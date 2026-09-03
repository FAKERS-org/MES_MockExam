/**
 * Exam configuration — all exam-specific settings in one place.
 *
 * To customise an environment, only this file and globals.css need to change.
 * Components reference `EXAM_CONFIG` instead of hard-coded values.
 */

export const EXAM_CONFIG = {
  /** Total exam duration in seconds (e.g. 45 × 60 = 2700s = 45 min) */
  totalSeconds: 45 * 60,

  /** Percentage of total time remaining that triggers the "low" warning state */
  lowTimeThreshold: 0.2, // 20% remaining

  /** Percentage of total time remaining that triggers the "critical" alert state */
  criticalTimeThreshold: 0.1, // 10% remaining

  /** Number of questions in the exam */
  totalQuestions: 10,
} as const;
