const addTypeName = document.querySelector('#add_type_name_modal');
document.querySelector('#add_type_service_btn').addEventListener('click', () => {
  addTypeName.classList.add('is-shown');
});

$('#add_type_service').click(() => {
  const name = $('#add_type_name').val();

  let issues = false;
  if (!name) {
    issues = true;
    $('.type_name_issue').text(' الاسم حقل ضروري');
    $('#add_type_name').addClass('issues_input');
  }

  if (issues) return;

  $.post({
    method: 'POST',
    url: '/api/admin/type_services/add',
    data: {
      name,

    },
  })
    .then((data) => {
      $('.add-user-message').text(data.message);
      setTimeout(() => {
        window.location.reload(true);
      });

      //
    })
    .fail((error) => {
      $('#add_type_name').addClass('issues_input');
      $('.add-user-message').text(error.responseJSON.issues.all.message);
    });
});

document.querySelector('#add_type_name_modal_close').addEventListener('click', () => {
  document.getElementById('add_type_name').value = '';

  addTypeName.classList.remove('is-shown');
});
document.querySelector('#add_type_name_modal_cancel').addEventListener('click', () => {
  document.getElementById('add_type_name').value = '';
  addTypeName.classList.remove('is-shown');
});

const editTypeServiceModal = document.getElementById('edit_type_name_modal');

let updateId;
let updateTypeName;

function openEditTypeNameModal(dataTypeSer) {
  editTypeServiceModal.classList.add('is-shown');

  updateId = dataTypeSer.getAttribute('data-id');
  updateTypeName = dataTypeSer.getAttribute('data-name');
  document.getElementById('edit_type__service_name').value = updateTypeName;
}

$('#edit_type_service').click(() => {
  const name = $('#edit_type__service_name').val();

  let issues = false;
  if (!name) {
    issues = true;
    $('.edit_type__service_name_issue').text(' الرابط حقل ضروري');
    $('#edit_type__service_name').addClass('issues_input');
  }

  if (issues) return;

  $.post({
    method: 'PUT',
    url: `/api/admin/type_services/update/${updateId}`,
    data: {
      name,
    },
  })
    .then((data) => {
      $('.add-user-message').text(data.message);
      setTimeout(() => {
        window.location.reload(true);
      });
    })
    .fail((error) => {
      $('#edit_type__service_name').addClass('issues_input');
      $('.add-user-message').text(error.responseJSON.issues.all.message);
    });
});

document.querySelector('#edit_type_name_modal_close').addEventListener('click', () => {
  editTypeServiceModal.classList.remove('is-shown');
});

document.querySelector('#edit_type_name_modal_cancel').addEventListener('click', () => {
  editTypeServiceModal.classList.remove('is-shown');
});

const deleteTypeServiceModal = document.getElementById('delete_item_modal');

let deleteTypeNameId;

function DeleteTypeSer(id) {
	 deleteTypeNameId = id.getAttribute('data-id');
  deleteTypeServiceModal.classList.add('is-shown');
}

$('#delete_item_btn').click(() => {
	  $.post({
    method: 'DELETE',
    url: `/api/admin/type_services/delete/${deleteTypeNameId}`,
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
});

document
  .querySelector('#delete_item_modal_close')
  .addEventListener('click', () => {
    deleteTypeServiceModal.classList.remove('is-shown');
  });

document
  .querySelector('#delete_item_modal_cancel')
  .addEventListener('click', () => {
    deleteTypeServiceModal.classList.remove('is-shown');
  });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.getElementById('add_type_name').value = '';

    addTypeName.classList.remove('is-shown');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    editTypeServiceModal.classList.remove('is-shown');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    deleteTypeServiceModal.classList.remove('is-shown');
  }
});
