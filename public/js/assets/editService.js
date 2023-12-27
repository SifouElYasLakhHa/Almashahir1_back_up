const editServiceModal = document.querySelector('#edit_service_modal');
const editSortServiceModal = document.querySelector('#edit_sort_modal');

let editServiceId;
let editServiceCategory;
let editServiceName;
const editServiceTypeServicesValue = document.querySelector('#edit_open_type_services_value');
let editServiceProvider;
let editServiceProviderSelectSer;
const editDripfeed = document.querySelector('#edt_dripfeed');
let editPercentage;
let editFixed;
let editMax;
let editMin;
let editNewPrice;
let editLinkDuplicates;
let typeService;
let originalPriceSer;

// let descriptionService;
const editStatusServiceProvider = document.getElementById('edit_status_service_provider');
const editRefill = document.getElementById('edit_Refill_modal');
let editDays;
let fixRate;

function editService(data) {
  editServiceModal.classList.add('is-shown');
  document.querySelector('#edit_select_service_allow').classList.add('is-shown');
  document.querySelector('#min_order_swich_edit').classList.add('is-shown');
  document.querySelector('#max_order_swich_edit').classList.add('is-shown');
  document.getElementById('edit_min_order_value').setAttribute('disabled', '');
  document.getElementById('edit_max_order_value').setAttribute('disabled', '');
  editServiceCategory = data.getAttribute('data-categoryId');
  editServiceName = data.getAttribute('data-name');
  editServiceId = data.getAttribute('data-_id');
  typeService = data.getAttribute('data-type');
  editMin = data.getAttribute('data-min');
  editMax = data.getAttribute('data-max');
  editNewPrice = data.getAttribute('data-price');
  editLinkDuplicates = data.getAttribute('data-linkDuplicates');
  originalPriceSer = data.getAttribute('data-originalPrice');
  fixRate = data.getAttribute('data-fixRate');
  editServiceProvider = data.getAttribute('data-providerId');
  
  if (JSON.parse(data.getAttribute('data-refill'))) {
    document.getElementById('edit_Refill_modal').classList.add('is-shown');
    document.getElementById('edit_open_Refill').setAttribute('checked', '');
  }

  editServiceProviderSelectSer = data.getAttribute('data-providerId');

  if (allData.providerId) {
    document.querySelector('#edit_select_service').classList.add('is-shown');

    $.get({
      method: 'GET',
      url: `${host}api/admin/provider/${editServiceProvider}/services`,
    }).then((data) => {
      // document.querySelector('#edit_select_service').classList.add('is-shown');
      // selectServiceProvider.classList.toggle('select-service-shown');
      const options = data.services;
      let selectHtmlEdit = '';

      for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
        selectHtmlEdit += `<option value='${JSON.stringify(
          options[optionIndex],
        )}' >${options[optionIndex].name}</option>`;
      }

      document.getElementById('selectBox_edit').innerHTML = selectHtmlEdit;
    });
    // setTimeout(() => {
    //   document.querySelector('#selectBox_edit').value = editServiceProviderSelectSer;
    // }, 5000);
    editServiceProviderSelectSer = allData.serviceProviderId;
    document.querySelector('#edit_service_provider').value = editServiceProvider;

    if (allData.rate.percentage || allData.rate.fixed) {
      document.querySelector('#edit_rate_modal').classList.add('is-shown');
      document.querySelector('#edit_rate_put').classList.add('is-shown');
      editPercentage = allData.rate.percentage;
      editFixed = allData.rate.fixed;
      document.querySelector('#edit_presntage').value = editPercentage;
      document.querySelector('#edit_fixed').value = editFixed;
    }
    document.querySelector('#switch_rate_edit').classList.add('is-shown');
  } else {
    document.querySelector('#edit_service_provider').classList.add('is-shown');
    document.querySelector('#edit_service_provider_hide').classList.add('is-shown');

		$.get({
      method: 'GET',
      url: '/api/admin/type_services/views',
    }).then((data) => {
      document.getElementById('edit_select_type_service').classList.add('is-shown');
      const optionsTypeService = data.typesServices;
      let selectHtmlTypeServices = '';
      for (let optionIndex = 0; optionIndex < optionsTypeService.length; optionIndex++) {
        selectHtmlTypeServices += `<option value="${optionsTypeService[optionIndex].__v}">${optionsTypeService[optionIndex].name}</option>`;
      }
      document.getElementById('all_type_service_edit').innerHTML = selectHtmlTypeServices;
    });
  }
  document.querySelector('#edit_service_select_category').value = editServiceCategory;
  document.querySelector('#edit_service_name').value = editServiceName;
  editServiceTypeServicesValue.value = allData.addType;
  editDripfeed.value = allData.dripfeed;
  document.querySelector('#edit_min_order_value').value = editMin;
  document.querySelector('#edit_max_order_value').value = editMax;
  document.querySelector('#edit_rate').value = editNewPrice;
  document.querySelector('#edit_min_order_value_fix').innerHTML = editMin;
  document.querySelector('#edit_max_order_value_fix').innerHTML = editMax;
  document.querySelector('#edit_lable_rate').innerHTML = allData.price.originalPrice;
  document.querySelector('#edit_link_duplicates').value = editLinkDuplicates;
  document.querySelector('#edit_rate_per_1000').value = fixRate;
  document.querySelector('#edit_service_description').value = allData.description;

  if (allData.statusServiceProvider) {
    editStatusServiceProvider.setAttribute('checked', '');
  }
  if (allData.refill.status) {
    editRefill.classList.add('is-shown');
  }
  if (allData.days) {
    editDays = allData.days;
    document.querySelector('#edit_days').value = editDays;
  }

  console.log(JSON.parse(data.getAttribute('data-id')));

  console.log(editServiceProviderSelectSer);
}

