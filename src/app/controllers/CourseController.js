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

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    async update(req, res, next) {
        try {
            await Course.updateOne({ _id: req.params.id }, req.body);
            res.redirect('/me/stored/courses');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CourseController();
