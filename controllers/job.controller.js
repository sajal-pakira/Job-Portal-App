export const createJobController = async (req, res, next) => {
  const { company, position, workLocation } = req.body;
  if (!company || !position || !workLocation) {
    return next(new Error("Provide all required fields"));
  }
  req.body.crea
};
