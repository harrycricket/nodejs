const { mongooseToObject } = require('../../utils/mongoose');
const Course = require('../models/Course');

class CourseController {
    // [GET] /course:/slug
    async showDetails(req, res, next) {
        try {
            const course = await Course.findOne({ slug: req.params.slug }).exec();
            res.render('courses/showDetails', { course: mongooseToObject(course) });
            // res.json(courses);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CourseController();