function closeEdit() {
  editServiceModal.classList.remove('is-shown');
}

function openTypeServicesEdit() {
  var type = $('#edit_open_type_services_value').val();
 // alert(type)
  //editServiceTypeServicesValue.value = TypeServicesEditvalue;
  if (type === 'manual') {
    $('#edit_select_type_service').show();
    document.querySelector('#edit_service_provider_hide').classList.add('is-shown');
    document.querySelector('#edit_select_service').classList.remove('is-shown');
    document.querySelector('#edit_select_service_allow').classList.remove('is-shown');
    
    $.get({
      method: 'GET',
      url: '/api/admin/type_services/views',
    }).then((data) => {
      console.log(data)
      const optionsTypeService = data.typesServices;
      var selectHtmlTypeServices = '<option value="اختيار النوع" selected>اختيار النوع</option>';
      for (let optionIndex = 0; optionIndex < optionsTypeService.length; optionIndex++) {
        selectHtmlTypeServices += `<option value="${optionsTypeService[optionIndex]._id}">${optionsTypeService[optionIndex].name}</option>`;
      }
      console.log(selectHtmlTypeServices)
      $('#edit_type_service').append(selectHtmlTypeServices)
      $('#edit_type_service').show();
    })
    //document.getElementById('all_type_service_edit').innerHTML = selectHtmlTypeServices;
  } else {
    document.querySelector('#edit_select_type_service').classList.remove('is-shown');
    document.querySelector('#edit_service_provider_hide').classList.remove('is-shown');
  }
}

function edtDripfeedValue(DripfeedValue) {
  editDripfeed.value = DripfeedValue;
}

