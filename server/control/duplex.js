import bodyParser from 'body-parser'
import url from 'url'

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

export const download = function (app) {
  queryReader(app);
  contentReader(app);
}