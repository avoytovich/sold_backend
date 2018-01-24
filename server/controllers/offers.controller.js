const { Offers } = require('./../models');
const { Proposals } = require('./../models');
const { User } = require('./../models');
const { send } = require('./../helper/mailer');

module.exports = {
  create(req, res) {
    Proposals.findOne({
      include: [User],
      where: {
        title: req.body.title
      }
    })
      .then(proposal => {
        let mailOptions = {
          from: '"soldapp" <soldapp@ukr.net>',
          to: proposal.dataValues.User.email,
          subject: 'Offer from soldApp',
          text: req.body.offer,
          html: `<b>${req.body.offer}</b>`
        };
        send(mailOptions);
        Offers.create({
          title: req.body.offer,
          ProposalsId: proposal.dataValues.id,
          UserId: req.decoded.id
        })
          .then(offer => {
            res.status(200).json({message: 'You have successfully send offer!'});
          });
      })
        .catch(error => res.status(400).send(error));
  }
};
