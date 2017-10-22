
const company = {
  id: 2,
  name: 'skilsgarden',
  color: '#01DF74',
  mail: 'ina at example.com',
};
function getCompany(req, res) {
  res.json(company);
}

module.exports = { getCompany };