function editSelectProvider(editProviderId) {
  document.querySelector('#edit_service_provider').value = editProviderId;
  // document.querySelector('#edit_service_provider').options[editProviderId].selected = true;
  $.get({
    method: 'GET',
    url: `/api/admin/provider/${editProviderId}/services`,
  }).then((data) => {
    document.querySelector('#select_service_provider').classList.add('is-shown');
    // selectServiceProvider.classList.toggle('select-service-shown');

    const options = data.services;
    let selectHtmlEdit = '<option value="اختيار الخدمة">اختيار الخدمة</option>';

    for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
      selectHtmlEdit += `<option value='${JSON.stringify(
        options[optionIndex],
      )}'>${options[optionIndex].name}</option>`;
    }

    document.getElementById('selectBox_edit').innerHTML = selectHtmlEdit;
  });
}

function edtLinkDuplicatesType(linkDuplicatesValue) {
  document.querySelector('#edit_link_duplicates').value = linkDuplicatesValue;
}

function selectCateEdit(CateEditValue) {
  document.querySelector('#edit_service_select_category').value = CateEditValue;
  /*var settings = {
    "url": `${host}api/admin/category/${CateEditValue}/services/views`,
    "method": "GET",
    "timeout": 0,
  };
  $.ajax(settings).done(function (response) {
    var services = response.services || [];
    let selectHtml = '<option>اختيار ترتيب الخدمة</option>';
      for (let optionIndex = 0; optionIndex < services.length; optionIndex++) {
        selectHtml += `<option value='${services[optionIndex].name}' data-id="${services[optionIndex]._id}">${services[optionIndex].name}</option>`;
      }
      document.getElementById('edit_service_select_sort').innerHTML = selectHtml;
  });*/
}
function selectServiceEdit(ServiceEditValue) {
  const valueService = JSON.parse(ServiceEditValue.value);
  document.getElementById('edit_rate_modal').classList.add('is-shown');
  document.getElementById('edit_rate_put').classList.add('is-shown');
  document.getElementById('switch_rate_edit').classList.add('is-shown');
  document.querySelector('#edit_select_service_allow').classList.add('is-shown');

  originalPriceSer = valueService.rate;
  typeService = valueService.type;

  document.querySelector('#edit_max_order_value').value = valueService.max;
  document.querySelector('#edit_max_order_value_fix').innerHTML = valueService.max;
  document.querySelector('#edit_min_order_value').value = valueService.min;
  document.querySelector('#edit_min_order_value_fix').innerHTML = valueService.min;
  document.querySelector('#edit_rate').value = valueService.rate;
  document.querySelector('#edit_rate_per_1000').value = valueService.rate;

  document.querySelector('#edit_lable_rate').innerHTML = valueService.rate;

  editServiceProviderSelectSer = valueService.service;
  calcNewRate(valueService.rate);
  console.log(valueService);
  console.log(valueService.rate);
}

function calcNewRate(rate) {
  rate = parseFloat(rate);
  let percentage = parseFloat(document.getElementById('edit_presntage').value);
  percentage = parseFloat(percentage / 100);
  const fixed = parseFloat(document.getElementById('edit_fixed').value);

  if (percentage && fixed) {
    rate = parseFloat(percentage * rate) + rate + fixed;
    document.getElementById('edit_rate').value = rate;
  } else if (percentage && !fixed) {
    rate = parseFloat(percentage * rate) + rate;
    document.getElementById('edit_rate').value = rate;
  }
}
let precentage;
function calcEditService(precentage) {
  precentage = parseFloat(precentage);
  precentage = parseFloat(precentage / 100);
  let rate = parseFloat(originalPriceSer);
  const fixed = parseFloat(document.getElementById('edit_fixed').value);
  if (precentage && !fixed) {
    rate = parseFloat(precentage * rate + rate);
    document.getElementById('edit_rate').value = rate;
  } else if (precentage && fixed) {
    rate = parseFloat(precentage * rate + rate);
    rate += fixed;
    document.getElementById('edit_rate').value = rate;
  } else if (isNaN(precentage) && fixed) {
    rate += fixed;
    document.getElementById('edit_rate').value = rate;
  } else if (isNaN(precentage) && !fixed) {
    document.getElementById('edit_rate').value = parseFloat(originalPriceSer);
  }
}

