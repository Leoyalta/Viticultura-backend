const notFoundHandler = () => {
  (req, res) => {
    res.status(404).json({
      message: `${req.url} rout is not found.`,
    });
  };
};

export default notFoundHandler;
