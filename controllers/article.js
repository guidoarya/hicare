import Article from '../models/Article.js';
import fs from 'fs-extra';
import path from 'path';
import { title } from 'process';

export const getArticle = async (req, res) => {
  try {
    const article = await Article.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'createdAt',
        'imageUrl',
      ],
    });
    res.render('admin/article/view_article', {
      title: 'Hicare | Article',
      article,
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).send(`Error, ${error}`);
  }
};

export const addArticle = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(404).send('Image field must be filled!');
    }

    if (!title || !description) {
      return res.status(404).send('All field must be filled!');
    }

    await Article.create({
      title: title,
      description: description,
      imageUrl: `uploads/${req.file.filename}`,
    });
    res.redirect('/article');
  } catch (error) {
    res.status(500).send(`Error, ${error}`);
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    console.log(req.body);
    if (req.file == undefined) {
      await Article.update(req.body, {
        where: {
          id: id,
        },
      });
    } else {
      await fs.unlink(path.join(`public/${article.imageUrl}`));
      await Article.update(
        {
          title: title,
          description: description,
          imageUrl: `${req.file.filename}`,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }
  } catch (error) {
    res.status(500).send(`Error, ${error}`);
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findOne({ id: id });

    await Article.destroy({
      where: {
        id: id,
      },
    });
    await fs.unlink(path.join(`public/${article.imageUrl}`));

    res.redirect('/admin/article');
  } catch (error) {
    res.status(500).send(`Error, ${error}`);
  }
};
