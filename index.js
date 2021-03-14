const Joi = require('joi');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;
const Logger = require('./middleware/logger.js');
const Authenticate = require('./middleware/Authentication.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(Logger);

app.use(Authenticate);

var courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
  res.send('Hello World!x');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if(!course){
    res.status(404).send(`Course with ID = ${req.params.id} is not found.`);
  }
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  console.log('I am in api courses post call.');

  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);

  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  else {
    const course = {
      id: courses.length + 1,
      name: req.body.name
    };
    courses.push(course);
    res.send(course);
  }
});

app.put('/api/courses/:id', (req, res) => {
  console.log('I am in api courses put call.')
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if(!course){res.status(404).send('Not Found'); return;}

  const schema = {
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(req.body, schema);
  if(result.error){res.status(400).send(result.error.details[0].message); return;}

  course.name = req.body.name;
  res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if(!course){res.status(404).send('Not Found'); return;}
  const newCourses = [...courses].filter(course => course.id !== parseInt(req.params.id));
  courses = [...newCourses];
  res.send(courses);
})

app.listen(PORT, () => {
  console.log('Listening on port => ', PORT)
});
