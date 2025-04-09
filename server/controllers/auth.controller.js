import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();

    jwt.sign(
      {
        id: userSaved._id,
      },
      process.env.JWT_SECRET_KEY || "",
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) console.log(err);
        res.cookie('token', token)
        res.json({
          message: 'User created successfully'
        })
      }
    );

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  res.send("login");
};
