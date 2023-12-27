function changePassword(password) {
  const passwordCheck = parseFloat(password);
  let newPassword = document.getElementById("new_password").value;
  newPassword = parseFloat(newPassword);
  if (passwordCheck !== newPassword) {
      document.getElementById("confirm_update_password_issues").innerHTML = "كلمة السر غير متطابقة";
      $("#confirm_update_password").addClass("issues_input");
  } else {
      document.getElementById("confirm_update_password_issues").innerHTML = "";
      $("#confirm_update_password").removeClass("issues_input");
  }
}
$("#update_password").click((e) => {
  e.preventDefault();
  const password = String($("#confirm_update_password").val());
  const newPassword = String($("#new_password").val());
  var issues = false;
  if(!newPassword) {
    $("#update_password_issues").text('حقل ضروري');
    issues = true;
  } else if(newPassword.length < 8) {
    $("#update_password_issues").text('كلمة السر أقل من 8 أحرف');
    issues = true;
  } else if(newPassword.length > 20){
    $("#update_password_issues").text('كلمة السر أكثر من 20 حرف');
    issues = true;
  } else {
    $("#update_password_issues").text('');
  }

  if(!password) {
    $("#confirm_update_password_issues").text('كلمة السر غير متطابقة');
    issues = true;
  } else if(password.length < 8) {
    $("#confirm_update_password_issues").text('كلمة السر غير متطابقة');
    issues = true;
  } else if(password !== newPassword) {
    $("#confirm_update_password_issues").text('كلمة السر غير متطابقة');
    issues = true;
  } else {
    $("#confirm_update_password_issues").text('');
  }
  if(issues) return
  
  $.post({
      method: "PUT",
      url: "/api/auth/password/update",
      data: {
          password,
      },
  })
  .then((data) => {
    document.getElementById("update_password_issues_all").innerHTML = data.message;
    $('#confirm_update_password').val('');
    $('#new_password').val('');
  })
  .fail((error) => {
    document.getElementById("update_password_issues_all").innerHTML = error.all.message;
  });
});

$("#key_api_update").click((e) => {
  console.log('hi')
  e.preventDefault();

  $.post({
      method: "PUT",
      url: "/api/auth/key_api/update",
  })
  .then((data) => {
      document.getElementById("key_api_update_messags").innerHTML = `${data.message} <br> ${data.apiKey}`;
  })
  .fail((error) => {
      console.log(error);
  });
});

