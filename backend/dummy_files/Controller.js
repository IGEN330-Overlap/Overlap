let PlotModel = require("./models/plot.model");

exports.plotListAll = async (req, res) => {
    let allPlots = await PlotModel.find();
    res.json(allPlots);
}

exports.plotFindByUsername = async (req, res) => {
    let allPlots = await PlotModel.find({
        username: req.params.username
    });
    res.json(allPlots);
}

exports.plotCreate = (req, res) => {
    let newPlot = new PlotModel(req.body)
    newPlot
        .save()
        .then(() => res.json("New plot added."))
        .catch((err) => res.json(err));
}

