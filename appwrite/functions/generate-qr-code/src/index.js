const { Readable } = require('node:stream');
const sdk = require('node-appwrite');
const QRCode = require('qrcode');

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

const generateCode = ($id) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(`${$id}`, async (error, url) => {
      if (error == null)
        resolve(url);
      else
        reject(error);
    });
  });
};

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const storage = new sdk.Storage(client);

  if (
    !req.variables.APPWRITE_FUNCTION_ENDPOINT
    || !req.variables.APPWRITE_FUNCTION_API_KEY
  ) {
    console.warn('Environment variables are not set. Function cannot use Appwrite SDK.');
  }
  else {
    client
    // NOtE: the endpoint when running locally has the IP address instead of localhost
      .setEndpoint(req.variables.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(req.variables.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(req.variables.APPWRITE_FUNCTION_API_KEY)
      .setSelfSigned(true);

    try {
      const { $id } = JSON.parse(req.variables.APPWRITE_FUNCTION_EVENT_DATA);
      const url = await generateCode($id);
      const b = Buffer.from(url.split(',')[1], 'base64');
      const f = new sdk.InputFile(Readable.from(b), `${$id}.png`, Buffer.byteLength(b));

      await storage.createFile('63a5edbba06dcceb1879', $id, f, [
        sdk.Permission.read(sdk.Role.any()),
        sdk.Permission.delete(sdk.Role.user()),
      ]);

      res.json({
        message: 'done',
        $id,
      });
    }
    catch (error) {
      res.send(error.message, 500);
    }

    return;
  }

  res.json({
    message: 'Nothing',
  });
};
