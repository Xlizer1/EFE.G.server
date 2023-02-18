import Joi from "joi";
import jwt from "jsonwebtoken";
import HomeSummaryModel from "./models/HomeSummary.js";

import User from "./models/User.js";

const router = (app) => {
  app.post("/register", async (req, res) => {
    const { email, password, repeated_passwrod } = req.body;

    const bodySchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      repeated_passwrod: Joi.string(),
    });

    if (repeated_passwrod !== password)
      return res
        .status(400)
        .send("Your repeated the password in the second field worng");

    const validateResources = bodySchema.validate(req.body);

    if (validateResources.error) {
      res.statusCode = 400;
      res.send(validateResources.error.details[0].message);
      return;
    }

    const userExist = await User.findOne({ email });

    if (userExist) return res.status(400).send("User Already Exist");

    const user = new User({ email: email, password: password });

    await user.save();

    res.status(201);
    res.send({ message: "Registerd successfuly in the database", user: user });
  });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const bodySchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const validateResources = bodySchema.validate(req.body);

    if (validateResources.error) {
      res.statusCode = 400;
      res.send(validateResources.error.details[0].message);
      return;
    }

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .send("No user found in the database matches your entry");

    const token = jwt.sign({ sub: user._id }, user.salt);

    res.status(200).json({ message: "Logged in successfuly", token: token });
  });

  app.get("/homeSummary", async (req, res) => {
    const _id = "63f0bb112c2e7047eee92fbb";
    const summary = await HomeSummaryModel.findOne({ _id });

    res.send(summary);
  });

  app.put("/homeSummary1/update", async (req, res) => {
    try {
      const { summary } = req.body;

      const bodySchema = Joi.object({
        summary: Joi.string().required(),
      });

      const validateResources = bodySchema.validate(req.body);

      if (validateResources.error)
        return res.status(400).send(validateResources.error.details[0].message);

      const updatedSummary = await HomeSummaryModel.updateOne(
        { _id: "63f0bb112c2e7047eee92fbb" },
        {
          $set: {
            summary1: summary,
          },
        }
      );
      res.status(200).send("Summary updated successfuly");
    } catch (error) {
      res.send(error.message);
    }
  });

  app.put("/homeSummary2/update", async (req, res) => {
    try {
      const { summary } = req.body;

      const id = "63f0bb112c2e7047eee92fbb";

      const bodySchema = Joi.object({
        summary: Joi.string().required(),
      });

      const validateResources = bodySchema.validate(req.body);

      if (validateResources.error)
        return res.status(400).send(validateResources.error.details[0].message);

      let updatedSummary = await HomeSummaryModel.updateOne(
        { id: id },
        {
          $set: {
            summary2: summary,
          },
        }
      );

      res.status(200).send("Summary updated successfuly");
    } catch (error) {
      res.send(error.message);
    }
  });

  app.get("*", (req, res) => res.send("URL Not Found"));
};

export default router;
