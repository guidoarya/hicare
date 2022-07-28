import Article from '../models/Article.js';

export const ArticleList = async (req, res) => {
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
    res.json({ article });
  } catch (error) {
    res.status(500).send(`Error, ${error}`);
  }
};
