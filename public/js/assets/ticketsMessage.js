// let messageTickets;
let idTickets;
let sendMessgaeId;
function openEditTicketsModal(data) {
  // editTicketsModal.classList.add('is-shown');

  const sendMessgae = JSON.parse(data.getAttribute('data'));
  // messageTickets = sendMessgae.message;
  idTickets = sendMessgae.ticket;
  sendMessgaeId = sendMessgae._id;
  // console.log(sendMessgae);
  // document.getElementById('edit_tickets_name').value = messageTickets;
  window.open(`/ticket/${idTickets}`, '_blank');
 	$.get({
    method: 'GET',
    url: `/ticket/views/${sendMessgaeId}`,
  }).then((data) => {
    console.log(data);
    // selectServiceProvider.classList.add('is-shown');
    // selectServiceProvider.classList.toggle('select-service-shown');

    // const options = data.services;
    // let selectHtml = '';

    // console.log(options, options.unshift({ name: 'select' }));
    // selectHtml += '<option>Select Service</option>';
    // for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
    //   selectHtml += `<option value='${JSON.stringify(
    //     options[optionIndex],
    //   )}'>${options[optionIndex].name}</option>`;
    // }

    // document.getElementById('selectBox').innerHTML = selectHtml;
  });
}

$('#edit_tickets_btn').click(() => {
  const message = $('#edit_tickets_message').val();

  $.post({
    method: 'POST',
    url: `/api/ticket/message/${idTickets}/add`,
    data: {
      message,
    },

  })
    .then((data) => {
      $('.add-user-message').text(data.message);
      setTimeout(() => {
        window.location.reload(true);
      });
    })
    .fail((error) => {
      console.log(error);
    });
});

$('#message_replay').click((e) => {
  e.preventDefault();

  const message = $('#message_replay_Post').val();

  $.post({
    method: 'POST',
    url: `/api/ticket/message/${sendMessgaeId}/add`,
    data: {
      message,
    },
  })
    .then(() => {
      const newMesage = document.createElement('div');
      newMesage.innerHTML = message;
      newMesage.classList.add('messsage-wrap-custom');
      const p = document.getElementById('mesages_all');

      p.appendChild(newMesage);
      console.log(p);
    });
});
