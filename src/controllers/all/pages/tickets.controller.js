const db = require('../../../models/index');
require('dotenv').config();

exports.ticketsPage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
      role: req.user.role,
      avatar: req.user.avatar,
      gender: req.user.gender,
    } : false;
    
    db.Tickets.find({
      userId: req.user._id,
      status: 'waiting_user'
    })
    .then((ticketsStatus) => {
      db.Tickets.find({
        userId: req.user._id
      })
      .then((tickets) => {
        console.log(tickets.length)
        return res.render('pages/manageTickets', {
          mainTitle: process.env.APP_NAME,
          host: process.env.HOST,
          subTitle: 'الدعم الفني',
          user,
          ticketsArray: tickets,
          url: 'tickets',
          tickets: ticketsStatus.length,
        });
      })
      .catch((e) => {
        return res.status(500).json({
          error: true,
          type: 'site',
          status: false,
          all: {
            status: true,
            message: 'please contact developer for fixing issues',
          }
        });
      })

    })
    .catch((e) => {
      return res.status(500).json({
        error: true,
        type: 'findFaqs',
        issues: {
          all: {
            status: true,
            message: 'please contact developer for fixing issues',
          }
        }
      });
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      type: 'site',
      status: false,
      all: {
        status: true,
        message: 'please contact developer for fixing issues',
      }
    });
  }
};

exports.viewticketPage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
      role: req.user.role,
      avatar: req.user.avatar,
      gender: req.user.gender,
    } : false;
    var objTickets = {};
    if(req.user.role > 1) {
      objTickets.ticket = Number(req.params.ticketId);
      objTickets.userId = req.user._id;
    } else {
      objTickets.ticket = Number(req.params.ticketId);
    }
    
    
    db.Tickets.find({
      userId: req.user._id,
      status: 'waiting_user'
    })
    .then((ticketsStatus) => {
      db.Tickets.findOne(objTickets)
      .populate('userId')
      .then((findTicket) => {
        if(!findTicket) {
          if(req.user.role === 1) {
            return res.redirect('/admin/tickets');
          } else {
            return res.redirect('/tickets');
          }
        } else {
          db.TicketsMessages.find({
            ticketId: findTicket._id
          })
          .then((findTicketsMessages) => {
            return res.render('pages/viewticket', {
              mainTitle: process.env.APP_NAME,
              host: process.env.HOST,
              subTitle: `الدعم الفني - ${findTicket.subject} - ${findTicket.userId.username}`,
              user,
              ticketsObj: findTicket,
              ticketsMessages: findTicketsMessages,
              url: `ticket/${findTicket.ticket}`,
              tickets: ticketsStatus.length,
            });
          })
          .catch((e) => {
            return res.status(500).json({
              error: true,
              type: 'findTicketsMessages',
              issues: {
                status: true,
                all: {
                  status: true,
                  message: 'please contact developer for fixing issues',
                }
              }
            });
          })
        }
      })
      .catch((e) => {
        return res.status(500).json({
          error: true,
          type: 'findTickets',
          issues: {
            status: true,
            all: {
              status: true,
              message: 'please contact developer for fixing issues',
            }
          }
        });
      })
    })
    .catch((e) => {
      return res.status(500).json({
        error: true,
        type: 'findFaqs',
        issues: {
          all: {
            status: true,
            message: 'please contact developer for fixing issues',
          }
        }
      });
    })


    
  } catch (e) {
    return res.status(500).json({
      error: true,
      type: 'site',
      issues: {
        status: true,
        all: {
          status: true,
          message: 'please contact developer for fixing issues',
        }
      }
    });
  }
};