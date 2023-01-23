const bodyParser = require('body-parser')
const url = require('url')


const cors = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

const queryReader = function (app) {
  app.use((req, res, next) => {
    try {
      const parsed = url.parse(req.url, true);
      req.query = Object.assign({}, parsed.query);
    }

    catch (error) {
      console.error(error);
    }
    next();
  })

  // b, kb, mb, gb, tb ,pb
  app.use(bodyParser.json({ limit: process.env.DOWNLOAD_LENGTH }));
  app.use(bodyParser.urlencoded({ extended: false }));
}

const contentReader = function (app) {
  app.use((req, res, next) => {
    try {
      const parsed = url.parse(req.url, true);
      req.query = Object.assign({}, parsed.query);
    }

    catch (error) {
      console.error(error);
    }
    next();
  })

  // b, kb, mb, gb, tb ,pb
  app.use(bodyParser.json({ limit: process.env.DOWNLOAD_LENGTH }));
  app.use(bodyParser.urlencoded({ extended: false }));
}

exports.download = function (app) {
  app.use(cors);
  queryReader(app);
  contentReader(app);
}