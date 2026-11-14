import aj from '../lib/arcjet.js';
import { isSpoofedBot } from '@arcjet/inspect';


export const arcJetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit) {
        return res.status(429).json({
          status: 'Failed',
          message: 'Rate limit exceeded'
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          status: 'Failed',
          message: 'Bot access denied'
        });
      } else {
        return res.status(403).json({
          status: 'Filed',
          message: 'Access denied by security policy'
        });
      }
    };

    if (decision.reason.isSpoofedBot()) {
      return res.status(403).json({
        status: 'Failed',
        Error: 'Spoofeb bot detected',
        message: 'Malicious bit activity detected'
      });
    };

    next();

  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: 'Arcjet protection error',
      Error: error.message
    });
  };
};