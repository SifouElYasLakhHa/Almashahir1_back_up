const addProvider = document.querySelector('#add_provider_modal');
document.querySelector('#add_provider').addEventListener('click', () => {
  addProvider.classList.add('is-shown');
});

document
  .querySelector('#add_provider_modal_close')
  .addEventListener('click', () => {
    addProvider.classList.remove('is-shown');
  });
document
  .querySelector('#add_provider_modal_cancel')
  .addEventListener('click', () => {
    document.getElementById('link_provider').value = '';
    document.getElementById('key_provider').value = '';
    document.getElementById('add_provider_name').value = '';
    document.getElementById('add_provider_des').value = '';

    addProvider.classList.remove('is-shown');
  });
const isUrlValid = (url) => /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.||~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:)@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.||~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)))?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?))?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)|\/|\?))?$/i.test(
  url,
);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    addProvider.classList.remove('is-shown');

    // close modal here
  }
});
$('#add_provider_btn').click(() => {
  const linkApi = $('#link_provider').val();

  const keyProvider = $('#key_provider').val();

  const providerName = $('#add_provider_name').val();

  const providerDes = $('#add_provider_des').val();

  let issues = false;
  if (!linkApi) {
    issues = true;
    $('.link_provider_issue').text(' الرابط حقل ضروري');
    $('#link_provider').addClass('issues_input');
  } else if (!isUrlValid(linkApi)) {
    $('.link_provider_issue').text(' الرابط  غير صحيح');
    $('#link_provider').addClass('issues_input');
  } else if (linkApi.endsWith('/')) {
    linkApi.slice(0, -1);
    console.log(linkApi);
  } if (!keyProvider) {
    issues = true;
    $('.key_provider_issue').text('حقل ضروري key');
    $('#key_provider').addClass('issues_input');
  }	if (!providerName) {
    issues = true;
    $('.addname_provider_issue').text('  حقل ضروري');
    $('#add_provider_name').addClass('issues_input');
  }

  if (issues) return;

  $.post({
    method: 'POST',
    url: '/api/admin/provider/add',
    data: {
      linkApi,
      key: keyProvider,
      description: providerDes,
      name: providerName,
    },
  })
    .then((data) => {
      $('.add-user-message').text(data.message);
      setTimeout(() => {
        window.location.reload(true);
      });
      // window.location.reload();

      //
    })
    .fail((error) => {
      $('#link_provider').addClass('issues_input');
      $('#key_provider').addClass('issues_input');
      $('.add-user-message').text(error.responseJSON.issues.all.message);
    });
});

const editProviderModal = document.querySelector('#edit_provider_modal');
document.querySelector('#edit_provider_data').addEventListener('click', () => {
  editProviderModal.classList.add('is-shown');
});

document
  .querySelector('#edit_provider_modal_close')
  .addEventListener('click', () => {
    editProviderModal.classList.remove('is-shown');
  });

document
  .querySelector('#edit_provider_modal_cancel')
  .addEventListener('click', () => {
    editProviderModal.classList.remove('is-shown');
  });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    editProviderModal.classList.remove('is-shown');
  }
});

let updateProviderId;
let updateProviderName;
let updateProviderDes;
let updateProviderLink;
let updateProviderKey;
let updateProviderStatus;

function openEditProviderModal(data) {
  editProviderModal.classList.add('is-shown');

  updateProviderId = data.getAttribute('data-id');
  updateProviderName = data.getAttribute('data-name');
  updateProviderDes = data.getAttribute('data-description');
  updateProviderLink = data.getAttribute('data-linkApi');
  updateProviderKey = data.getAttribute('data-key');
  updateProviderStatus = data.getAttribute('data-status');

  document.getElementById('edit_provider_name').value = updateProviderName;
  document.getElementById('edit_provider_des').value = updateProviderDes;
  document.getElementById('edit_link_provider').value = updateProviderLink;
  document.getElementById('edit_key_provider').value = updateProviderKey;
  document.getElementById('select_status').value = updateProviderStatus;
}

$('#edit_provider_btn').click(() => {
  const linkApi = $('#edit_link_provider').val();

  const keyProvider = $('#edit_key_provider').val();

  const providerName = $('#edit_provider_name').val();

  const providerDes = $('#edit_provider_des').val();

  const Status = document.querySelector('#select_status').value;

  console.log(Status);

  let issues = false;
  if (!linkApi) {
    issues = true;
    $('.link_provider_issue').text(' الرابط حقل ضروري');
    $('#link_provider').addClass('issues_input');
  } else if (!isUrlValid(linkApi)) {
    $('.link_provider_issue').text(' الرابط  غير صحيح');
    $('#link_provider').addClass('issues_input');
  } else if (linkApi.endsWith('/')) {
    linkApi.slice(0, -1);
    console.log(linkApi);
  } else if (!keyProvider) {
    issues = true;
    $('.key_provider_issue').text('  حقل ضروري key');
    $('#key_provider').addClass('issues_input');
  }

  if (issues) return;
  console.log(linkApi);

  $.post({
    method: 'PUT',
    url: `/api/admin/provider/update/${updateProviderId}`,
    data: {
      linkApi,
      key: keyProvider,
      description: providerDes,
      name: providerName,
      status: Status,
    },
  })
    .then((data) => {
      $('.add-user-message').text(data.message);
      setTimeout(() => {
        window.location.reload(true);
      });
    })
    .fail((error) => {
      $('#edit_ques').addClass('issues_input');
      $('#edit_answer').addClass('issues_input');
      $('.add-user-message').text(error.responseJSON.issues.all.message);
    });
});

const deleteProviderModal = document.getElementById(
  'delete_item_provider_modal',
);

let deleteProviderId;

function DeleteProvider(providerId) {
  deleteProviderModal.classList.add('is-shown');

  deleteProviderId = providerId.getAttribute('data-id');
}

$('#delete_item_provider_modal_btn').click(() => {
  $.post({
    method: 'DELETE',
    url: `/api/admin/provider/delete/${deleteProviderId}`,
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
  .querySelector('#delete_item_provider_modal_close')
  .addEventListener('click', () => {
    deleteProviderModal.classList.remove('is-shown');
  });
document
  .querySelector('#delete_item_provider_modal_cancel')
  .addEventListener('click', () => {
    deleteProviderModal.classList.remove('is-shown');
  });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    deleteProviderModal.classList.remove('is-shown');
  }
});
