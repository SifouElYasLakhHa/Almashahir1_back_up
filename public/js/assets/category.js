const addCategory = document.querySelector('add_category_modal');
const editSortServiceCategoryModal = document.querySelector('edit_sort_category_modal');
let editCategoryId;
const deleteCatModal = document.getElementById('delete_item_cat_modal');
let deleteCatId;
const editCatNameModal = document.getElementById('edit_category_modal');

let updateCatNameId;
let updateCatName;
let updateCatDes;
let updateCatSort;
let statusCategory;

$('#add_service_category').click(function() {
  $('.add-category-modal').removeClass('is-shown');
  $('.delete-item-modal').removeClass('is-shown');
  $('#add_category_modal').addClass('is-shown');
})
$('#add_category_modal_cancel').click(function() {
  $('.add-category-modal').removeClass('is-shown');
  $('.delete-item-modal').removeClass('is-shown');
})
$('#add_category_modal_close').click(function() {
  $('.add-category-modal').removeClass('is-shown');
  $('.delete-item-modal').removeClass('is-shown');
})

/*
$('#add_service_category').on('click', function {
  
});

document.querySelector('.edit_sort_modal_category_close').addEventListener('click', () => {
  editSortServiceCategoryModal.classList.remove('is-shown');
});
document.querySelector('.cancel_sort_category_modal').addEventListener('click', () => {
  editSortServiceCategoryModal.classList.remove('is-shown');
});
document.querySelector('#add_category_modal_close').addEventListener('click', () => {
  addCategory.classList.remove('is-shown');
});
document.querySelector('#add_category_modal_cancel').addEventListener('click', () => {
  addCategory.classList.remove('is-shown');
});*/

$('#sort_category_modal_close').click(function() {
  $('#sort_category_modal').removeClass('is-shown');
  $('.add-category-modal').removeClass('is-shown');
  $('.delete-item-modal').removeClass('is-shown');
})
$('#sort_category_modal_cancel').click(function() {
  $('#sort_category_modal').removeClass('is-shown');
  $('.add-category-modal').removeClass('is-shown');
  $('.delete-item-modal').removeClass('is-shown');
})
function editSortCategory($this) {
  editCategoryId = $this.getAttribute('data-id');
  $('#sort_category_name').val($this.getAttribute('data-name'));
  var settings = {
    "url": `${host}api/admin/category/${editCategoryId}/views`,
    "method": "GET",
    "timeout": 0,
  };
  $.ajax(settings).done(function (response) {
    let selectHtmlServices = '';
    selectHtmlServices += '<option id="all">اختيار الترتيب الجديد</option>';
    for (let optionIndex = 0; optionIndex < response.categories.length; optionIndex++) {
      selectHtmlServices += `<option value='${response.categories[optionIndex].name}' data-id='${response.categories[optionIndex]._id}'>${response.categories[optionIndex].name}</option>`;
    }
    //document.getElementById('edit_sort_select_category_sort').innerHTML = selectHtmlServices;
    $('#sort_select_category').append(selectHtmlServices);
    $('#sort_category_modal').addClass('is-shown');
    //editSortServiceCategoryModal.classList.add('is-shown');
  });
}

$('body').click('#edit_sort_category', function() {
  //console.log('hi')
  //$('option:selected', '#sort_select_category').attr('data-id')
  if(typeof $('option:selected', '#sort_select_category').attr('data-id') === 'undefined') {
    $('.edit_sort_select_sort_issues').text('حقل ضروري');
    return
  }
  var settings = {
    "url": `${host}api/admin/category/sort/${editCategoryId}/${$('option:selected', '#sort_select_category').attr('data-id')}`,
    "method": "PUT",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    location.reload();
  })
  .fail((e) => {
    location.reload();
  });
})

