const rateLimit = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes default
    maxRequests = 100,         // default max requests
    keyGenerator = (req) => req.headers['x-user-id'] || req.ip,
  } = options;

  return async (req, res, next) => {
    const key = keyGenerator(req);
    const redisKey = `${key}:${Math.floor(Date.now() / windowMs) * windowMs}`;
    const redisClient = req.app.locals.redis;

    try {
      let currentCount = await redisClient.get(redisKey);
      currentCount = currentCount ? parseInt(currentCount, 10) : 0;

      if (currentCount >= maxRequests) {
        return res.status(429).json({
          message: `Rate limit exceeded. Try again in ${Math.floor(windowMs / 1000)} seconds.`,
        });
      }

      const pipeline = redisClient.multi();
      pipeline.incr(redisKey);
      pipeline.expire(redisKey, windowMs / 1000); // expire in seconds
      await pipeline.exec();

      next();

    } catch (error) {
      console.error("Error in rate limit middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export default rateLimit;