var options;
$('#add_fav').click(() => {
  const type = true;
  $.post({
    method: 'POST',
    url: '/api/favorite/add/624f6fbb8cdbae52b9c3de12/626b67ea6186c950d47e67dc',
    data: {
      type,
    },
  })
  .then((data) => {
    console.log(data);
  })
  .fail((error) => {
    console.log(error);
  });
});

$.get({
  method: 'GET',
  url: '/api/favorites/views',
}).then((data) => {
  options = data.favoritesCategories;
  //console.log(options[0].category.name)
  //return
  //options.shift();
  var selectHtmlFav = '';
  selectHtmlFav += '<option selected>اختر القسم</option>';
  for (var optionIndex = 0; optionIndex < options.length; optionIndex++) {
    if(options[optionIndex].length !== 0) {
      selectHtmlFav += `<option value='${optionIndex}'>${options[optionIndex].category.name}</option>`;
    }
    

    //const favService = options[optionIndex];
    //console.log(options[optionIndex].category.name);
    /*for (let b = 0; b < favService.services.length; b++) {
      selectHtmlFav += `<option value='${JSON.stringify(
        favService.services[b].service,
      )}'>${favService.services[b].service.name}</option>`;
    }*/
   /* selectHtmlFav += `<option value='${JSON.stringify(
      options.category.name,
    )}'>${options.category.name}</option>`;*/
  }

  document.getElementById('fav_category_custom').innerHTML = selectHtmlFav;
});
const tostedOrderFav = document.querySelector('#tosted_order');

function clearAllFav() {
  document.getElementById('link_fav_service').value = '';
  document.getElementById('quantity_fav_service').value = '';
  document.getElementById('cost_fav_service').value = '';
  document.getElementById('answer_number_fav_service').value = '';
  document.getElementById('comments_fav_service').value = '';

  $('.fav_service_custom_issue').text('');
  $('.quantity_fav_service_issue').text('');
  // $(".comments_order_service_issue").text("");
  // $(".answer_number_order_service").text("");
}

const linkFavServicesection = document.querySelector(
  '#link_fav_service_section',
);
const userNameFavServicesection = document.querySelector(
  '#username_fav_service_section',
);
const newPostFavServicesection = document.querySelector(
  '#new_posts_fav_service_section',
);
const quantityFavServicesection = document.querySelector(
  '#quantity_fav_service_section',
);
const dateFavServicesection = document.querySelector(
  '#date_fav_service_section',
);
const readonlyFavServicesection = document.querySelector(
  '#quantity_fav_service_section_readonly',
);
const comentFavServicesection = document.querySelector(
  '#comments_fav_service_section',
);
const costFavServicesection = document.querySelector(
  '#cost_fav_service_section',
);
const answerNumberFavServicesection = document.querySelector(
  '#answer_number_fav_service_section',
);

let allData;
let typeFavservice;
let typeFavServiceAddType;
let favServiceId;
let favPrice;
let favServiceNameOrder;
let minFav;
let maxFav;
$('#fav_category_custom').change(function() {
  var selectHtmlFav = '';
  var index = $(this).val();
  //console.log(options[Number(index)].services)
  selectHtmlFav += '<option selected>اختر الخدمة</option>';
  for (var optionIndex = 0; optionIndex < options[Number(index)].services.length; optionIndex++) {
  //  console.log(options[Number(index)].services)
    selectHtmlFav += `<option description="${options[Number(index)].services[optionIndex].service.description}" speed="${options[Number(index)].services[optionIndex].service.speed}" start_time="${options[Number(index)].services[optionIndex].service.startTime}" quality="${options[Number(index)].services[optionIndex].service.quality}" guaranteed="${options[Number(index)].services[optionIndex].service.guarantee}" average_time="${options[Number(index)].services[optionIndex].service.averageTime}"  value='${options[Number(index)].services[optionIndex].service.name}' type='${options[Number(index)].services[optionIndex].service.type}' addType='${options[Number(index)].services[optionIndex].service.addType}' id='${options[Number(index)].services[optionIndex].service._id}' newPrice='${options[Number(index)].services[optionIndex].service.price.newPrice}' min='${options[Number(index)].services[optionIndex].service.min}' max='${options[Number(index)].services[optionIndex].service.max}'>${options[Number(index)].services[optionIndex].service.name}</option>`;
  }
  document.getElementById('fav_services_custom').innerHTML = selectHtmlFav;
});


