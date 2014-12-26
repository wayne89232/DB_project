/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Wei'
  });
};

exports.name2 = function (req, res) {
  res.json({
    name: 'Wei2'
  });
};
