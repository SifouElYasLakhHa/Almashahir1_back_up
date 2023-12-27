const editStatusService = document.getElementById('status_item_service_modal');
let serviceStatus;
let serviceStatusId;
function editServiceStatus(service) {
  editStatusService.classList.add('is-shown');
	serviceStatus = JSON.parse(service.getAttribute('data-status'))
  serviceStatusId = service.getAttribute('data-id');
  if (serviceStatus) {
  	document.getElementById('status_message').innerHTML = 'هل تريد بالفعل <span style="color: red;"> تعطيل </span> هذه الخدمة؟';
    $('.no').addClass('cancel')
    $('.no').removeClass('delete')
    $('.yes').addClass('delete')
    $('.yes').removeClass('cancel')
  } else {
  	document.getElementById('status_message').innerHTML = 'هل تريد بالفعل <span style="color: red;"> تفعيل </span> هذه الخدمة؟';
    $('.yes').addClass('cancel')
    $('.yes').removeClass('delete')
    $('.no').addClass('delete')
    $('.no').removeClass('cancel')
  }
  
}

function cancelServiceStatus() {
  editStatusService.classList.remove('is-shown');
}

$('#status_item_service_btn').click(() => {
  let status;

  if (serviceStatus) {
    status = false;
  } else {
    status = true;
  }
  $.post({
    method: 'PUT',
    url: `${host}api/admin/service/disable/${serviceStatusId}`,
    data: {
      status,
    },
  })
  .then((data) => {
    $('.add-user-message').text(data.message);
    location.reload();
  })
  .fail((error) => {
    $('.add-user-message').text(error.responseJSON.issues.all.message);
  });
});