$('#fav_services_custom').change(function() {
  //alert($('option:selected', this).attr('description'))
  $('#service_name').text($('option:selected', this).text());
  $('#description').text($('option:selected', this).attr('description'));
  $('#quality').text($('option:selected', this).attr('quality'));
  $('#guaranteed').text($('option:selected', this).attr('guaranteed'));
  $('#speed').text($('option:selected', this).attr('speed'));
  $('#average_time').text($('option:selected', this).attr('average_time'));
  $('#start_time').text($('option:selected', this).attr('start_time'));
  typeFavservice = $('option:selected', this).attr('type');
  typeFavServiceAddType = $('option:selected', this).attr('addType');
  favServiceId = $('option:selected', this).attr('id');
  favPrice = $('option:selected', this).attr('newPrice');
  favServiceNameOrder = $('option:selected', this).attr('name');
  minFav = $('option:selected', this).attr('min');
  maxFav = $('option:selected', this).attr('max'); 
  document.getElementById('fav_min_max_quantity').innerHTML = `الحد الادنى: ${$('option:selected', this).attr('min')} - الحد الاقصى: ${$('option:selected', this).attr('max')}`;
  document.getElementById('min_fav_service_const').innerHTML = `الحد الادنى: ${$('option:selected', this).attr('min')} - الحد الاقصى: ${$('option:selected', this).attr('max')}`;
  clearAllFav();
  tostedOrderFav.classList.remove('is-shown');

  if (typeFavservice === 'Default') {
    document.getElementById('cost_fav_service').value = favPrice;
    linkFavServicesection.classList.add('is-shown');
    costFavServicesection.classList.add('is-shown');
    userNameFavServicesection.classList.remove('is-shown');
    newPostFavServicesection.classList.remove('is-shown');
    quantityFavServicesection.classList.remove('is-shown');
    dateFavServicesection.classList.remove('is-shown');
    answerNumberFavServicesection.classList.remove('is-shown');
    readonlyFavServicesection.classList.add('is-shown');
    comentFavServicesection.classList.remove('is-shown');
  } else if (typeFavservice === 'Subscriptions') {
    linkFavServicesection.classList.add('is-shown');
    answerNumberFavServicesection.classList.remove('is-shown');
    comentFavServicesection.classList.add('is-shown');
    readonlyFavServicesection.classList.add('is-shown');
    userNameFavServicesection.classList.add('is-shown');
    newPostFavServicesection.classList.add('is-shown');
    quantityFavServicesection.classList.add('is-shown');
    dateFavServicesection.classList.add('is-shown');
    costFavServicesection.classList.remove('is-shown');
  } else if (typeFavservice === 'Custom Comments') {
    linkFavServicesection.classList.add('is-shown');
    readonlyFavServicesection.classList.remove('is-shown');
    comentFavServicesection.classList.add('is-shown');
    costFavServicesection.classList.remove('is-shown');
    userNameFavServicesection.classList.remove('is-shown');
    newPostFavServicesection.classList.remove('is-shown');
    quantityFavServicesection.classList.remove('is-shown');
    dateFavServicesection.classList.remove('is-shown');
    answerNumberFavServicesection.classList.remove('is-shown');
  } else if (typeFavservice === 'Poll') {
    linkFavServicesection.classList.add('is-shown');
    answerNumberFavServicesection.classList.add('is-shown');
    readonlyFavServicesection.classList.add('is-shown');
    comentFavServicesection.classList.remove('is-shown');
    costFavServicesection.classList.remove('is-shown');
    userNameFavServicesection.classList.remove('is-shown');
    newPostFavServicesection.classList.remove('is-shown');
    quantityFavServicesection.classList.remove('is-shown');
    dateFavServicesection.classList.remove('is-shown');
  } else if(typeFavservice === 'Custom Comments Package' || typeFavservice === 'Package') {
    linkFavServicesection.classList.add('is-shown');
    answerNumberFavServicesection.classList.remove('is-shown');
    readonlyFavServicesection.classList.remove('is-shown');
    comentFavServicesection.classList.remove('is-shown');
    costFavServicesection.classList.remove('is-shown');
    userNameFavServicesection.classList.remove('is-shown');
    newPostFavServicesection.classList.remove('is-shown');
    quantityFavServicesection.classList.remove('is-shown');
    dateFavServicesection.classList.remove('is-shown');
    document.getElementById('cost_fav_service').value = favPrice;
  }
});
function favCategorySelect(favCategoryID) {
//  console.log(favCategoryID.getAttribute('id'))
  allData = JSON.parse(favCategoryID.value);
  typeFavservice = allData.type;
  typeFavServiceAddType = allData.addType;
  favServiceId = allData._id;
  favPrice = allData.price.newPrice;
  favServiceNameOrder = allData.name;
  minFav = allData.min;
  maxFav = allData.max; 
  document.getElementById('fav_min_max_quantity').innerHTML = `الحد الادنى: ${allData.min} - الحد الاقصى: ${allData.max}`;
  document.getElementById('min_fav_service_const').innerHTML = `الحد الادنى: ${allData.min} - الحد الاقصى: ${allData.max}`;
  clearAllFav();
  tostedOrderFav.classList.remove('is-shown');

  if (typeFavservice === 'Default') {
    document.getElementById('cost_fav_service').value = favPrice;
    linkFavServicesection.classList.add('is-shown');
    costFavServicesection.classList.add('is-shown');
    userNameFavServicesection.classList.remove('is-shown');
    newPostFavServicesection.classList.remove('is-shown');
    quantityFavServicesection.classList.remove('is-shown');
    dateFavServicesection.classList.remove('is-shown');
    answerNumberFavServicesection.classList.remove('is-shown');
    readonlyFavServicesection.classList.add('is-shown');
    comentFavServicesection.classList.remove('is-shown');
  } else if (typeFavservice === 'Subscriptions') {
    linkFavServicesection.classList.add('is-shown');
    answerNumberFavServicesection.classList.remove('is-shown');
    comentFavServicesection.classList.add('is-shown');
    readonlyFavServicesection.classList.add('is-shown');
    userNameFavServicesection.classList.add('is-shown');
    newPostFavServicesection.classList.add('is-shown');
    quantityFavServicesection.classList.add('is-shown');
    dateFavServicesection.classList.add('is-shown');
    costFavServicesection.classList.remove('is-shown');
  } else if (typeFavservice === 'Custom Comments' || 'Custom Comments Package' || 'Package') {
    linkFavServicesection.classList.add('is-shown');
    readonlyFavServicesection.classList.remove('is-shown');
    comentFavServicesection.classList.add('is-shown');
    costFavServicesection.classList.remove('is-shown');
    userNameFavServicesection.classList.remove('is-shown');
    newPostFavServicesection.classList.remove('is-shown');
    quantityFavServicesection.classList.remove('is-shown');
    dateFavServicesection.classList.remove('is-shown');
    answerNumberFavServicesection.classList.remove('is-shown');
  } else if (typeFavservice === 'Poll') {
    linkFavServicesection.classList.add('is-shown');
    answerNumberFavServicesection.classList.add('is-shown');
    readonlyFavServicesection.classList.add('is-shown');
    comentFavServicesection.classList.remove('is-shown');
    costFavServicesection.classList.remove('is-shown');
    userNameFavServicesection.classList.remove('is-shown');
    newPostFavServicesection.classList.remove('is-shown');
    quantityFavServicesection.classList.remove('is-shown');
    dateFavServicesection.classList.remove('is-shown');
  }
}
let delayFav;
function favServiceDelaySelect(delayValue) {
  delayFav = delayValue;
}

