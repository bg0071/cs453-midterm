function logger(req, res, next) {
  const startTime = process.hrtime.bigint();

  res.on("finish", () => {
    const endTime = process.hrtime.bigint();
    const elapsedMilliseconds =
      Number(endTime - startTime) / 1_000_000;

    console.log(
      `${req.method} ${req.originalUrl} ` +
      `${res.statusCode} ${elapsedMilliseconds.toFixed(2)} ms`
    );
  });

  next();
}

module.exports = logger;