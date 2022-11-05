const express = require('express');
const ExpressError = require('./expressError');
const { getNums, getMean, getMedian, getMode } = require('./helper');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/mean", (req, res, next) => {
    try {
        const nums = getNums(req.query.nums);
        const result = getMean(nums);

        return res.json({ operation: "mean", value: result });
    } catch (err) {
        next(err);
    }
});


app.get("/median", (req, res, next) => {
    try {
        const nums = getNums(req.query.nums);
        const result = getMedian(nums);

        return res.json({ operation: "median", value: result });
    } catch (err) {
        next(err);
    }
});


app.get("/mode", (req, res, next) => {
    try {
        const nums = getNums(req.query.nums);
        const result = getMode(nums);

        return res.json({ operation: "mode", value: result });
    } catch (err) {
        next(err);
    }
});


app.get("/all", (req, res, next) => {
    try {
        const nums = getNums(req.query.nums);
        const mean = getMean(nums);
        const median = getMedian(nums);
        const mode = getMode(nums);

        return res.json({
            operation: "all",
            mean: mean,
            median: median,
            mode: mode
        });
    } catch (err) {
        next(err);
    }
});

app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});
app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});