// function calcFav(quantity) {
//   quantity = parseFloat(quantity);
//   let cost = document.getElementById('cost_fav_service').value;
//   if (quantity == 1000) {
//     cost = parseFloat(favPrice);
//     document.getElementById('cost_fav_service').value = cost;
//   } else if (quantity != 1000) {
//     cost = parseFloat(favPrice);
//     cost = parseFloat((favPrice * quantity) / 1000);
//     document.getElementById('cost_fav_service').value = cost;
//   }
//   if (isNaN(quantity)) {
//     document.getElementById('cost_fav_service').value = parseFloat(favPrice);
//   }
// }

function calcFav(quantity) {
  quantity = parseFloat(quantity);
  let cost = document.getElementById('cost_fav_service').value;
  if (typeFavservice === 'Poll' || typeFavservice === 'Default') {
    cost = parseFloat((quantity * favPrice) / 1000);
    document.getElementById('cost_fav_service').value = cost;
  }
  if (isNaN(quantity)) {
    document.getElementById('cost_fav_service').value = '';
  }
  console.log(cost);
}

let arrCommentFav;
function calcLineFav(linesNum) {
  const text = linesNum;
  const lines = text.split('\n');
  const count = parseFloat(lines.length);
  favPrice = parseFloat(favPrice);
  const cost = (count * favPrice) / 1000;
  document.getElementById('cost_fav_service').value = cost;
 // console.log(count);
  arrCommentFav = linesNum.split('\n');
  //console.log(arrCommentFav);
}

