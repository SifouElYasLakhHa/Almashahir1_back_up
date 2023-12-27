let subject;
let type;
let textCustomType;
let value;
$("#submit_tickets").click((e) => {
    e.preventDefault();
    const message = $("#message_tickets").val();
    const orderId = $("#ordernumbers_tickets").val();
    const subjects = document.getElementsByName("TicketForm[subject]");
    subjects.forEach((selectSubject) => {
        if (selectSubject.checked) {
            type = selectSubject.getAttribute("subject");
            subject = selectSubject.value;
            console.log(selectSubject.value);
            console.log(selectSubject.getAttribute("subject"));
        }
    });
    const paymentRequests = document.getElementsByName("paymentRequest");

    paymentRequests.forEach((selectPaymentRequest) => {
        if (selectPaymentRequest.checked) {
            value = selectPaymentRequest.getAttribute("text");
            textCustomType = selectPaymentRequest.value;
            console.log(selectPaymentRequest.value);
            console.log(selectPaymentRequest.getAttribute("text"));
        }
    });
    const paymentRequestsTickets = document.getElementsByName("request");

    paymentRequestsTickets.forEach((selectPaymentRequestTicket) => {
        if (selectPaymentRequestTicket.checked) {
            value = selectPaymentRequestTicket.getAttribute("text");
            textCustomType = selectPaymentRequestTicket.value;
            console.log(selectPaymentRequestTicket.value);
            console.log(selectPaymentRequestTicket.getAttribute("text"));
        }
    });

    const addDataTickets = {
        message,
    };

    if (subject) {
        addDataTickets.subject = subject;
    }
    if (type) {
        addDataTickets.type = type;
    }
    if (orderId) {
        addDataTickets.orderId = orderId;
    }
    if (textCustomType && value) {
        addDataTickets.customType = { text: textCustomType, value };
    }

    $.post({
        method: "POST",
        url: "api/ticket/add",
        data: addDataTickets,
    })
        .then((data) => {
          $("#message_tickets").val('');
          $("#ordernumbers_tickets").val('');
          $(".add-user-message-teckits-all").text('تم انشاء تذكرة جديدة بنجاح');
        })
        .fail((error) => {
            console.log(error.responseJSON.issues);
            // $('#add_type_name').addClass('issues_input');
            $(".add-user-message-teckits").text(error.responseJSON.issues.message.message);
            $(".add-user-message-orderId").text(error.responseJSON.issues.orderId.message);
        });
    console.log(addDataTickets);
});