$('.cancel_sort_modal').click(function() {
  $('.sort_service_modal').removeclass('is-shown');
  $('.add-category-modal').removeClass('is-shown');
  $('.delete-item-modal').removeClass('is-shown');
})

$('.edit_sort_modal_close').click(function() {
  $('#sort_service_modal').removeclass('is-shown');
  $('.add-category-modal').removeClass('is-shown');
  $('.delete-item-modal').removeClass('is-shown');
})

/*
document.querySelector('.cancel_sort_modal').addEventListener('click', () => {
  editSortServiceModal.classList.remove('is-shown');
});
document.querySelector('.edit_sort_modal_close').addEventListener('click', () => {
  editSortServiceModal.classList.remove('is-shown');
});*/

function calcFixedEdit(fixed) {
  fixed = parseFloat(fixed);
  let rate = parseFloat(originalPriceSer);
  let percentage  = parseFloat(document.getElementById('edit_presntage').value);
  if (fixed && document.getElementById('edit_presntage').value) {
    percentage = parseFloat(percentage / 100);
    rate = parseFloat(percentage * rate) + rate;
    rate += fixed;
    document.getElementById('edit_rate').value = rate;
  } else if(!isNaN(fixed)) {
    document.getElementById('edit_rate').value = Number(rate) + Number(fixed);
  } else if(isNaN(fixed)) {
    if(document.getElementById('edit_presntage').value) {
      console.log(rate)
      percentage = parseFloat(percentage / 100);
      rate = parseFloat(percentage * rate) + rate;
      console.log(rate)
      document.getElementById('edit_rate').value = rate;
    } else {
      document.getElementById('edit_rate').value = rate;
    }
  } else if(document.getElementById('edit_fixed').value && isNaN(fixed)) {
    percentage = parseFloat(percentage / 100);
    rate = parseFloat(percentage * rate) + rate;
    document.getElementById('edit_rate').value = rate;
  }
}

//sort_service_modal_close sort_service_modal_cancel
/*
document.querySelector('.cancel_sort_modal').addEventListener('click', () => {
  editSortServiceModal.classList.remove('is-shown');
});*/

$('#sort_service_modal_cancel').on('click', function() {
  $('#sort_service_modal').removeClass('is-shown');
  $('.add-category-modal').removeClass('is-shown');
  $('.delete-item-modal').removeClass('is-shown');
});

$('#sort_service_modal_close').on('click', function() {
  $('#sort_service_modal').removeClass('is-shown');
  $('.add-category-modal').removeClass('is-shown');
  $('.delete-item-modal').removeClass('is-shown');
});

$('#edit_sort_service').click(function() {
  //$('option:selected', '#sort_select_services').attr('data-id');
  if(typeof $('option:selected', '#sort_select_services').attr('data-id') === 'undefined') {
    $('.edit_sort_select_sort_issues').text('حقل ضروري');
    return
  }
  var settings = {
    "url": `${host}api/admin/service/sort/${editServiceId}/${$('option:selected', '#sort_select_services').attr('data-id')}`,
    "method": "PUT",
    "timeout": 0,
  };
  
  $.ajax(settings)
  .done(function (response) {
    location.reload();
  })
  .fail((e) => {
    location.reload();
  });
})

