const accountsController = require("./controllers/accountsController");
const bookingsController = require("./controllers/bookingsController");
const adminController = require("./controllers/adminController");
const loginDto = require("./dtos/loginDto");
const accountDto = require("./dtos/accountDto");
const authenticator = require("./helpers/authenticator");
const appointmentModel = require("./models/appointmentModel");

// Controller Routes
const controllerRoutes = app => {
  app.post('/appointment/save', authenticator.isAdmin, adminController.saveAll);
  app.post('/g2-test/book', authenticator.userExists, bookingsController.create);
  app.post('/g-test', authenticator.userExists, bookingsController.show);
  app.post('/g-test/update', authenticator.userExists, bookingsController.update);
  app.post('/register', accountsController.register);
  app.post('/login', accountsController.login);
  app.use('/logout', accountsController.logout);
};

// View Routes
const viewRoutes = app => {
  app.get('/home', (req, res) => {
    res.render('index', {isLogged: loginDto.email, userType: loginDto.userType, docTitle: 'Home - DriveTest'});
  });

  app.get('/login', (req, res) => {
    res.render('login', {isLogged: loginDto.email, userType: loginDto.userType, docTitle: 'Login - DriveTest'});
  });

  app.get('/register', (req, res) => {
    res.render('register', {
      isLogged: loginDto.email, userType: loginDto.userType, docTitle: 'Register - DriveTest'
    });
  });

  app.get('/appointment', authenticator.isAdmin, (req, res) => {
    res.render('appointment', {
      isLogged: loginDto.email,
      userType: loginDto.userType,
      accountInfo: accountDto,
      docTitle: 'Appointments - DriveTest'
    });
  });

  app.get('/g-test', authenticator.userExists, bookingsController.show);

  app.get('/g2-test', authenticator.userExists, async (req, res) => {
    await appointmentModel.find({}, (error, result) => {
      res.render('g2-test', {
        isLogged: loginDto.email,
        userType: loginDto.userType,
        accountInfo: accountDto,
        timeSlots: result,
        docTitle: 'G2 Test - DriveTest'
      });
    }).clone();
  });

  app.get('/', (req, res) => {
    res.render('index', {isLogged: loginDto.email, userType: loginDto.userType, docTitle: 'Home - DriveTest'});
  });

  app.use((req, res) => {
    res.status(404);
    res.render('404', {isLogged: loginDto.email, userType: loginDto.userType, docTitle: 'Error 404'});
  });
};

module.exports = (app) => {
  controllerRoutes(app);
  viewRoutes(app);
};