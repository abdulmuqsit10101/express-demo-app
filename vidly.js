const Joi = require('joi');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const venres = [
  {
    id: 1,
    type: 'entertaining',
    value: [
      'Avatar',
      'Titanic',
      'Star Wars: The Force Awakens',
      'Avengers: Infinity War',
      'Jurassic World',
      'The Lion King',
      'The Avengers',
      'Furious 7',
      'Frozen II',
    ]
  },
  {
    id: 2,
    type: 'action',
    value: [
      '7500',
      'Ala Vaikunthapurramuloo',
      'Archenemy',
      'Asuraguru',
      'Aswathama',
      'Attack',
      'Ava',
      'Bad Boys for Life',
      'Bamfaad',
      'Bheeshma',
    ]
  },
  {
    id: 3,
    type: 'horror',
    value: [
      'The Exorcist',
      'Halloween',
      'A Nightmare on Elm Street',
      'Night of the Living Dead',
      'Suspiria',
      'The Texas Chainsaw Massacre',
      'Saw',
      'Scream'
    ]
  },
  {
    id: 3,
    type: 'si-fi',
    value: [
      'Annihilation',
      'Star Wars',
      'Star Trek',
      '2001: A Space Odyssey',
      'E.T. the Extra-Terrestrial',
      'aliens',
      'Blade Runner',
      'Back to the Future'
    ]
  },
]


// <============ GET ALL ============>


app.get('/vidly/venres', (req, res) => {
  res.send(venres);
})


// <============ GET INDIVIDUAL ============>


app.get('/vidly/venres/:type', (req, res) => {

  // Find venre from venres list.
  const venre = venres.find(v => v.type === req.params.type);

  // If venre not exists.
  if(!venre) { return
    res.status(404).send(`Can not find venres of ${req.params.name} type`);
  }

  // Send venre.
  res.send(venre.value);

})


// <============ POST VENRE ============>


app.post('/vidly/venres', (req, res) => {

  // Defined Joi schema for validation of body.
  const schema = {
    type: Joi.string().min(3).required(),
    value: Joi.array().items(Joi.string().min(3).required()),
  }

  // Destructure error from joi validate.
  const { error } = Joi.validate(req.body, schema);
  console.log(error);

  // If found error's value is not null do this.
  if(error){
    return res.status(400).send(result.error.details[0].message);
  }

  // Create new venre to post in venres.
  const venre = {
    id: venres.length + 1,
    type: req.body.type,
    value: req.body.value,
  };
  venres.push(venre);
  res.send(venre);

});



app.post('/vidly/venres', (req, res) => {

  // Defined Joi schema for validation of body.
  const schema = {
    type: Joi.string().min(3).required(),
    value: Joi.array().items(Joi.string().min(3).required()),
  }

  // Destructure error from joi validate.
  const { error } = Joi.validate(req.body, schema);
  console.log(error);

  // If found error's value is not null do this.
  if(error){
    return res.status(400).send(result.error.details[0].message);
  }

  // Create new venre to post in venres.
  const venre = {
    id: venres.length + 1,
    type: req.body.type,
    value: req.body.value,
  };
  venres.push(venre);
  res.send(venre);

});



app.listen(PORT, () => {
  console.log('Server is listening on ' + `http://localhost:${PORT}`)
})