function editSortService($this) {
  editServiceId = $this.getAttribute('data-id');
  $('#sort_service_name').val($this.getAttribute('data-name'));
  var settings = {
    "url": `${host}api/admin/category/${$this.getAttribute('data-category')}/services/${editServiceId}/views`,
    "method": "GET",
    "timeout": 0,
  };
  $.ajax(settings).done(function (response) {

    let selectHtmlServices = '';
    selectHtmlServices += '<option id="all">اختيار الترتيب الجديد</option>';
    //console.log(response.services);
    for (let optionIndex = 0; optionIndex < response.services.length; optionIndex++) {
      selectHtmlServices += `<option value='${response.services[optionIndex].name}' data-id='${response.services[optionIndex]._id}'>${response.services[optionIndex].name}</option>`;
    }
 //   document.getElementById('edit_sort_select_sort').innerHTML = selectHtmlServices;
 
    $('#sort_select_services').append(selectHtmlServices);
    $('.edit_sort_service_modal').addClass('is-shown');
  });
 // $('.edit_sort_service_modal').addClass('is-shown');
}
function openFixRate() {
  if (document.getElementById('open_rate_edit').checked) {
    document.getElementById('edit_rate_modal').classList.add('is-shown');
    document.getElementById('edit_rate_put').classList.add('is-shown');
  } else {
		document.getElementById('edit_rate_put').classList.remove('is-shown');
    document.getElementById('edit_rate_modal').classList.remove('is-shown');
  }
}

function editOpenRefill() {
	 if (document.getElementById('edit_open_Refill').checked) {
		 document.getElementById('edit_Refill_modal').classList.add('is-shown');
	 } else {
		 document.getElementById('edit_Refill_modal').classList.remove('is-shown');
	 }
}
    
function minOrderEdit() {
  if ($('#min_order_edit').attr('checked')) {
    document.getElementById('edit_min_order_value').setAttribute('disabled', '');
    $("#min_order_edit").removeAttr('checked');
  } else {
    document.getElementById('edit_min_order_value').removeAttribute('disabled');
    $("#min_order_edit").addAttr('checked');
  }
}

function maxOrderEdit() {
//  alert($('#max_order_edit').attr('checked'));
  
  if ($('#max_order_edit').attr('checked')) {
    document.getElementById('edit_max_order_value').setAttribute('disabled', '');
    $("#max_order_edit").removeAttr('checked');
  } else {
    document.getElementById('edit_max_order_value').removeAttribute('disabled');
    $("#max_order_edit").addAttr('checked');
  }
}

function selectTypeServiceIdEdit(valueType) {
  typeService = valueType;
  //console.log(typeService);
}

const EscapeClose = document.getElementById('edit_service_modal');
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    EscapeClose.classList.remove('is-shown');
  }
});

$('#edit_service_func').click(() => {
  const categoryId = $('#edit_service_select_category').val();

  const name = $('#edit_service_name').val();

  const mode = $('#edit_open_type_services_value').val();

  const min = $('#edit_min_order_value').val();
  const max = $('#edit_max_order_value').val();

  const dripfeed = Boolean($('#edt_dripfeed').val());

  const providerId = $('#edit_service_provider').val();

  let serviceProviderId;

  const linkDuplicates = Boolean($('#edit_link_duplicates').val());

  const	days = $('#edit_days').val();

  const percentage = $('#edit_presntage').val();

  const description = $('#edit_service_description').val();

  const fixed = $('#edit_fixed').val();

  const originalPrice = originalPriceSer;

  const type = typeService;

  let newPrice;

  if (document.getElementById('edit_rate_per_1000').value) {
    newPrice = Number($('#edit_rate_per_1000').val());
  } else {
    newPrice = Number($('#edit_rate').val());
  }

  let statusServiceProvider;
  if (document.getElementById('edit_status_service_provider').checked) {
    statusServiceProvider = true;
  } else {
    statusServiceProvider = false;
  }

  let refillStatus;
	 if (document.getElementById('edit_open_Refill').checked) {
    refillStatus = true;
  } else {
    refillStatus = false;
  }

	let rateStatus;
  if (document.getElementById('open_rate_edit').checked) {
    rateStatus = true;
  } else {
    rateStatus = false;
  }

	 const editData = {
    categoryId,
    name,
    type,
    max,
    min,
    dripfeed,
    linkDuplicates,
    // providerId,
    mode,
    // serviceProviderId,
    price: {
      // originalPrice,
      newPrice,
    },
    statusServiceProvider,
    refill: {
      status: refillStatus,
    },
    rate: {
      // type: typeRate,
      status: rateStatus,
    },
  };
 
 // editData.name = 
  if (percentage) {
  	editData.rate.percentage = Number(percentage);
  }
  if (fixed) {
  	editData.rate.fixed = Number(fixed);
  }
  if (originalPrice) {
  	// if (!document.getElementById('rate_per_1000').value) {
  	editData.price.originalPrice = Number(originalPrice);
  	// }
  }
  if (providerId) {
    editData.providerId = providerId;
  }
	 if (editServiceProviderSelectSer) {
    editData.serviceProviderId = editServiceProviderSelectSer;
  }

  if (serviceProviderId) {
  	editData.serviceProviderId = serviceProviderId;
  }

  if (description) {
  	editData.description = description;
  }
  if (percentage && !fixed) {
  	typeRate = 2;
  	editData.rate.type = typeRate;
  } else if (!percentage && fixed) {
  	typeRate = 1;
  	editData.rate.type = typeRate;
  } else if (percentage && fixed) {
  	typeRate = 3;
  	editData.rate.type = typeRate;
  }
  if (days) {
    editData.refill.days = days;
  }
  $.post({
    method: 'PUT',
    url: `/api/admin/service/update/${editServiceId}/api`,
    data: editData,
  })
  .then(() => {
    setTimeout(() => {
      window.location.reload(true);
    });
  })
  .fail((error) => {
    $('.edit-service-issue').text(error.responseJSON.issues.all.message);
  });
  console.log(editData);
});

