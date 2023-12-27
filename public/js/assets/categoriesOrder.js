
$.get({
  method: 'GET',
  url: '/api/admin/categories/views',
}).then((data) => {
  const options = data.categories;
  let selectHtml = '';
  selectHtml += '<option>اختيار الفئة</option>';
  for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
    selectHtml += `<option value='${options[optionIndex]._id}'>${options[optionIndex].name}</option>`;
  }
  document.getElementById('categories_order').innerHTML = selectHtml;
});
// const selectServiceOrder = document.querySelector('#service_order_section');
function clearAll() {
  document.getElementById('link_order_service').value = '';
  document.getElementById('quantity_service').value = '';
  document.getElementById('charge_order').value = '';
  document.getElementById('answer_number_order_service').value = '';
  document.getElementById('comments_order_service').value = '';
  $('.link_service_custom_issue').text('');
  $('.quantity_service_issue').text('');
  $('.comments_order_service_issue').text('');
  $('.answer_number_order_service').text('');
}
function getService(ServiceID) {
  $.get({
    method: 'GET',
    url: `/api/admin/category/${ServiceID}/services/views`,
  }).then((data) => {
    // selectServiceOrder.classList.add('is-shown');
   // console.log(data);
    const options = data.services;
    let selectHtmlServices = '';
    selectHtmlServices += '<option id="all">اختيار الخدمة</option>';
    // selectHtmlServices += `<option value='${JSON.stringify({ type: 'all' })}'>Select Service</option>`;
    
    for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
     // console.log(options[optionIndex])
     // return
      selectHtmlServices += `<option 
      data-service-start-time="${options[optionIndex].startTime}"
      data-service-average-time="${options[optionIndex].averageTime}"
      data-service-speed="${options[optionIndex].speed}"
      data-service-guaranteed="${options[optionIndex].guarantee}"
      data-service-quality="${options[optionIndex].quality}"
      data-service-description="${options[optionIndex].description}"
      data-service-name="${options[optionIndex].name}"
      data-service-min="${options[optionIndex].min}"
      data-service-max="${options[optionIndex].max}"
      data-service-type="${options[optionIndex].type}"
      data-service-addType="${options[optionIndex].addType}"
      data-service-newPrice="${options[optionIndex].price.newPrice}"
      data-service-_id="${options[optionIndex]._id}"
      >${options[optionIndex].service} -- ${options[optionIndex].name} -- ${options[optionIndex].price.newPrice}$ لكل ألف</option>`;
    }
    /*${JSON.stringify(
      options[optionIndex],
      )}*/
    console.log(selectHtmlServices);
    var select_service_order = document.getElementById("select_service_order");
    select_service_order.innerHTML = "";
    $('#select_service_order').append(selectHtmlServices);
    //document.getElementById('select_service_order').innerHTML = selectHtmlServices;
  });
}
const tostedOrder = document.querySelector('#tosted_order');

const linkOrderServicesection = document.querySelector(
  '#link_order_service_section',
);
const userNameOrderServicesection = document.querySelector(
  '#username_order_service_section',
);
const newPostOrderServicesection = document.querySelector(
  '#new_posts_order_service_section',
);
// const costOrderServicesection = document.querySelector('#cost_order_service_section');
const quantityOrderMaxMinServicesection = document.querySelector(
  '#quantity_order_min_max_service_section',
);

const dateOrderServicesection = document.querySelector(
  '#date_order_service_section',
);
// const readonlyOrderServicesection = document.querySelector('#quantity_order_service_section_readonly');
const comentOrderServicesection = document.querySelector(
  '#comments_service_section',
);
// const costOrderServicesection = document.querySelector('#cost_order_service_section');
const answerNumberOrderServicesection = document.querySelector(
  '#answer_number_order_service_section',
);
const quantity = document.getElementById('quantity_service_sectin');
let selectServiceId;
let dataSelectedService;
let price;
let typeServiceAddType;
let typeDefult;
let serviceNameOrder;
let minData;
let maxData;

