const addServiceModal = document.getElementById('add_service_modal');
const nameServiceCancle = document.getElementById('add_service_name');
const minOrderValueCancle = document.getElementById('min_order_value');
const maxOrderValueCancle = document.getElementById('max_order_value');
const ratePer1000Cancle = document.getElementById('rate_per_1000');
const daysCancle = document.getElementById('days');
const addServiceSelectCategoryCancle = document.getElementById('add_service_select_category');
const openTypeServicesValueCancle = document.getElementById('open_type_services_value');
const addServiceProviderHide = document.querySelector('#add_service_provider_hide');
const selectServiceProvider = document.querySelector('#select_service');
const selectServiceProviderAllow = document.querySelector('#select_service_allow');
const linkDuplicatesCancle = document.querySelector('#link_duplicates');
const statusServiceProviderCancle = document.querySelector('#status_service_provider');

const selectTypeService = document.querySelector('#select_type_service');
document.getElementById('add_new_service').addEventListener('click', () => {
  addServiceModal.classList.add('is-shown');
});

document.getElementById('add_service_modal_close').addEventListener('click', () => {
  addServiceModal.classList.remove('is-shown');
});
document.getElementById('add_service_modal_cancel').addEventListener('click', () => {
  addServiceModal.classList.remove('is-shown');
  nameServiceCancle.value = '';
  minOrderValueCancle.value = '';
  maxOrderValueCancle.value = '';
  ratePer1000Cancle.value = '';
  daysCancle.value = '';
  addServiceSelectCategoryCancle.value = 'selectOption';
  openTypeServicesValueCancle.value = 'api';

  linkDuplicatesCancle.value = false;
  selectServiceProviderAllow.classList.remove('is-shown');

  addServiceProviderHide.classList.remove('is-shown');
  selectTypeService.classList.remove('is-shown');
});

// document.querySelector('#edit_service_modal_close').addEventListener('click', () => {
//   editServiceModal.classList.remove('is-shown');
// });
// document.querySelector('#edit_service_modal_cancel').addEventListener('click', () => {
//   editServiceModal.classList.remove('is-shown');
// });

// const editServiceDescModal = document.querySelector('#edit_service_description_modal');
// document.querySelector('#edit_description').addEventListener('click', () => {
//   editServiceDescModal.classList.add('is-shown');
// });

// document.querySelector('#edit_service_description_modal_close').addEventListener('click', () => {
//   editServiceDescModal.classList.remove('is-shown');
// });
// document.querySelector('#edit_service_description_modal_cancel').addEventListener('click', () => {
//   editServiceDescModal.classList.remove('is-shown');
// });

const openRefill = document.querySelector('#Refill_modal');

document.querySelector('#open_Refill').addEventListener('click', () => {
  openRefill.classList.toggle('Refill-modal-shown');
});

const openRateModal = document.querySelector('#rate_modal');
const ratePut = document.querySelector('#rate_put');
const openSwitchRate = document.querySelector('#switch_rate');

document.querySelector('#open_rate').addEventListener('click', () => {
  if (document.querySelector('#open_rate').checked) {
    openRateModal.classList.add('is-shown');
    ratePut.classList.add('is-shown');
  } else {
    openRateModal.classList.remove('is-shown');
    ratePut.classList.remove('is-shown');
  }
  // openRateModal.classList.toggle('Refill-modal-shown');
  // ratePut.classList.toggle('rate-put-shown');
});
// if (document.querySelector('#max_order').checked) {
//   document.getElementById('max_order_value').setAttribute('disabled', '');
// }

document.querySelector('#max_order').addEventListener('click', () => {
  if (document.querySelector('#max_order').checked) {
    document.getElementById('max_order_value').setAttribute('disabled', '');
  } else {
	        document.getElementById('max_order_value').removeAttribute('disabled');
  }
});

// if (document.querySelector('#min_order').checked) {
//   document.getElementById('min_order_value').setAttribute('disabled', '');
// }
document.querySelector('#min_order').addEventListener('click', () => {
  if (document.querySelector('#min_order').checked) {
    document.getElementById('min_order_value').setAttribute('disabled', '');
  } else {
    document.getElementById('min_order_value').removeAttribute('disabled');
  }
});

let selectCateId = document.querySelector('#add_service_select_category').value;

function selectCate(catId) {
  selectCateId = catId;
  var settings = {
    "url": `${host}api/admin/category/${selectCateId}/services/views`,
    "method": "GET",
    "timeout": 0,
  };
  $.ajax(settings).done(function (response) {
    var services = response.services || [];
    let selectHtml = '<option>اختيار ترتيب الخدمة</option>';
    for (let optionIndex = 0; optionIndex < services.length; optionIndex++) {
      selectHtml += `<option value='${services[optionIndex].name}' data-id="${services[optionIndex]._id}">${services[optionIndex].name}</option>`;
    }
    document.getElementById('add_service_select_sort').innerHTML = selectHtml;
  });
}

let serviceTypeId = document.querySelector('#all_type_service').value;

