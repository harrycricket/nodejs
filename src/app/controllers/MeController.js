const mongoose = require('../../utils/mongoose');
const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    async storedCourses(req, res, next) {
        try {
            const courses = await Course.find({}).exec();
            res.render('me/stored-courses', {
                courses: mongoose.multipleMongoosesToObject(courses),
            });
        } catch (err) {
            next(err);
        }
    }

    // [GET] /me/stored/news
    // async showMyNews(req, res, next) {}
}

module.exports = new MeController();
