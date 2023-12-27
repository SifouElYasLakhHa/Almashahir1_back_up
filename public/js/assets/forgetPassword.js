$("#reset_password").click((e) => {
  e.preventDefault();
  const email = $("#confirm_forget_email").val();
  if(!email) {
    $('#confirm_forget_email_issues').text('حقل ضروري');
    return
  } else if(!validateEmail(email)) {
    $('#confirm_forget_email_issues').text('أدخل ايمايل صحيح');
      return
  } else {
    $('#confirm_forget_email_issues').text(''); 
  }
  $(".forget_password").hide();
  $(".forget_password_succ").show();
 
  $.post({
      method: "POST",
      url: "api/auth/password/forget",
      data: {
          email,
      },
  })
  .then((data) => {
      console.log(data);
  })
  .fail((error) => {
      console.log(error);
  });
});

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
