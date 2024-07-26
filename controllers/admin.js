const Project = require("../models/project");
const Role = require("../models/role");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// const projects = [];

exports.createProject = (req, res, next) => {
  console.log("inside the project add");
  const {
    body: { title, description },
  } = req;
  const project = new Project({ title, description });
  project.save();
  res.status(200).json({ status: "success", data: project });
};

exports.createRole = async (req, res) => {
  const {
    body: { projectName, role, description },
  } = req;
  // try {
  const project = Project.find({ title: projectName })
    .then((project) => {
      // console.log("project_id = ", project);
      const roleSave = new Role({
        projectId: String(project[0]._id),
        role,
        description,
      });
      roleSave.save();
      res.json({ message: "role is added" });
    })
    .catch((err) => {
      res.json({ status: "role is not added" });
    });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send({ status: "failed", error: err });
  // }
};
exports.listProject = async (req, res) => {
  // const project = new Project();
  const projectId = req.query.id;
  try {
    const projects = projectId
      ? Array(await Project.findById(projectId))
      : await Project.find();
    console.log("projects = ", projects);
    const projectList = await Promise.all(
      projects.map(async (project) => {
        const roles = await Role.find({
          projectId: String(project._id),
        }).exec();
        const projectWithRoles = {
          ...project.toObject(),
          roles: roles,
        };
        return projectWithRoles;
      })
    );
    console.log("project = ", projects);
    console.log("roles  = ", projectList);

    res.json({ status: "success", data: projectList });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.editProject = async (req, res) => {
  const { _id, title, description } = req.body;

  try {
    const project = await Project.updateOne(
      { _id },
      { $set: { title, description } }
    );

    res.status(200).send({ status: "success", data: project });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
exports.editRole = async (req, res) => {
  const { _id, projectId, role, description } = req.body;

  try {
    const updatedRole = await Role.updateOne(
      { _id },
      { $set: { role, description } }
    );

    res.status(200).send({ status: "success", data: updatedRole });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
