let providerId;
const importServiceModal = document.getElementById('import_service_modal');
$('#import_service_category').click(function() {
    var settings = {
        "url": `${host}api/admin/providers`,
        "method": "GET",
        "timeout": 0,
      };
      $.ajax(settings).done(function (response) {
        var providers = response.providers || [];
        let selectHtml = '<option value="selectOption">اختيار الموزع</option>';
          for (let optionIndex = 0; optionIndex < providers.length; optionIndex++) {
            selectHtml += `<option value='${providers[optionIndex].name}' data-id="${providers[optionIndex]._id}">${providers[optionIndex].name}</option>`;
          }
          document.getElementById('providers_service_select_category').innerHTML = selectHtml;
      });
    importServiceModal.classList.add('is-shown');
})

$('.cancel_import_modal_x').click(function() {
    importServiceModal.classList.remove('is-shown');
})

$('.cancel_import_modal_btn').click(function() {
    importServiceModal.classList.remove('is-shown');
})

$('#providers_service_select_category').change(function() {
  providerId = $('#providers_service_select_category option:selected').attr('data-id');
  var settings = {
    "url": `${host}api/admin/providers/${providerId}/services/add_all`,
    "method": "GET",
    "timeout": 0,
  };
  $.ajax(settings).done(function (response) {
    var htmlTable = '';
    let selectHtml = '<option>اختيار  الفئة</option>';
    var index = 0;
    var categoryIndex = 0;
    for (var c of response.categories) {
      selectHtml += `<option value='${c.category.name}' data-id="${c.category._id}">${c.category.name}</option>`;
    }
    $('#providers_service_select_categories').append(selectHtml);
    $('#select_category_services_import').append(selectHtml);
    var indexCategoryServices = 0;
    for(var c of response.categories) {
      htmlTable += `
      <tr class="cate-row" data-category="${c.category.name}" data-index="${indexCategoryServices}">
        <td><input type="checkbox" class="form-check-input check_category_all_services" id="${categoryIndex}"></td>
        <td colspan="12" data-id="${c.category._id}">${c.category.name}</td>
      </tr>
      `
     // var indexServices = 0;
      for(var s of c.category.services) {
        
        if(s.exist) {
          htmlTable += `
          <tr class="table-cont serv-row" data-category="${c.category.name}" style="background-color: #A5BECC;">
            <td data-head="#">#</td> <!--<input type="checkbox" class="form-check-input check_box_add_all_service">-->
            <td data-head="الاسم">${s.name}</td>
          </tr>
          `
        } else {
          htmlTable += `
          <tr class="table-cont serv-row items_import" data-category="${c.category.name}" data-service-rate="${s.rate}" data-index="${indexCategoryServices}">
            <td data-head="#">
              <div class="row">
                <div class="col-lg-6"><input type="checkbox" class="form-check-input check_box_add_all_service ${categoryIndex}"></div>
                <div class="col-lg-6">
                  <span class="lock" onclick="lockStatus(this, $('.lock').index(this))"><i class="fas fa-unlock"></i></span>
                  <input type="number" class="form-control rate_services_import " style="width: 80px;" value="${s.rate}">
                </div>
              </div>
            </td>
            <td data-head="الاسم" class="items_td_import" data-category-type="true" data-category-id="${c.category._id}" data-category-name="${c.category.name}" data-service-type="${s.type}"  data-service-refill="${s.refill}" data-service_provider_id="${s.service}"  data-service-min="${s.min}" data-service-max="${s.max}"  data-service-rate="${s.rate}">${s.name}</td>
          </tr>
          `
        }
        index++;
      }
      categoryIndex++;
    }
    $('.results_import tbody').append(htmlTable);
    
  })
  .fail((e) => {
   // console.log(e)
    alert('حدث خطأ ما تواصل مع المطور');
  })
})

/*
var first = 1000;
var second = 1000;
for(var i = 0; i < 2;i++) {
  second = (first * 3) / 100;
  first = second + first;
}
*/