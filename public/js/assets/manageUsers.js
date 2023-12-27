const usersModal = document.querySelector("#usersModal");
document.querySelector("#addNewUser").addEventListener("click", () => {
    usersModal.classList.add("is-shown");
});

document.querySelector("#close").addEventListener("click", () => {
    document.getElementById("add_user_username").value = "";
    document.getElementById("add_user_email").value = "";
    document.getElementById("add_user_password").value = "";
    usersModal.classList.remove("is-shown");
});
document.querySelector("#cancel").addEventListener("click", () => {
    document.getElementById("add_user_username").value = "";
    document.getElementById("add_user_email").value = "";
    document.getElementById("add_user_password").value = "";
    usersModal.classList.remove("is-shown");
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.getElementById("add_user_username").value = "";
        document.getElementById("add_user_email").value = "";
        document.getElementById("add_user_password").value = "";
        usersModal.classList.remove("is-shown");
    }
});
const editModal = document.querySelector("#edit_modal");
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        editModal.classList.remove("is-shown");
    }
});
let name;
let firstName;
let lastName;
let email;
let balance;

let updateUserId;
function openEditModal(el) {
    name = el.getAttribute("data-user-username");
    firstName = el.getAttribute("data-user-firstName");
    lastName = el.getAttribute("data-user-lastName");
    email = el.getAttribute("data-user-email");
    updateUserId = el.getAttribute("data-id");
    balance = el.getAttribute("data-balance");
    rate = el.getAttribute("data-rate");
   // console.log(rate);
    document.getElementById("edit_balance").value = balance;
    document.getElementById("edit_username").value = name;
    document.getElementById("edit_firstname").value = firstName;
    document.getElementById("edit_lastname").value = lastName;
    document.getElementById("edit_email").value = email;
    document.getElementById("edit_rate").value = rate;
    editModal.classList.add("is-shown");
}

document.querySelector("#edit_modal_close").addEventListener("click", () => {
    editModal.classList.remove("is-shown");
});
document.querySelector("#edit_modal_cancel").addEventListener("click", () => {
    editModal.classList.remove("is-shown");
});

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

$("#edit_user").click(function () {
    var username = $("#edit_username").val();
    var firstname = $("#edit_firstname").val();
    var lastname = $("#edit_lastname").val();
    var editemail = $("#edit_email").val();
    var balance = $("#edit_balance").val();
    var rate = $("#edit_rate").val();
    var issues = false;
    if (!balance) {
        issues = true;
        $(".username_issue").text("اسم المستخدم حقل ضروري");
        $("#edit_username").addClass("issues_input");
    }
    // if(!username) {
    //    issues = true;
    //    $('.username_issue').text('اسم المستخدم حقل ضروري');
    //    $('#edit_username').addClass('issues_input');
    // } else if(username.length < 4) {
    //    issues = true;
    //    $('.username_issue').text('اسم المستخدم قصير جدا يجب ادخال اسم مستخدم أكثر من 3 أحرف');
    //    $('#edit_username').addClass('issues_input');
    // } else {
    //    $('.username_issue').text('');
    //    $('#edit_username').removeClass('issues_input');
    // }

    if (!firstname) {
        issues = true;
        $(".firstname_issue").text("الاسم الأول حقل ضروري");
        $("#edit_firstname").addClass("issues_input");
    }

    if (!lastname) {
        issues = true;
        $(".lastname_issue").text("الاسم الأخير حقل ضروري");
        $("#edit_lastname").addClass("issues_input");
    }

    //      if(!editemail) {
    //    issues = true;
    //    $('.email_issue').text('البريد الاكتروني حقل ضروري');
    //    $('#edit_email').addClass('issues_input');
    // } else if(validateEmail(editemail) === null) {
    //    issues = true;
    //    $('.email_issue').text('أدخل بريد الكتروني صحيح');
    //    $('#edit_email').addClass('issues_input');
    // } else {
    //    $('.email_issue').text('');
    //    $('#edit_email').removeClass('issues_input');
    // }

    if (issues) return;

    $.post({
        method: "PUT",
        url: `/api/admin/user/update/${updateUserId}`,
        data: {
            username: username,
            firstName: firstname,
            lastName: lastname,
            email: editemail,
            balance,
            rate: !rate ? 0 : rate,
        },
    })
        .then((data) => {
            $(".add-user-message").text(data.message);
            setTimeout(() => {
                window.location.reload(true);
            });
        })
        .fail((error) => {
            $(".add-user-message").text(error.responseJSON.issues.all.message);
        });
});

