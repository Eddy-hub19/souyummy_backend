const controllersWraper = (controller) => {
  const func = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = controllersWraper;
