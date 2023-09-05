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

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    async store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        await course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }
}

module.exports = new CourseController();
