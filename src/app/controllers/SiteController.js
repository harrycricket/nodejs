const mongoose = require('../../utils/mongoose');
const Course = require('../models/Course');
class SiteController {
    // [GET] /
    async home(req, res, next) {
        try {
            const courses = await Course.find({}).exec();
            res.render('home', { courses: mongoose.multipleMongoosesToObject(courses) });
            // res.json(courses);
        } catch (err) {
            next(err);
        }
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