$('#submit_fav').click((e) => {
  e.preventDefault();

  const serviceId = favServiceId;

  const quantity = String($('#quantity_fav_service').val());

  const link = $('#link_fav_service').val();

  const addType = typeFavServiceAddType;

  const typeService = typeFavservice;

  const answerNumber = $('#answer_number_fav_service').val();

  const charge = Number($('#cost_fav_service').val());

  const comments = $('#comments_fav_service').val();

  const username = $('#Username_fav_service').val();

  const min = $('#min_fav_service').val();

  const max = $('#max_fav_service').val();

  const posts = $('#new_posts_fav_service').val();

  const delay = delayFav;

  let issues = false;

  if (typeFavservice === 'Default') {
    if (!link) {
      issues = true;
      $('.fav_service_custom_issue').text('حقل ضروري');
      $('#link_fav_service').addClass('issues_input');
    } else {
      $('.fav_service_custom_issue').text('');
    }
    if (!quantity) {
      issues = true;
      $('.quantity_fav_service_issue').text('حقل ضروري');
      $('#quantity_fav_service').addClass('issues_input');
    } else if (Number(quantity) < minFav) {
      issues = true;
      $('.quantity_fav_service_issue').text('الكمية قليله');
      $('#quantity_fav_service').addClass('issues_input');
    } else if (Number(quantity) > maxFav) {
      issues = true;
      $('.quantity_fav_service_issue').text('الكمية كبيرة');
      $('#quantity_fav_service').addClass('issues_input');
    } else {
      $('.quantity_fav_service_issue').text('');
    }
  }

  if (typeFavservice === 'Poll') {
		  if (!quantity) {
      issues = true;
      $('.quantity_fav_service_issue').text('حقل ضروري');
      $('#quantity_fav_service').addClass('issues_input');
    } else if (Number(quantity) < minFav) {
      issues = true;
      $('.quantity_fav_service_issue').text('الكمية قليله');
      $('#quantity_fav_service').addClass('issues_input');
    } else if (Number(quantity) > maxFav) {
      issues = true;
      $('.quantity_fav_service_issue').text('الكمية كبيرة');
      $('#quantity_fav_service').addClass('issues_input');
    } else {
      $('.quantity_fav_service_issue').text('');
    }
    if (!link) {
      issues = true;
      $('.fav_service_custom_issue').text('حقل ضروري');
      $('#link_fav_service').addClass('issues_input');
    } else {
      $('.fav_service_custom_issue').text('');
    }
    if (!answerNumber) {
      issues = true;
      $('.answer_number_fav_service').text('حقل ضروري');
      $('#answer_number_fav_service_issue').addClass('issues_input');
    } else {
      $('.answer_number_fav_service').text('');
    }
  }

  if (typeFavservice === 'Custom Comments') {
    if (!link) {
      issues = true;
      $('.link_fav_service').text('حقل ضروري');
      $('#fav_service_custom_issue').addClass('issues_input');
    } else {
      $('.link_fav_service').text('');
    }

    if (!comments) {
      issues = true;
      $('.comments_fav_service_issue').text('حقل ضروري');
      $('#comments_fav_service').addClass('issues_input');
    } else {
      $('.comments_fav_service_issue').text('');
    }
  }

  if (typeFavservice === 'Custom Comments Package') {
    if (!link) {
      issues = true;
      $('.link_fav_service').text('حقل ضروري');
      $('#fav_service_custom_issue').addClass('issues_input');
    } else {
      $('.link_fav_service').text('');
    }

   /* if (!comments) {
      issues = true;
      $('.comments_fav_service_issue').text('حقل ضروري');
      $('#comments_fav_service').addClass('issues_input');
    } else {
      $('.comments_fav_service_issue').text('');
    }*/
  }
  if (typeFavservice === 'Package') {
    if (!link) {
      issues = true;
      $('.link_fav_service').text('حقل ضروري');
      $('#fav_service_custom_issue').addClass('issues_input');
    } else {
      $('.link_fav_service').text('');
    }
  }

  if (issues) return;
  const addDataFavOrder = {
    serviceId,

    link,
    addType,
    typeService,
  };

  if (comments) {
    addDataFavOrder.comments = arrCommentFav;
  }
  if (quantity) {
    addDataFavOrder.quantity = quantity;
  }

  if (answerNumber) {
    addDataFavOrder.answer_number = answerNumber;
  }

  if (username) {
    addDataFavOrder.username = username;
  }
  if (min) {
    addDataFavOrder.min = min;
  }
  if (max) {
    addDataFavOrder.max = max;
  }
  if (posts) {
    addDataFavOrder.posts = posts;
  }
  if (delay) {
    addDataFavOrder.delay = delay;
  }
  if (charge) {
    addDataFavOrder.charge = charge;
  }

  $.post({
    method: 'POST',
    url: 'api/order/add',
    data: addDataFavOrder,
  })
  .then((data) => {
    tostedOrderFav.classList.add('is-shown');
    document.getElementById('tosted_order_link').innerHTML = link;
    document.getElementById('tosted_order_service_name').innerHTML = favServiceNameOrder;
    if (quantity) {
      document.getElementById('tosted_order_quantity').innerHTML = quantity;
    } else {
      document.getElementById('tosted_order_quantity').innerHTML = charge * 1000;
    }
    document.getElementById('tosted_order_cost').innerHTML = charge;
    clearAllFav();
    location.reload();
  })
  .fail((error) => {
    console.log(error)
    if(error.responseJSON.issues.charge.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.charge.message,
      );
    } else if(error.responseJSON.issues.answer_number.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.answer_number.message,
      );
    } else if(error.responseJSON.issues.comments.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.comments.message,
      );
    } else if(error.responseJSON.issues.delay.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.delay.message,
      );
    } else if(error.responseJSON.issues.expiry.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.expiry.message,
      );
    } else if(error.responseJSON.issues.link.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.link.message,
      );
    } else if(error.responseJSON.max.answer_number.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.max.message,
      );
    } else if(error.responseJSON.issues.min.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.min.message,
      );
    } else if(error.responseJSON.issues.posts.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.posts.message,
      );
    } else if(error.responseJSON.issues.quantity.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.quantity.message,
      );
    } else if(error.responseJSON.issues.username.status === true) {
      $('.order_all_service_fav_issue').text(
        error.responseJSON.issues.username.message,
      );
    } 
  });
  /*.fail((error) => {
    $('.fav_service_custom_issue').text(error.responseJSON.issues.link.message);
    $('#link_fav_service').addClass('issues_input');
    console.log(error);
    // $('#add_type_name').addClass('issues_input');
    // $('.add-user-message').text(error.responseJSON.issues.all.message);
  });*/
  
  //console.log(addDataFavOrder);
});
