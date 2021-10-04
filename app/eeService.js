const ee = require('@google/earthengine');
var privateKey = require('./nile-tech-3c124847ed1a.json')

ee.data.authenticateViaPrivateKey(
    privateKey,
    () => {
      ee.initialize(
          null, null,
          () => {
            console.log('Earth Engine client library initialized.');
          },
          (err) => {
            console.log(err);

          });
    },
    (err) => {
      console.log(err);
    });

class EEService {
    static getEEServiceInstance(){
        return instance ? instance : new EEService();
    }

}

module.exports = EEService;