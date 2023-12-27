let deleteServiceId;

function deleteService(service) {
  const deleteServiceModal = document.getElementById(
    'delete_item_service_modal',
  );
  deleteServiceModal.classList.add('is-shown');
  deleteserviceId = service.getAttribute('data-id');
  console.log(deleteserviceId);
}
function cancel() {
  document
    .getElementById('delete_item_service_modal')
    .classList.remove('is-shown');
}

$('#delete_item_service_btn').click(() => {
  const id = deleteserviceId;
  setTimeout(() => {
    $.post({
      method: 'DELETE',
      url: `${host}api/admin/service/delete/${id}`,
    })
      .then(() => {
        setTimeout(() => {
          window.location.reload(true);
        });
        //
      })
      .fail((error) => {
        $('.add-user-message').text(error.responseJSON.issues.all.message);
      });
  }, 1000);
});
