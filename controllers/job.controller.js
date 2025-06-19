import jobModel from "../models/job.model.js";

// create job
export const createJobController = async (req, res, next) => {
  const { company, position, workLocation } = req.body;
  if (!company || !position || !workLocation) {
    return next(new Error("Provide all required fields"));
  }
  req.body.createdBy = req.user.userId;
  const job = await jobModel.create(req.body);
  res.status(201).json({
    success: true,
    message: "Job created successfully",
    job,
  });
};

// get all jobs
export const getAllJobs = async (req, res, next) => {
  const jobs = await jobModel.find({ createdBy: req.user.userId });
  if (!jobs) {
    return next(new Error("Jobs are not found"));
  }
  res.status(200).json({
    success: true,
    totalJobs: jobs.length,
    jobs,
  });
};

//update job by its id
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position, status, workType, jobType, workLocation } =
    req.body;
  if (
    !company &&
    !position &&
    !status &&
    !workType &&
    !jobType &&
    !workLocation
  ) {
    return next(new Error("Please provide at least one field to update job"));
  }
  // find job
  const job = await jobModel.findOne({ _id: id });
  if (!job) {
    return next(new Error(`No job found with this id ${id}`));
  }
  if (!job.createdBy.equals(req.user.userId)) {
    return next(new Error("You are not authorized to update this job"));
  }

  // update
  const updatedJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  // if (company) job.company = company;
  // if (position) job.position = position;
  // if (status) job.status = status;
  // if (workType) job.workType = workType;
  // if (jobType) job.jobType = jobType;
  // if (workLocation) job.workLocation = workLocation;
  res.status(200).json({
    success: true,
    message: "Job updated successfully",
    updatedJob,
  });
};

//delete job with its id
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  const job = await jobModel.findOne({ _id: id });
  if (!job) {
    return next(new Error(`No job found with this id ${id}`));
  }
  if (!job.createdBy.equals(req.user.userId)) {
    return next(new Error("You are not authorized to delete this job"));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
};
