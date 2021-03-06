const { Profile } = require('./../models');
const constants = require('./../helper/constants');

module.exports = {
  update(req, res) {
    Profile.findOne({
      where: {
        UserId: req.decoded.id
      }
    })
      .then(profile => {
        profile || res.status(404).json({message: 'profileError'});
        profile.update(Object.assign({}, req.body))
          .then(profile => res.status(200).json({
            profile,
            message: constants.messages.profile_was_successfully_updated
          }))
            .catch(error => res.status(400).send(error));
      })
        .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    Profile.findOne({
      where: {
        UserId: req.decoded.id
      }
    })
      .then(profile => {
        res.status(200)
          .json({profile: profile});
      })
        .catch(error => res.status(400).send(error));
  }
};