const setPasswordModal = document.querySelector("#set_password_modal");

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setPasswordModal.classList.remove("is-shown");
    }
});

let username;
let setPassid;
function openSetPasswordModal(name) {
    username = name.getAttribute("data-user-username");
    setPassid = name.getAttribute("data-id");

    document.getElementById("set_password_username").value = username;
    setPasswordModal.classList.add("is-shown");
}

$("#edit_user_password").click(function () {
    var username = $("#set_password_username").val();
    var password = $("#set_password").val();

    var issues = false;
    if (!username) {
        issues = true;
        $(".username_issue").text("اسم المستخدم حقل ضروري");
        $("#set_password_username").addClass("issues_input");
    } else if (username.length < 4) {
        issues = true;
        $(".username_issue").text("اسم المستخدم قصير جدا يجب ادخال اسم مستخدم أكثر من 3 أحرف");
        $("#set_password_username").addClass("issues_input");
    } else {
        $(".username_issue").text("");
        $("#set_password_username").removeClass("issues_input");
    }

    if (!password) {
        issues = true;
        $(".password_issue").text("كلمة المرور حقل ضروري");
        $("#set_password").addClass("issues_input");
    } else if (password.length < 8) {
        issues = true;
        $(".password_issue").text("كلمة المرور قصيرة جدا يجب ادخال كلمة مرور أكثر من 7 أحرف");
        $("#set_password").addClass("issues_input");
    } else {
        $(".password_issue").text("");
        $("#set_password").removeClass("issues_input");
    }

    if (issues) return;

    $.post({
        method: "PUT",
        url: `/api/admin/user/update/password/${setPassid}`,
        data: {
            username: username,
            password: password,
        },
    })
        .then((data) => {
            $(".add-user-message").text(data.message);
            setTimeout(() => {
                window.location.reload(true);
            });
            //
        })
        .fail((error) => {
            $(".add-user-message").text(error.responseJSON.issues.all.message);
        });
});

document.querySelector("#set_password_modal_close").addEventListener("click", () => {
    setPasswordModal.classList.remove("is-shown");
});
document.querySelector("#set_password_modal_cancel").addEventListener("click", () => {
    setPasswordModal.classList.remove("is-shown");
});

//  const CopyCustomRatesModal = document.querySelector("#Copy_custom_rates_modal");
// document.querySelector("#copy_rates").addEventListener("click", ()=>{
//   CopyCustomRatesModal.classList.add('is-shown');
// });

//  document.querySelector("#Copy_custom_rates_modal_close").addEventListener("click", ()=>{
//   CopyCustomRatesModal.classList.remove('is-shown');
// });
//  document.querySelector("#Copy_custom_rates_modal_cancel").addEventListener("click", ()=>{
//   CopyCustomRatesModal.classList.remove('is-shown');
// });

//  const userSignInHistoryModal = document.querySelector("#user_sign_in_history_modal");
//     document.querySelector("#sign_in_history").addEventListener("click", ()=>{
//       userSignInHistoryModal.classList.add('is-shown');
//     });

//      document.querySelector("#user_sign_in_history_modal_close").addEventListener("click", ()=>{
//       userSignInHistoryModal.classList.remove('is-shown');
//     });

const suspendsUserModal = document.querySelector("#suspends_user_modal");
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        suspendsUserModal.classList.remove("is-shown");
    }
});

let suspendsId;
function suspends(dataId) {
    suspendsId = dataId.getAttribute("data-id");
    suspendsUserModal.classList.add("is-shown");
}

