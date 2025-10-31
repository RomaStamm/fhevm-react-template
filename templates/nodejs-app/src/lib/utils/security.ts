/**
 * Security Utilities for Node.js Backend
 */

import type { Request } from 'express';

/**
 * Rate limiting storage
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple rate limiter
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetTime) {
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }

  if (record.count < maxRequests) {
    record.count++;
    return true;
  }

  return false;
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(req: Request): string {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

/**
 * Clean up old rate limit records
 */
export function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, record] of requestCounts.entries()) {
    if (now > record.resetTime) {
      requestCounts.delete(key);
    }
  }
}

// Clean up every 5 minutes
setInterval(cleanupRateLimits, 5 * 60 * 1000);