/**************************************************************************************************************************************************/

function editServiceApi(service) {
  var serviceId = service.getAttribute('data-id');
  var settings = {
    "url": `${host}api/admin/service/view/${serviceId}`,
    "method": "GET",
    "timeout": 0,
  };
  $.ajax(settings).done(function (response) {
   // //return
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_description').val(response.service.description);
    $('#edit_service_quality').val(response.service.quality);
    $('#edit_service_speed').val(response.service.speed);
    $('#edit_service_averageTime').val(response.service.averageTime);
    $('#edit_service_startTime').val(response.service.startTime);
    $('#edit_service_guarantee').val(response.service.guarantee);
    $(`#edit_service_select_category option[value="${response.service.categoryId}"]`).attr('selected', 'true');
    $(`#edit_open_type_services_value option[value="${response.service.addType}"]`).attr('selected', 'true');
    let selectHtmlTypeServices = '';
    $(`#all_type_service_edit option[value="${response.service.type}"]`).attr('selected', 'true');
    $(`#edit_service_provider option[value="${response.service.providerId}"]`).attr('selected', 'true');
    document.getElementById('switch_rate_edit').classList.add('is-shown');
    document.querySelector('#edit_select_service_allow').classList.add('is-shown');
    //document.querySelector('#edit_max_order_value').value = response.service.max;
    $('#edit_max_order_value').val(response.service.max);
    document.querySelector('#edit_max_order_value_fix').innerHTML = response.service.max;
   // $('#edit_max_order_value_fix').val(response.service.max);
    //document.querySelector('#edit_min_order_value').value = response.service.min;
    $('#edit_min_order_value').val(response.service.min);
  //  document.querySelector('#edit_min_order_value_fix').innerHTML = response.service.min;
    $('#edit_min_order_value_fix').val(response.service.min);
   // document.querySelector('#edit_rate').value = response.service.price.newPrice;
    $('#edit_rate').val(response.service.price.newPrice);
    document.querySelector('#edit_rate_per_1000').value = response.service.rate;
  // ('#edit_rate_per_1000').رش
    document.querySelector('#edit_lable_rate').innerHTML = response.service.price.originalPrice;
    //console.log(response.service)
    $.get({
      method: 'GET',
      url: `/api/admin/provider/${response.service.providerId}/services`,
    }).then((data) => {
      const options = data.services;
      let selectHtmlEdit = '<option value="اختيار الخدمة<"اختيار الخدمة</option>';
      for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
        if(Number(response.service.serviceProviderId) === Number(options[optionIndex].service)) {
          selectHtmlEdit += `<option value='${JSON.stringify(
            options[optionIndex],
          ) }' data-id="${response.service._id}" selected>${options[optionIndex].name}</option>`;
          
          //$('#edit_rate').val(response.service.price.originalPrice);
        } else {
          selectHtmlEdit += `<option value='${JSON.stringify(
            options[optionIndex],
          )}' data-id="${response.service._id}">${options[optionIndex].name}</option>`;
        }
      }
      $('#edit_service_api').attr('disabled', false);
      $('#select_service_provider').append(selectHtmlEdit);
    });

    originalPriceSer = response.service.price.originalPrice;
    typeService = response.service.type;
    console.log(response.service.rate.type)
    console.log('/**************************/')
    if(response.service.rate.type === 0) {
      $("#open_rate_edit").removeAttr('checked');
      document.getElementById('edit_rate_put').classList.remove('is-shown');
      document.getElementById('edit_rate_modal').classList.remove('is-shown');
     // alert(response.service.price.newPrice)
      $('#edit_rate_per_1000').val(response.service.price.newPrice);
    } else if(response.service.rate.type === 1) {
      $('#edit_fixed').val(response.service.rate.fixed);
      document.getElementById('edit_rate_modal').classList.add('is-shown');
      document.getElementById('edit_rate_put').classList.add('is-shown');
    } else if(response.service.rate.type === 2) {
      $('#edit_presntage').val(response.service.rate.percentage);
      document.getElementById('edit_rate_modal').classList.add('is-shown');
      document.getElementById('edit_rate_put').classList.add('is-shown');
    } else if(response.service.rate.type === 3) {
      $('#edit_presntage').val(response.service.rate.percentage);
      $('#edit_fixed').val(response.service.rate.fixed);
      document.getElementById('edit_rate_modal').classList.add('is-shown');
      document.getElementById('edit_rate_put').classList.add('is-shown');
    }

    if(response.service.statusServiceProvider) {
      $("#edit_status_service_provider").attr('checked', true);
    } else {
      $("#edit_status_service_provider").removeAttr('checked');
    }

    if(response.service.minSyc) {
      $("#min_order_edit").attr('checked', true);
    } else {
      $("#min_order_edit").removeAttr('checked');
      document.getElementById('edit_min_order_value').setAttribute('disabled', '');
    }
    
    if(response.service.maxSyc) {
      $("#max_order_edit").attr('checked', true);
    } else {
      document.getElementById('edit_max_order_value').setAttribute('disabled', '');
      $("#max_order_edit").removeAttr('checked');
    }

    if(response.service.linkDuplicates) {
      $(`#edit_link_duplicates option[value="${response.service.linkDuplicates}"]`).attr('selected', 'true');
    } else {
      $(`#edit_link_duplicates option[value="${response.service.linkDuplicates}"]`).attr('selected', 'true');
    }
    if(response.service.refill.status) {
      $("#edit_open_Refill").attr('checked', true);
      $(`#type_refill option[value="${response.service.refill.type}"]`).attr('selected', 'true');
      $("#edit_days").val(response.service.refill.days);
    } else {
      $("#edit_open_Refill").removeAttr('checked');
    }
    editOpenRefill();
    $('#edit_service_api').attr('data-provider', response.service.serviceProviderId);
    //response.service.statusServiceProvider
    //edit_status_service_provider
    //$("#open_rate_edit").removeAttr('checked');
    /*$('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);
    $('#edit_service_name').val(response.service.name);*/
  });
  $('#edit_service_api').attr('data-id', serviceId);
  
  editServiceModal.classList.add('is-shown');
}