function selectTypeServiceId(selectServiceTypeId) {
  serviceTypeId = selectServiceTypeId.value;
  console.log(serviceTypeId);
}

// const selectServiceProvider = document.querySelector('#select_service');
// const selectServiceProviderAllow = document.querySelector('#select_service_allow');

let selectProviderId;

function selectProvider(providerId) {
  selectProviderId = providerId;
  	$.get({
    method: 'GET',
    url: `${host}api/admin/provider/${providerId}/services`,
  })
    .then((data) => {
      selectServiceProvider.classList.add('is-shown');
      // selectServiceProvider.classList.toggle('select-service-shown');

      const options = data.services;
      let selectHtml = '';

      // console.log(options, options.unshift({ name: 'select' }));
      selectHtml += '<option>اختيار الخدمة</option>';
      for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
        selectHtml += `<option value='${JSON.stringify(
          options[optionIndex],
        )}'>${options[optionIndex].name}</option>`;
      }

      document.getElementById('selectBox').innerHTML = selectHtml;
    });
}
const maxOrderSwich = document.getElementById('max_order_swich');
const minOrderSwich = document.getElementById('min_order_swich');
let serviceRate;
let serviceMax;
let serviceMin;
let serviceId;
let serviceType;
let nameCategoryProvider;
function selectService(serviceData) {
  const value = JSON.parse(serviceData.value);
  nameCategoryProvider = value.category;
  //nameCategoryProvider
  serviceRate = value.rate;
  serviceMax = value.max;
  serviceMin = value.min;
  serviceId = value.service;
  serviceType = value.type;
  // console.log('serviceId')
  // console.log(serviceId)
  // console.log(value)
  document.getElementById('rate').value = serviceRate;
  document.getElementById('lable_rate').innerText = serviceRate;

  document.getElementById('max_order_value').value = serviceMax;
  document.getElementById('max_order_value_fix').innerText = serviceMax;

  document.getElementById('min_order_value').value = serviceMin;
  document.getElementById('min_order_value_fix').innerText = serviceMin;

  openRateModal.classList.add('is-shown');
  ratePut.classList.add('is-shown');
  selectServiceProviderAllow.classList.add('is-shown');
  if (document.querySelector('#max_order').checked) {
    document.getElementById('max_order_value').setAttribute('disabled', '');
  }
  if (document.querySelector('#min_order').checked) {
    document.getElementById('min_order_value').setAttribute('disabled', '');
  }
  openSwitchRate.classList.add('is-shown');
  maxOrderSwich.classList.add('is-shown');
  minOrderSwich.classList.add('is-shown');
  document.getElementById('open_rate').setAttribute('checked', '');
}

function calc(precentage) {
  precentage = parseFloat(precentage);
  precentage = parseFloat(precentage / 100);
  let rate;
  rate = parseFloat(serviceRate);
  const fixed = parseFloat(document.getElementById('fixed').value);
  if (precentage && !fixed) {
    rate = parseFloat(precentage * rate + rate);
    document.getElementById('rate').value = rate;
  } else if (precentage && fixed) {
    rate = parseFloat(precentage * rate + rate);
    rate += fixed;
    document.getElementById('rate').value = rate;
  } else if (isNaN(precentage) && fixed) {
    rate += fixed;
    document.getElementById('rate').value = rate;
  } else if (isNaN(precentage) && !fixed) {
    document.getElementById('rate').value = parseFloat(serviceRate);
  }
}
function calcFixed(fixed) {
  fixed = parseFloat(fixed);
  let rate;
  rate = parseFloat(serviceRate);
  let presntage;
  presntage = parseFloat(document.getElementById('presntage').value);
  if (fixed && document.getElementById('presntage').value) {
    presntage = parseFloat(presntage / 100);
    rate = parseFloat(presntage * rate) + rate;
    rate += fixed;
    document.getElementById('rate').value = rate;
  } else if (isNaN(fixed)) {
    document.getElementById('rate').value = rate;
  } else if(!isNaN(fixed)) {
    if(document.getElementById('edit_presntage').value) {
      presntage = parseFloat(presntage / 100);
      rate = parseFloat(presntage * rate) + rate;
      document.getElementById('rate').value = rate;
    } else {
      //console.log(fixed)
      console.log(Number(rate) + Number(fixed))
      document.getElementById('rate').value = Number(rate) + Number(fixed);
    }
  }
  else if (document.getElementById('presntage').value && isNaN(fixed)) {
    presntage = parseFloat(presntage / 100);
    rate = parseFloat(presntage * rate) + rate;
    document.getElementById('rate').value = rate;
  }
}

let modeValue = document.getElementById('open_type_services_value').value;

// const addServiceProviderHide = document.querySelector('#add_service_provider_hide');

// const selectTypeService = document.querySelector('#select_type_service');

//console.log(modeValue);