$('#select_service_order').change(function() {
//  console.log($('option:selected', this).attr('value'))
  /*
    data-service-start-time="${options[optionIndex].startTime}"
    data-service-average-time="${options[optionIndex].averageTime}"
    data-service-speed="${options[optionIndex].speed}"
    data-service-guaranteed="${options[optionIndex].guaranteed}"
    data-service-quality="${options[optionIndex].quality}"
    data-service-description="${options[optionIndex].description}"
    data-service-name="${options[optionIndex].name}"
    data-service-min="${options[optionIndex].min}"
    data-service-max="${options[optionIndex].max}"
    data-service-type="${options[optionIndex].type}"
    data-service-addType="${options[optionIndex].startTime}"
    data-service-newPrice="${options[optionIndex].newPrice}"
    data-service-_id="${options[optionIndex]._id}"
  */

  // dataSelectedService = JSON.parse(data);
  selectServiceId = $('option:selected', this).attr('data-service-_id');
  price = $('option:selected', this).attr('data-service-newPrice');
 // alert(price);
  typeServiceAddType = $('option:selected', this).attr('data-service-addType');
  typeDefult = $('option:selected', this).attr('data-service-type');
  serviceNameOrder = $('option:selected', this).attr('data-service-name');
  minData = $('option:selected', this).attr('data-service-min');
  maxData = $('option:selected', this).attr('data-service-max');
  $('#service_name').text($('option:selected', this).attr('data-service-name'));
  $('#description').text($('option:selected', this).attr('data-service-description'));
  $('#quality').text($('option:selected', this).attr('data-service-quality'));
  $('#guaranteed').text($('option:selected', this).attr('data-service-guaranteed'));
  $('#speed').text($('option:selected', this).attr('data-service-speed'));
  $('#average_time').text($('option:selected', this).attr('data-service-average-time'));
  $('#start_time').text($('option:selected', this).attr('data-service-start-time'));
  
  document.getElementById(
    'min_max_quantity',
  ).innerHTML = `الحد الادنى: ${$('option:selected', this).attr('data-service-min')} - الحد الاقصى: ${$('option:selected', this).attr('data-service-max')}`;
  document.getElementById(
    'min_max_order_quantity',
  ).innerHTML = `الحد الادنى: ${$('option:selected', this).attr('data-service-min')} - الحد الاقصى: ${$('option:selected', this).attr('data-service-max')}`;
  clearAll();
  tostedOrder.classList.remove('is-shown');

  if (typeDefult === 'Default') {
    linkOrderServicesection.classList.add('is-shown');
    quantityOrderMaxMinServicesection.classList.remove('is-shown');
    userNameOrderServicesection.classList.remove('is-shown');
    newPostOrderServicesection.classList.remove('is-shown');
    quantity.classList.add('is-shown');
    dateOrderServicesection.classList.remove('is-shown');
    answerNumberOrderServicesection.classList.remove('is-shown');
    comentOrderServicesection.classList.remove('is-shown');
  } else if (typeDefult === 'Subscriptions') {
    linkOrderServicesection.classList.remove('is-shown');
    comentOrderServicesection.classList.remove('is-shown');
    answerNumberOrderServicesection.classList.remove('is-shown');
    userNameOrderServicesection.classList.add('is-shown');
    newPostOrderServicesection.classList.add('is-shown');
    // costOrderServicesection.classList.remove('is-shown');
    dateOrderServicesection.classList.add('is-shown');
    quantityOrderMaxMinServicesection.classList.add('is-shown');
  } else if(typeDefult === 'Custom Comments') {
    linkOrderServicesection.classList.add('is-shown');
    comentOrderServicesection.classList.add('is-shown');
    quantityOrderMaxMinServicesection.classList.remove('is-shown');
    answerNumberOrderServicesection.classList.remove('is-shown');
    quantity.classList.remove('is-shown');
    userNameOrderServicesection.classList.remove('is-shown');
    newPostOrderServicesection.classList.remove('is-shown');
    dateOrderServicesection.classList.remove('is-shown');
    document.getElementById('charge_order').value = price;
  } else if(typeDefult === 'Package' || typeDefult === 'Custom Comments Package') {
    linkOrderServicesection.classList.add('is-shown');
    comentOrderServicesection.classList.remove('is-shown');
    quantityOrderMaxMinServicesection.classList.remove('is-shown');
    answerNumberOrderServicesection.classList.remove('is-shown');
    quantity.classList.remove('is-shown');
    userNameOrderServicesection.classList.remove('is-shown');
    newPostOrderServicesection.classList.remove('is-shown');
    dateOrderServicesection.classList.remove('is-shown');
    document.getElementById('charge_order').value = price;
  } else if (typeDefult === 'Poll') {
    comentOrderServicesection.classList.remove('is-shown');
    linkOrderServicesection.classList.add('is-shown');
    answerNumberOrderServicesection.classList.add('is-shown');
    quantity.classList.add('is-shown');
    quantityOrderMaxMinServicesection.classList.remove('is-shown');
    userNameOrderServicesection.classList.remove('is-shown');
    newPostOrderServicesection.classList.remove('is-shown');
    dateOrderServicesection.classList.remove('is-shown');
  }
})
function selectServiceOrder(data) {
  dataSelectedService = JSON.parse(data);
  selectServiceId = dataSelectedService._id;
  price = dataSelectedService.price.newPrice;
  typeServiceAddType = dataSelectedService.addType;
  typeDefult = dataSelectedService.type;
  serviceNameOrder = dataSelectedService.name;
  minData = dataSelectedService.min;
  maxData = dataSelectedService.max;
  $('#service_name').text(dataSelectedService.name);
  $('#description').text(dataSelectedService.description);
  $('#quality').text(dataSelectedService.quality);
  $('#guaranteed').text(dataSelectedService.guarantee);
  $('#speed').text(dataSelectedService.speed);
  $('#average_time').text(dataSelectedService.averageTime);
  $('#start_time').text(dataSelectedService.startTime);
  
  document.getElementById(
    'min_max_quantity',
  ).innerHTML = `الحد الادنى: ${dataSelectedService.min} - الحد الاقصى: ${dataSelectedService.max}`;
  document.getElementById(
    'min_max_order_quantity',
  ).innerHTML = `الحد الادنى: ${dataSelectedService.min} - الحد الاقصى: ${dataSelectedService.max}`;
  clearAll();
  tostedOrder.classList.remove('is-shown');

  if (typeDefult === 'Default') {
    linkOrderServicesection.classList.add('is-shown');
    quantityOrderMaxMinServicesection.classList.remove('is-shown');
    userNameOrderServicesection.classList.remove('is-shown');

    newPostOrderServicesection.classList.remove('is-shown');
    quantity.classList.add('is-shown');
    dateOrderServicesection.classList.remove('is-shown');
    answerNumberOrderServicesection.classList.remove('is-shown');

    comentOrderServicesection.classList.remove('is-shown');
  } else if (typeDefult === 'Subscriptions') {
    linkOrderServicesection.classList.remove('is-shown');
    comentOrderServicesection.classList.remove('is-shown');
    answerNumberOrderServicesection.classList.remove('is-shown');
    userNameOrderServicesection.classList.add('is-shown');
    newPostOrderServicesection.classList.add('is-shown');
    // costOrderServicesection.classList.remove('is-shown');
    dateOrderServicesection.classList.add('is-shown');
    quantityOrderMaxMinServicesection.classList.add('is-shown');
  } else if(typeDefult === 'Custom Comments') {
    linkOrderServicesection.classList.add('is-shown');
    comentOrderServicesection.classList.add('is-shown');
    quantityOrderMaxMinServicesection.classList.remove('is-shown');
    answerNumberOrderServicesection.classList.remove('is-shown');
    quantity.classList.remove('is-shown');
    userNameOrderServicesection.classList.remove('is-shown');
    newPostOrderServicesection.classList.remove('is-shown');
    dateOrderServicesection.classList.remove('is-shown');
    document.getElementById('charge_order').value = price;
  } else if(typeDefult === 'Package' ||  typeDefult === 'Custom Comments Package') {
    linkOrderServicesection.classList.add('is-shown');
    comentOrderServicesection.classList.remove('is-shown');
    quantityOrderMaxMinServicesection.classList.remove('is-shown');
    answerNumberOrderServicesection.classList.remove('is-shown');
    quantity.classList.remove('is-shown');
    userNameOrderServicesection.classList.remove('is-shown');
    newPostOrderServicesection.classList.remove('is-shown');
    dateOrderServicesection.classList.remove('is-shown');
    document.getElementById('charge_order').value = price;
  } else if (typeDefult === 'Poll') {
    comentOrderServicesection.classList.remove('is-shown');
    linkOrderServicesection.classList.add('is-shown');
    answerNumberOrderServicesection.classList.add('is-shown');
    quantity.classList.add('is-shown');
    quantityOrderMaxMinServicesection.classList.remove('is-shown');
    userNameOrderServicesection.classList.remove('is-shown');
    newPostOrderServicesection.classList.remove('is-shown');
    dateOrderServicesection.classList.remove('is-shown');
  }
}

