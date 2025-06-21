import jobModel from "../models/job.model.js";
import mongoose from "mongoose";
import moment from "moment";

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
  const {
    status, //enum
    workType, //enum
    jobType, //enum
    searchForPosition,
    searchForCompany,
    searchForWorkLocation,
    sort,
  } = req.query;
  //conditions for searching filters
  const queryObject = {
    createdBy: req.user.userId, // default
  };
  //logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  //search on the basis of position
  if (searchForPosition) {
    queryObject.position = { $regex: searchForPosition, $options: "i" };
  }
  //search on the basis of Company
  if (searchForCompany) {
    queryObject.company = { $regex: searchForCompany, $options: "i" };
  }
  //search on the basis of WorkLocation
  if (searchForWorkLocation) {
    queryObject.workLocation = { $regex: searchForWorkLocation, $options: "i" };
  }
  let queryResult = jobModel.find(queryObject);
  if (sort === "latest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  queryResult = queryResult.skip(skip).limit(limit);
  // jobs count
  const totalJobs = await jobModel.countDocuments(queryResult);
  const noOfPage = Math.ceil(totalJobs / limit);
  const requiredJobs = await queryResult;
  if (!requiredJobs) {
    return next(new Error("No Jobs found"));
  }
  res.status(200).json({
    success: true,
    totalJobs,
    jobs: requiredJobs,
    number_of_pages: noOfPage,
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

//job stats & filter
export const jobStatsController = async (req, res) => {
  const stats = await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);

  // Convert array to object
  const defaultStats = {
    pending: 0,
    reject: 0,
    interview: 0,
  };

  stats.forEach((item) => {
    defaultStats[item.status] = item.count;
  });
  //mothly yearly stats
  let monthlyApplication = await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
    {
      $limit: 6, // last 6 months
    },
  ]);

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(200).json({
    success: true,
    stats: defaultStats,
    monthlyApplication,
  });
};