function openTypeServices(typeService) {
  modeValue = typeService;
  console.log(typeService);
  const value = typeService;
  if (value === 'manual') {
      	$.get({
      method: 'GET',
      url: `${host}api/admin/type_services/views`,
    })
      .then((data) => {
        // selectTypeService.classList.toggle('select-service-shown');
        selectTypeService.classList.add('is-shown');

        const optionsTypeService = data.typesServices;
        let selectHtmlTypeSer = '';
        selectHtmlTypeSer += '<option>اختيار نوع الخدمة</option>';

        for (let optionIndex = 0; optionIndex < optionsTypeService.length; optionIndex++) {
          selectHtmlTypeSer += (`<option value="${optionsTypeService[optionIndex].__v}">${optionsTypeService[optionIndex].name}</option>`);
        }

        document.getElementById('all_type_service').innerHTML = selectHtmlTypeSer;

        // selectServiceProviderAllow.classList.toggle("select-service-shown");
        selectServiceProviderAllow.classList.add('is-shown');

        // addServiceProviderHide.classList.toggle('select-provider-hide-show');
        addServiceProviderHide.classList.add('is-shown');
      });
  } else {
    addServiceProviderHide.classList.remove('is-shown');
    selectServiceProviderAllow.classList.remove('is-shown');
    selectTypeService.classList.remove('is-shown');
    selectServiceProvider.classList.remove('is-shown');
    selectTypeService.classList.remove('is-shown');
  }
}

let dripfeedValueType = Boolean(document.getElementById('dripfeed').value);
console.log(dripfeedValueType);
function dripfeedValue(selectDripfeedValue) {
  dripfeedValueType = Boolean(selectDripfeedValue);
}

let linkDuplicatesTypeValue = Boolean(document.getElementById('link_duplicates').value);

function linkDuplicatesType(linkDuplicatesTypeData) {
  linkDuplicatesTypeValue = Boolean(linkDuplicatesTypeData);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    addServiceModal.classList.remove('is-shown');

    // close modal here
  }
});

$('#add_service_api').click(() => {
  const addServiceName = $('#add_service_name').val();
  const categoryId = selectCateId;
  let type;
  if (modeValue === 'manual') {
    type = serviceTypeId;
  } else {
    type = serviceType;
  }
  
  const min = $('#min_order_value').val();

  const max = $('#max_order_value').val();

  const dripfeed = dripfeedValueType;

  const providerId = selectProviderId;

  let originalPrice;

  originalPrice = Number(serviceRate);

  let newPrice;

  if (document.getElementById('rate_per_1000').value) {
    newPrice = Number($('#rate_per_1000').val());
    originalPrice = Number($('#rate_per_1000').val());
  } else {
    newPrice = Number($('#rate').val());
  }

  const rate = $('#rate').val();

  const percentage = $('#presntage').val();

  const fixed = $('#fixed').val();

  let typeRate;

  // if (percentage && !fixed) {
  //   typeRate = 2;
  // } else if (!percentage && fixed) {
  //   typeRate = 1;
  // } else if (percentage && fixed) {
  //   typeRate = 3;
  // }

  let rateStatus = false;
  if (document.getElementById('open_rate').checked) {
    rateStatus = true;
    // ***************
  }
  const mode = modeValue;

  const linkDuplicates = linkDuplicatesTypeValue;

  const days = $('#days').val();

  const serviceProviderId = serviceId;

  let status;

  let statusServiceProvider;

  if (document.getElementById('open_Refill').checked) {
    status = true;
  } else {
    status = false;
  }

  if (document.getElementById('status_service_provider').checked) {
    statusServiceProvider = true;
  } else {
    statusServiceProvider = false;
  }

  const postData = {
    categoryId,
    name: addServiceName,
    type,
    max,
    min,
    minSyc: document.querySelector('#min_order').checked,
    maxSyc: document.querySelector('#max_order').checked,
    nameCategoryProvider,
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
      status,
      days,
    },
    rate: {
      // type: typeRate,
      status: rateStatus,
    },
  };
  let sortCategory = $('#add_service_select_sort option:selected').attr('data-id');
  if(typeof sortCategory !== 'undefined') {
    postData.sortCategory = sortCategory;
  } 

  if (percentage) {
    postData.rate.percentage = Number(percentage);
  }
  if (fixed) {
    postData.rate.fixed = Number(fixed);
  }
  if (originalPrice) {
    // if (!document.getElementById('rate_per_1000').value) {
    postData.price.originalPrice = Number(originalPrice);
    // }
  }
  if (providerId) {
    postData.providerId = providerId;
  }
  if (serviceProviderId) {
    postData.serviceProviderId = serviceProviderId;
  }
  if (percentage && !fixed) {
    typeRate = 2;
    postData.rate.type = typeRate;
  } else if (!percentage && fixed) {
    typeRate = 1;
    postData.rate.type = typeRate;
  } else if (percentage && fixed) {
    typeRate = 3;
    postData.rate.type = typeRate;
  }

  $.post({
    method: 'POST',
    url: `${host}api/admin/service/add`,
    data: postData,

  })
    .then((data) => {
      location.reload();
    //  $('.add-user-message').text(data.issues.message);
    })
    .fail((error) => {
      $('.name-ser-add-issue').text(error.responseJSON.issues.name.message);
      $('.provider-ser-add-issue').text(error.responseJSON.issues.providerId.message);
    });
});