function chargeOrderCalc(quantity) {
  quantity = parseFloat(quantity);
  var cost = document.getElementById('charge_order').value;
  if (typeDefult === 'Poll' || typeDefult === 'Default') {
    cost = parseFloat((quantity * price) / 1000);
    var calcCostRate = 0;
    if(Number(rate) > 0) {
      calcCostRate = Number(rate) * cost / 100
      cost -= calcCostRate;
    }
    document.getElementById('charge_order').value = Number(cost.toFixed(4));
  }
  if (isNaN(quantity)) {
    document.getElementById('charge_order').value = '';
  }
  console.log(cost);
}

function calcLine(linesNum) {
  const text = linesNum;
  const lines = text.split('\n');
  const count = parseFloat(lines.length);
  price = parseFloat(price);
  var cost = (count * price) / 1000;
  cost.toFixed(6);
  var calcCostRate = 0;
  if(Number(rate) > 0) {
    calcCostRate = Number(rate) * cost / 100;
    cost -= calcCostRate;
  }
  document.getElementById('charge_order').value = Number(cost.toFixed(4));
  //console.log(count);
}
let selctedDelay;
function selctedDelayOrder(delay) {
  selctedDelay = delay;
}

$('#confirm_order').click((e) => {
  e.preventDefault();

  const arrComment = $('#comments_order_service').val().split('\n');
  const serviceId = selectServiceId;

  const quantity_service = Number($('#quantity_service').val());

  const link = $('#link_order_service').val();

  const addType = typeServiceAddType;

  const typeService = typeDefult;

  const answerNumber = $('#answer_number_order_service').val();

  const charge = Number($('#charge_order').val());

  const comments = $('#comments_order_service').val();

  const username = $('#Username_order_service').val();

  const min = $('#min_order_service').val();

  const max = $('#max_order_service').val();

  const posts = $('#new_posts_order_service').val();

  const delay = selctedDelay;

  let issues = false;

  if (typeDefult == 'Default') {
    if (!link) {
      issues = true;
      $('.link_service_custom_issue').text('حقل ضروري');
      $('#link_order_service').addClass('issues_input');
    } else {
      $('.link_service_custom_issue').text(''); 
    }
    if (!quantity) {
      issues = true;
      $('.quantity_service_issue').text('  حقل ضروري');
      $('#quantity_service').addClass('issues_input');
    } else if (Number(quantity) < minData) {
      issues = true;
      $('.quantity_service_issue').text('الكمية قليله');
      $('#quantity_service').addClass('issues_input');
    } else if (Number(quantity) > maxData) {
      issues = true;
      $('.quantity_service_issue').text('الكمية كبيرة');
      $('#quantity_service').addClass('issues_input');
    } else {
      $('.quantity_service_issue').text(' ');
    }
  } 
  if (typeDefult === 'Poll') {
    if (!quantity) {
      issues = true;
      $('.quantity_service_issue').text('  حقل ضروري');
      $('#quantity_service').addClass('issues_input');
    } else {
      $('.link_service_custom_issue').text(''); 
    }
    if (!link) {
      issues = true;
      $('.link_service_custom_issue').text('حقل ضروري');
      $('#link_order_service').addClass('issues_input');
    } else {
      $('.link_service_custom_issue').text(''); 
    }
    if (!answerNumber) {
      issues = true;
      $('.answer_number_fav_service_issue').text('حقل ضروري');
      $('#answer_number_order_service').addClass('issues_input');
    } else {
      $('.link_service_custom_issue').text(''); 
    }
  }

  if (typeDefult == 'Custom Comments') {
    if (!link) {
      issues = true;
      $('.link_service_custom_issue').text('حقل ضروري');
      $('#link_order_service').addClass('issues_input');
    } else {
      $('.link_service_custom_issue').text(''); 
    }

    if (!comments) {
      issues = true;
      $('.comments_order_service_issue').text('حقل ضروري');
      $('#comments_order_service').addClass('issues_input');
    } else {
      $('.link_service_custom_issue').text(''); 
    }
  }

  if (typeDefult == 'Custom Comments Package') {
    if (!link) {
      issues = true;
      $('.link_service_custom_issue').text('حقل ضروري');
      $('#link_order_service').addClass('issues_input');
    } else {
      $('.link_service_custom_issue').text(''); 
    }
  }
  if (typeDefult == 'Package') {
    if (!link) {
      issues = true;
      $('.link_service_custom_issue').text('حقل ضروري');
      $('#link_order_service').addClass('issues_input');
    } else {
      $('.link_service_custom_issue').text(''); 
    }
  }

  // if (
  // 	typeDefult == "Custom Comments" ||
  // 	"Custom Comments Package" ||
  // 	("Package" && !answerNumber)
  // ) {
  // 	issues = true;
  // 	$(".answer_number_fav_service_issue").text("حقل ضروري");
  // 	$("#answer_number_order_service").addClass("issues_input");
  // }
  //
  if (issues) return;

  // const issues = false;
  // if (!serviceId) {
  //   issues = false;
  //   $('.select_service_order_issue').text('حقل ضروري');
  //   $('#select_service_order').addClass('issues_input');
  // }
  // if (!quantity) {
  //   issues = false;
  //   $('.quantity_service_issue').text('حقل ضروري');
  //   $('#quantity_service').addClass('issues_input');
  // }
  // if (!link) {
  //   issues = false;
  //   $('.link_service_custom_issue').text('حقل ضروري');
  //   $('#link_order_service').addClass('issues_input');
  // }

  // if (issues) return;
  const addDataOrder = {
    serviceId,
    link,
    addType,
    typeService,
  };

  if (comments) {
    addDataOrder.comments = arrComment;
  }
  if (quantity_service) {
    addDataOrder.quantity = quantity_service;
  }

  if (answerNumber) {
    addDataOrder.answer_number = answerNumber;
  }

  if (username) {
    addDataOrder.username = username;
  }

  if (min) {
    addDataOrder.min = min;
  }

  if (max) {
    addDataOrder.max = max;
  }

  if (posts) {
    addDataOrder.posts = posts;
  }

  if (delay) {
    addDataOrder.delay = delay;
  }

  if (charge) {
    addDataOrder.charge = charge;
  }

  $('#confirm_order').attr('disabled', true);

  $.post({
    method: 'POST',
    url: 'api/order/add',
    data: addDataOrder,
  })
  .then((data) => {
    window.localStorage.setItem('tosted_order', 'true');
    window.localStorage.setItem('tosted_order_link', link);
    window.localStorage.setItem('tosted_order_service_name', serviceNameOrder);
    window.localStorage.setItem('tosted_order_cost', charge);
    if (quantity) {
      window.localStorage.setItem('tosted_order_quantity', quantity_service);
    } else {
      window.localStorage.setItem('tosted_order_quantity', charge * 1000);
    }
    window.location.reload();
   /* tostedOrder.classList.add('is-shown');
    document.getElementById('tosted_order_link').innerHTML = link;
    document.getElementById('tosted_order_service_name').innerHTML = serviceNameOrder;
    if (quantity) {
      document.getElementById('tosted_order_quantity').innerHTML = quantity_service;
    } else {
      document.getElementById('tosted_order_quantity').innerHTML = charge * 1000;
    }
    document.getElementById('tosted_order_cost').innerHTML = charge;
    clearAll();*/
    //location.reload();
  })
  .fail((e) => {
   // console.log(error)
    if(error.responseJSON.issues.charge.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.charge.message,
      );
    } else if(error.responseJSON.issues.answer_number.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.answer_number.message,
      );
    } else if(error.responseJSON.issues.comments.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.comments.message,
      );
    } else if(error.responseJSON.issues.delay.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.delay.message,
      );
    } else if(error.responseJSON.issues.expiry.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.expiry.message,
      );
    } else if(error.responseJSON.issues.link.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.link.message,
      );
    } else if(error.responseJSON.issues.max.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.max.message,
      );
    } else if(error.responseJSON.issues.min.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.min.message,
      );
    } else if(error.responseJSON.issues.posts.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.posts.message,
      );
    } else if(error.responseJSON.issues.quantity.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.quantity.message,
      );
    } else if(error.responseJSON.issues.username.status === true) {
      $('.order_all_service_issue').text(
        error.responseJSON.issues.username.message,
      );
    } 
  });
  //console.log(addDataOrder);
});
