var _id = '';
var status = '';
var username = '';
var user = '';
var domain = '';
var requestChildPanel = '';

const editModal = document.querySelector("#edit_modal");
function openEditModal(el) {
    
    _id = el.getAttribute("data-_id");
    console.log(_id)
    status = el.getAttribute("data-status");
    user = el.getAttribute("data-user");
    username = el.getAttribute("data-username");
    domain = el.getAttribute("data-domain");
    requestChildPanel = el.getAttribute("data-requestChildPanel");
   // alert(status === 'false')
    document.getElementById("requestChildPanel").value = requestChildPanel;
    document.getElementById("user").value = user;
    document.getElementById("username").value = username;
    document.getElementById("domain").value = domain;
    var statusHmtl = ''
    if(status === 'false') {
        statusHmtl = `
        <option class="status_shop_option" value="true">يعمل</option>
        <option class="status_shop_option" value="false" selected>معلق مؤقتا</option>
        `
    } else {
        statusHmtl = `
        <option class="status_shop_option" value="true" selected>يعمل</option>
        <option class="status_shop_option" value="false" >معلق مؤقتا</option>
        `
    }
    $('.status_shop_option').remove();
    $('#status_shop').append(statusHmtl);
    editModal.classList.add("is-shown");
    statusHmtl = '';
}
document.querySelector("#edit_modal_close").addEventListener("click", () => {
    editModal.classList.remove("is-shown");
});
document.querySelector("#edit_modal_cancel").addEventListener("click", () => {
    editModal.classList.remove("is-shown");
});

$('#edit_user').click(function () {

    var settings = {
        "url": `/api/admin/child_panels/update/${_id}`,
        "method": "PUT",
        "timeout": 0,
        "data": {
          status: JSON.parse($('#status_shop').val())
        },
      };
      
      $.ajax(settings).done(function (response) {
        location.reload();
      });
    
})