$('#add_category').click(() => {
  const categoryName = $('#add_category_name').val();

  const sortCat = document.getElementById('add_select_sort').value;

  let issues = false;
  if (!categoryName) {
    issues = true;
    $('.add_category_name').text('  حقل ضروري');
    $('#category_name_issue').addClass('issues_input');
  }

  if (issues) return;

  $.post({
    method: 'POST',
    url: '/api/admin/category/add',
    data: {
      name: categoryName,
      sort: sortCat,

    },
  })
    .then((data) => {
      $('.add-user-message').text(data.message);
      setTimeout(() => {
        window.location.reload(true);
      });
      //   window.location.reload();

      //
    })
    .fail((error) => {
      $('#add_type_name').addClass('issues_input');
      $('.add-user-message').text(error.responseJSON.issues.all.message);
    });
});


function openEditCatNameModal(dataCat) {
  editCatNameModal.classList.add('is-shown');
  updateCatNameId = dataCat.getAttribute('data-id');
  updateCatName = dataCat.getAttribute('data-name');
  updateCatDes = dataCat.getAttribute('data-description');
  statusCategory = dataCat.getAttribute('data-status');
  updateCatSort = dataCat.getAttribute('data-sort');
  $(`#edit_status_category option[value="${statusCategory}"]`).attr('selected', 'true');
  document.getElementById('edit_category_name').value = updateCatName;
  document.getElementById('edit_category_description').value = updateCatDes;
  document.getElementById('edit_category_sort').value = updateCatSort;
  //   document.getElementById('edit_select_sort').value = updateCatSort;
}

$('#edit_category').click(() => {
  const name = $('#edit_category_name').val();
  const description = $('#edit_category_description').val();
  const status = $('#edit_status_category').val();
  const sort = $('#edit_category_sort').val();
  let issues = false;
  if (!name) {
    issues = true;
    $('.edit_category_name').text('حقل ضروري');
    $('#category_name_issue').addClass('issues_input');
  } else {
    $('.edit_category_name').text('');
    $('#category_name_issue').removeClass('issues_input');
  }

  /*if (!sort) {
    issues = true;
    $('.category_sort_issue').text('حقل ضروري');
    $('#edit_category_sort').addClass('issues_input');
  } else {
    $('.category_sort_issue').text('');
    $('#edit_category_sort').removeClass('issues_input');
  }*/
  
  console.log(issues)
  if (issues) return;
  $.post({
    method: 'PUT',
    url: `${host}api/admin/category/update/${updateCatNameId}`,
    data: {
      name,
      statusShowHide: status,
      description,
      sort
    },
  })
    .then((data) => {
      $('.add-user-message').text(data.message);
      location.reload();
    })
    .fail((error) => {
      $('#edit_category_name').addClass('issues_input');
      $('.add-user-message').text(error.responseJSON.issues.statusShowHide.message);
    });
});

document.querySelector('#edit_category_modal_close').addEventListener('click', () => {
  editCatNameModal.classList.remove('is-shown');
});
document.querySelector('#edit_category_modal_cancel').addEventListener('click', () => {
  editCatNameModal.classList.remove('is-shown');
});



function deleteCategory(id) {
  //document.getElementById('delete_item_cat_modal').classList.add('is-shown');
	deleteCatId = id.getAttribute('data-id');
}

$('body').click('.delete_category', function() {
  //document.getElementById('delete_item_cat_modal').classList.add('is-shown');
  deleteCatId = $(this).attr('data-id');
})

$('#delete_item_cat_btn').click(() => {
	  $.post({
    method: 'DELETE',
    url: `${host}api/admin/category/delete/${deleteCatId}`,
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
  .querySelector('#delete_item_cat_modal_close')
  .addEventListener('click', () => {
    document.getElementById('delete_item_cat_modal').classList.remove('is-shown');
  });

document
  .querySelector('#delete_item_cat_modal_cancel')
  .addEventListener('click', () => {
    document.getElementById('delete_item_cat_modal').classList.remove('is-shown');
  });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    editCatNameModal.classList.remove('is-shown');

    // close modal here
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    addCategory.classList.remove('is-shown');

    // close modal here
  }
});