$("#edit_suspends_user_modal").click(function () {
    let suspendStatus = document.querySelector("#select_suspends").value;
    let degreeDanger = document.querySelector("#select_degree").value;
    let message = document.querySelector("#suspends_message").value;
    let solutions = document.querySelector("#suspends_solutions").value;

    $.post({
        method: "PUT",
        url: `/api/admin/users/suspend/${suspendsId}`,
        data: {
            suspendStatus: suspendStatus,
            message: message,
            degreeDanger: degreeDanger,
            solutions: solutions,
        },
    })
        .then((data) => {
            $(".add-user-message").text(data.message);
            setTimeout(() => {
                window.location.reload(true);
            });
            // window.location.reload();
            //
        })
        .fail((error) => {
            $(".add-user-message").text(error.responseJSON.issues.all.message);
        });
});

document.querySelector("#suspends_user_modal_close").addEventListener("click", () => {
    suspendsUserModal.classList.remove("is-shown");
});
document.querySelector("#suspends_user_modal_cancel").addEventListener("click", () => {
    suspendsUserModal.classList.remove("is-shown");
});

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

$("#add_user").click(function () {
    var username = $("#add_user_username").val();
    var email = $("#add_user_email").val();
    var password = $("#add_user_password").val();
    var issues = false;
    if (!username) {
        issues = true;
        $(".username_issue").text("اسم المستخدم حقل ضروري");
        $("#username").addClass("issues_input");
    } else if (username.length < 4) {
        issues = true;
        $(".username_issue").text("اسم المستخدم قصير جدا يجب ادخال اسم مستخدم أكثر من 3 أحرف");
        $("#add_user_username").addClass("issues_input");
    } else {
        $(".username_issue").text("");
        $("#add_user_username").removeClass("issues_input");
    }
    if (!password) {
        issues = true;
        $(".password_issue").text("كلمة المرور حقل ضروري");
        $("#add_user_password").addClass("issues_input");
    } else if (password.length < 8) {
        issues = true;
        $(".password_issue").text("كلمة المرور قصيرة جدا يجب ادخال كلمة مرور أكثر من 7 أحرف");
        $("#add_user_password").addClass("issues_input");
    } else {
        $(".password_issue").text("");
        $("#add_user_password").removeClass("issues_input");
    }

    if (!email) {
        issues = true;
        $(".email_issue").text("البريد الاكتروني حقل ضروري");
        $("#add_user_email").addClass("issues_input");
    } else if (validateEmail(email) === null) {
        issues = true;
        $(".email_issue").text("أدخل بريد الكتروني صحيح");
        $("#add_user_email").addClass("issues_input");
    } else {
        $(".email_issue").text("");
        $("#add_user_email").removeClass("issues_input");
    }

    if (issues) return;

    $.post({
        method: "POST",
        url: "/api/admin/user/add",
        data: {
            username: username,
            password: password,
            email: email,
        },
    })
        .then((data) => {
            $(".add-user-message").text(data.message);
            setTimeout(() => {
                window.location.reload(true);
            });

            //
        })
        .fail((error) => {
            $(".add-user-message").text(error.responseJSON.issues.all.message);
        });
});

const deleteUserModal = document.getElementById("delete_item_user_modal");

let deleteUserId;
function DeleteUser(id) {
    deleteUserId = id.getAttribute("data-id");
    deleteUserModal.classList.add("is-shown");
}

$("#delete_item_user_btn").click(() => {
    $.post({
        method: "DELETE",
        url: `/api/admin/users/delete/${deleteUserId}`,
    })
        .then(() => {
            setTimeout(() => {
                window.location.reload(true);
            });
            //
        })
        .fail((error) => {
            $(".add-user-message").text(error.responseJSON.issues.all.message);
        });
});

document.querySelector("#delete_item_modal_user_cancel").addEventListener("click", () => {
    deleteUserModal.classList.remove("is-shown");
});

document.querySelector("#delete_item_modal_user_close").addEventListener("click", () => {
    deleteUserModal.classList.remove("is-shown");
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        deleteUserModal.classList.remove("is-shown");
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setPasswordModal.classList.remove("is-shown");
    }
});
