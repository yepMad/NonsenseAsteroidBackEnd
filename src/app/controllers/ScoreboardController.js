import Scoreboard from '../schemas/Scoreboard';

class ScoreboardController {
  async index(req, res) {
    let scores;

    try {
      scores = await Scoreboard.find()
        .sort({ score: 'desc' })
        .limit(10)
        .select('name score');
    } catch (e) {
      return res.status(400).json({ error: 'Database error' });
    }

    return res.json(scores);
  }

  async update(req, res) {
    const { token, name, score } = req.body;

    const checkUserExists = await Scoreboard.find({ token }, { limit: 1 });

    try {
      if (checkUserExists.length === 0) {
        await Scoreboard.create({ token, name, score });
      } else {
        await Scoreboard.findOneAndUpdate({ token }, { score });
      }
    } catch (e) {
      return res.status(400).json({ error: 'Database error' });
    }

    const scores = await Scoreboard.find()
      .sort({ score: 'desc' })
      .limit(10)
      .select('name score');

    return res.json(scores);
  }
}

export default new ScoreboardController();
