import Users from '../models/User.js';
import fs from 'fs-extra';
import path from 'path';
import bcrypt from 'bcrypt';

export const Register = async (req, res) => {
  const { name, email, password } = req.body;

  const checkEmail = await Users.findOne({
    where: {
      email: email,
    },
  });

  console.log(req.body);

  if (checkEmail) {
    return res.status(400).json({
      msg: 'Email has been used!',
    });
  }
  if (!name || !email || !password) {
    return res.status(400).json({
      msg: 'All fields must be filled!',
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err);
  }
};

export const viewSignin = async (req, res) => {
  try {
    if (req.session.user == null || req.session.user == undefined) {
      res.render('index', {
        title: 'Waduc Waring | Login',
      });
    } else {
      res.redirect('/admin/article');
    }
  } catch (error) {
    res.redirect('/admin/signin');
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.redirect('/');
    }

    const match = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (!match)
      return res
        .status(400)
        .json({ msg: 'The password you entered is incorrect!' });

    req.session.user = {
      id: user[0].id,
      email: user[0].email,
      name: user[0].name,
    };
    res.redirect('/admin/article');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

export const Logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
