const express = require('express');
const router = express.Router();
const studentService = require('../../services/studentService');
const Result = require('../../utils/result');

router.get('/', (req, res) => {
    res.send('获取学生列表');
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    let result;

    if (id) {
        result = await studentService.getStudent(id);
        if (result) {
            res.send(result);
        } else {
            next('ID输入有误');
        }
    } else {
        next('路由错误');
    }
});

router.post('/', async (req, res, next) => {
    const result = await studentService.addStudent(req.body);

    if (result.id) {
        res.send(new Result(result).success());
    } else {
        next(result);
    }
});

router.put('/:id', (req, res) => {
    res.send('修改学生');
});

router.delete('/', (req, res) => {
    res.send('删除学生');
});


module.exports = router;