const db = require('../../../models/index');

require('dotenv').config();

exports.createTicket = async (req, res) => {
  try {
    const issues = {
      status: false,
      subject: {
        status: false,
        message: ""
      },
      type: {
        status: false,
        message: ""
      },
      customType: {
        status: false,
        message: "",
        text: {
          status: false,
          message: ""
        },
        value: {
          status: false,
          message: ""
        },
      },
      message: {
        status: false,
        message: ""
      },
      orderId: {
        status: false,
        message: ""
      },
    };
    const { subject, message, type, customType, orderId } = req.body;
  //  console.log('hi')
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: false,
        type: "required",
        issues: {
          status: true,
          all: {
            status: true,
            message: "كل الحقول مطلوبة"
          }
        }
      });
    }
    
    if (typeof subject === "undefined" || !subject) {
        issues.status = true;
        issues.subject.status = true;
        issues.subject.message = "حقل مطلوب";
    } 

    if (typeof message === "undefined" || !message) {
        issues.status = true;
        issues.message.status = true;
        issues.message.message = "حقل مطلوب";
    } 
    if (typeof type === "undefined" || !type) {
        issues.status = true;
        issues.type.status = true;
        issues.type.message = "You should send type as a numbe type as string ex: typee: '5'";
    } else if(isNaN(Number(type))) {
      issues.status = true;
      issues.type.status = true;
      issues.type.message = "You should send orderId a number or customType.value as string ex: orderId: '5'";
    } else if(Number(type) === 1) {
      if(typeof orderId === "orderId" || !orderId) {
        issues.status = true;
        issues.orderId.status = true;
        issues.orderId.message = "حقل مطلوب";
      } else if(isNaN(Number(orderId))) {
        issues.status = true;
        issues.orderId.status = true;
        issues.orderId.message = "You should send orderId a number or customType.value as string ex: orderId: '5'";
      }
    } else if(Number(type) === 1 || Number(type) === 2) {
      if (typeof customType !== "object") {
        issues.status = true;
        issues.customType.status = true;
        issues.customType.message = "You should send type as object";
      }  else {
        //console.log(type)
        if(typeof customType.text === "undefined" || !customType.text) { 
            issues.status = true;
            issues.customType.text.status = true;
            issues.customType.text.message = "حقل مطلوب";
        } 
        if(typeof customType.value === "undefined" || !customType.value) { 
            issues.status = true;
            issues.customType.value.status = true;
            issues.customType.value.message = "حقل مطلوب";
        } else if(isNaN(Number(customType.value))){
            issues.status = true;
            issues.customType.value.status = true;
            issues.customType.value.message = "You should send customType.value a number or customType.value as string ex: customType.value: '5'";
        }
      }
    }
    if(issues.status) {
      return res.status(400).json({
        status: false,
        type: "required",
        issues,
      });
    }
    db.Tickets.find({})
    .then((tickets) => {
        db.Tickets.create({
            ticket: tickets.length !== 0? tickets[tickets.length - 1].ticket + 1:1,
            subject,
            message,
            userId: req.user._id,
            type: Number(type) || -1,
            'customType.text': typeof customType !== 'undefined'?customType.text:'',
            'customType.value': typeof customType !== 'undefined'?Number(customType.value):-1,
            orderId: Number(type.value) === 1? Number(req.body.orderId):-1
        })
        .then((newTicket) => {
           return res.status(200).json({ status: true, _id: newTicket._id });
        })
        .catch((err) => {
        //  console.log(err)
          return res.status(500).json({
              error: true,
              status: true,
              type: 'newTicket',
              issues: {
                status: true,
                all: {
                  status: true,
                  message: "حدث خطأ ما تواصل مع الدعم الفني"
                }
              }
          });
        })
    })
    .catch((err) => {
        return res.status(500).json({
            error: true,
            status: true,
            type: 'findTicket',
            issues: {
              status: true,
              all: {
                status: true,
                message: "حدث خطأ ما تواصل مع الدعم الفني"
              }
            }
        });
    })
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error: true,
      status: true,
      type: 'site',
      issues: {
        status: true,
        all: {
          status: true,
          message: "حدث خطأ ما تواصل مع الدعم الفني"
        }
      }
    });
  }
};
exports.createMessageTicket = async (req, res) => {
  try {
    // console.log('hi')
    //  return
    const issues = {
      status: false,
      message: {
        status: false,
        message: ""
      }
    };
    const { message } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: false,
        type: "required",
        issues: {
          status: true,
          all: {
            status: true,
            message: "كل الحقول مطلوبة"
          }
        }
      });
    }
    if (typeof message === "undefined" || !message) {
        issues.status = true;
        issues.message.status = true;
        issues.message.message = "حقل مطلوب";
    }
    if(issues.status) {
      return res.status(400).json({
        status: false,
        type: "required",
        issues,
      });
    }

    db.TicketsMessages.find({})
    .then((findTicketsMessages) => {
        db.TicketsMessages.create({
          ticketsMessage: findTicketsMessages.length !== 0? findTicketsMessages[findTicketsMessages.length - 1].ticketsMessage + 1:1,
          ticketId: req.params.ticketId,
          isSender: req.user.role === 1?'Admin':req.user._id,
          isRead: true,
          message: req.body.message,
        })
        .then((newTicketsMessage) => {
          return res.status(200).json({
            status: true,
            ticketsMessage: newTicketsMessage,
          })
        })
        .catch((err) => {
          console.log(err)
          return res.status(500).json({
            error: true,
            status: true,
            type: 'newTicketsMessage',
            issues: {
              status: true,
              all: {
                status: true,
                message: "حدث خطأ ما تواصل مع الدعم الفني"
              }
            }
          });
        })
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        status: true,
        type: 'findTicketsMessage',
        issues: {
          status: true,
          all: {
            status: true,
            message: "حدث خطأ ما تواصل مع الدعم الفني"
          }
        }
      });
    })
   /* db.Tickets.findOne({
      _id: req.params.ticketId
    })
    .then(async (ticket) => {
     // ticket.status = 'waiting';
     // await ticket.save();
    // ticket.status = 'waiting';
     //await ticket.save();
     //console.log()
    
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({
        error: true,
        status: true,
        type: 'updateTicketsMessage',
        issues: {
          status: true,
          all: {
            status: true,
            message: "حدث خطأ ما تواصل مع الدعم الفني"
          }
        }
      });
    })*/
  } catch (error) {
    return res.status(500).json({
      error: true,
      status: true,
      type: 'site',
      issues: {
        status: true,
        all: {
          status: true,
          message: "حدث خطأ ما تواصل مع الدعم الفني"
        }
      }
    });
  }
};
exports.viewsTicketMessage = async (req, res) => {
  try {
    const user = typeof req.user !== 'undefined' ? {
      balance: {
        total: req.user.balance.total,
        spent: req.user.balance.spent,
      },
    } : false;
    db.TicketsMessages.find({ ticketId: req.params.ticketId }, (err, findtTicketsMessages) => {
      if(err) {
        return res.status(500).json({
          error: true,
          type: 'findtTickets',
          message: 'please contact developer for fixing issues',
        });
      }
      return res.status(200).json({
        error: false,
        status: true,
        ticketsMessages: findtTicketsMessages
      });
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      type: 'site',
      message: 'please contact developer for fixing issues',
    });
  }
};