$('#edit_service_api').click(function() {
  const quality = $('#edit_service_quality').val();
  const speed = $('#edit_service_speed').val();
  const averageTime = $('#edit_service_averageTime').val();
  const startTime = $('#edit_service_startTime').val();
  const guarantee = $('#edit_service_guarantee').val();
  
  const categoryId = $('#edit_service_select_category').val();

  const name = $('#edit_service_name').val();

  const mode = $('#edit_open_type_services_value').val();

  const min = $('#edit_min_order_value').val();
  const max = $('#edit_max_order_value').val();
  
  const dripfeed = Boolean($('#edt_dripfeed').val());

  const providerId = $('#edit_service_provider').val();


  let serviceProviderId = $('#edit_service_api').attr('data-provider');
  
  const linkDuplicates = Boolean($('#edit_link_duplicates').val());

  const	days = $('#edit_days').val();

  const percentage = $('#edit_presntage').val();

  const description = $('#edit_service_description').val();

  const fixed = $('#edit_fixed').val();

  const originalPrice = originalPriceSer;

  const type = typeService;

  let newPrice;

  if (document.getElementById('edit_rate_per_1000').value) {
    newPrice = Number($('#edit_rate_per_1000').val());
  } else {
    newPrice = Number($('#edit_rate').val());
  }

  let statusServiceProvider;
  if (document.getElementById('edit_status_service_provider').checked) {
    statusServiceProvider = true;
  } else {
    statusServiceProvider = false;
  }

  let refillStatus;
	 if (document.getElementById('edit_open_Refill').checked) {
    refillStatus = true;
  } else {
    refillStatus = false;
  }

	let rateStatus;
  if (document.getElementById('open_rate_edit').checked) {
    rateStatus = true;
  } else {
    rateStatus = false;
  }

	 const editData = {
    quality,
    speed,
    averageTime,
    startTime,
    guarantee,
    categoryId,
    name,
    type,
    max,
    min,
    dripfeed,
    linkDuplicates,
    providerId,
    // providerId,
    mode,
    // serviceProviderId,
    price: {
      // originalPrice,
      newPrice,
    },
    serviceProviderId,
    statusServiceProvider,
    refill: {
      status: refillStatus,
    },
    rate: {
      // type: typeRate,
      status: rateStatus,
    },
  };

  editData.name = $('#edit_service_name').val();
  if (percentage) {
  	editData.rate.percentage = Number(percentage);
  }
  if (fixed) {
  	editData.rate.fixed = Number(fixed);
  }
  if (originalPrice) {
  	// if (!document.getElementById('rate_per_1000').value) {
  	editData.price.originalPrice = Number(originalPrice);
  	// }
  }
  if (providerId) {
    editData.providerId = providerId;
  }
	 if (editServiceProviderSelectSer) {
    editData.serviceProviderId = editServiceProviderSelectSer;
  }

 /* if (serviceProviderId) {
  	editData.serviceProviderId = serviceProviderId;
  }*/

  if (description) {
  	editData.description = description;
  }
  if (percentage && !fixed) {
  	typeRate = 2;
  	editData.rate.type = typeRate;
  } else if (!percentage && fixed) {
  	typeRate = 1;
  	editData.rate.type = typeRate;
  } else if (percentage && fixed) {
  	typeRate = 3;
  	editData.rate.type = typeRate;
  }
  if (days) {
    editData.refill.days = days;
  }

  if($("#min_order_edit").is(":checked")) {
    editData.minSyc = true;
  } else {
    editData.minSyc = false;
  }

  if($("#max_order_edit").is(":checked")) {
    editData.maxSyc = true;
  } else {
    editData.maxSyc = false;
  }
  $.post({
    method: 'PUT',
    url: `/api/admin/service/update/${$(this).attr('data-id')}/${mode}`,
    data: editData,
  })
  .then(() => {
    setTimeout(() => {
      location.reload();
    });
  })
  .fail((error) => {
    //$('.edit-service-issue').text(error.responseJSON.issues.all.message);
  });
})

function getService(serviceId) {
}
