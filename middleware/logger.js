function authenticate(req, res, next){
  console.log('Logging...')
  next();
}

module.exports = authenticate;
