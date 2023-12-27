const detailServiceModal = document.getElementById('servModal_custom');
let serviceIdFav;

function detailShow(details) {
  detailServiceModal.classList.add('modal-fade');
  //serviceIdFav = JSON.parse(details.getAttribute('data-id'));
  $('#service_name_custom').text(details.getAttribute('data-name'));
  $('#average_time_custom').text(details.getAttribute('data-averageTime'));
  $('#details_description').html(details.getAttribute('data-description'));
  $('#guaranteed_custom').text(details.getAttribute('data-guarantee'));
  $('#quality_custom').text(details.getAttribute('data-quality'));
  $('#speed_custom').text(details.getAttribute('data-speed'));
  $('#start_time_custom').text(details.getAttribute('data-startTime'));
 /* setTimeout(() => {
	 	$.get({
      method: 'GET',
      url: `/api/service/views/${serviceIdFav}`,
    }).then((data) => {
      document.getElementById('details_description').innerHTML = data.service.description;

      console.log(data);
    });
  }, 500);*/
}

let statusFav;
let statusFavCatId;
let statusFavId;
let typeFavserviceStatus;
function favList(statusFavService) {
  typeFavserviceStatus = statusFavService.getAttribute('data-status');
  statusFavCatId = statusFavService.getAttribute('data-category');
  statusFavId = statusFavService.getAttribute('data-fav');
	let type = false;
  typeFavserviceStatus === 'false'?type=true:type=false;
  $.post({
    method: 'POST',
    url: `/api/favorite/add/${statusFavCatId}/${statusFavId}`,
    data: {
      type,
    },
  })
  .then((data) => {
    location.reload();
  })
  .fail((error) => {
    console.log(error);
  });
}

function detailClose() {
  detailServiceModal.classList.remove('modal-fade');
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    detailServiceModal.classList.remove('modal-fade');
  }
});
