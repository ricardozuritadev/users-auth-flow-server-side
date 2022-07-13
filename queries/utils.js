const queryCatcher =
  (fn, origin) =>
  async (...args) => {
    try {
      const result = await fn(...args);

      return {
        ok: true,
        data: result && result.rows ? result.rows : result,
      };
    } catch (error) {
      console.error(`> [${origin}]: `, error.message);

      return {
        ok: false,
      };
    }
  };

module.exports = {
  queryCatcher,
};
