const quesModal = document.querySelector('#ques_modal');
document.querySelector('#add_ques_modal').addEventListener('click', () => {
  quesModal.classList.add('is-shown');
});

document
  .querySelector('#add_ques_modal_close')
  .addEventListener('click', () => {
    quesModal.classList.remove('is-shown');
  });
document
  .querySelector('#add_ques_modal_cancel')
  .addEventListener('click', () => {
    document.getElementById('ques').value = '';
    document.getElementById('answer').value = '';

    quesModal.classList.remove('is-shown');
  });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    quesModal.classList.remove('is-shown');
  }
});
const editQuesModal = document.querySelector('#ques_edit_modal');

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    editQuesModal.classList.remove('is-shown');
  }
});
document
  .querySelector('#ques_edit_modal_close')
  .addEventListener('click', () => {
    editQuesModal.classList.remove('is-shown');
  });
document
  .querySelector('#ques_edit_modal_cancel')
  .addEventListener('click', () => {
    editQuesModal.classList.remove('is-shown');
  });

let updateQuesId;
let updateQuestion;
let updateAnswer;
let updateQuesStatus;

function editQues(quesId) {
  editQuesModal.classList.add('is-shown');
  updateQuesId = quesId.getAttribute('data-id');
  updateQuestion = quesId.getAttribute('data-ques');
  updateAnswer = quesId.getAttribute('data-answer');
  updateQuesStatus = quesId.getAttribute('data-status');

  document.getElementById('edit_ques').value = updateQuestion;
  document.getElementById('edit_answer').value = updateAnswer;
  document.getElementById('select_ques_status').value = updateQuesStatus;

  console.log(quesId);
}

$('#ques_edit_modal_btn').click(() => {
  const question = $('#edit_ques').val();
  const answer = $('#edit_answer').val();
  const Status = document.querySelector('#select_ques_status').value;

  let issues = false;
  if (!question) {
    issues = true;
    $('.username_issue').text(' السؤال حقل ضروري');
    $('#edit_ques').addClass('issues_input');
  } else {
    $('.username_issue').text('');
    $('#edit_ques').removeClass('issues_input');
  }

  if (!answer) {
    issues = true;
    $('.username_issue').text(' الجواب حقل ضروري');
    $('#edit_answer').addClass('issues_input');
  } else {
    $('.username_issue').text('');
    $('#edit_answer').removeClass('issues_input');
  }

  if (issues) return;

  $.post({
    method: 'PUT',
    url: `/api/admin/faq/update/${updateQuesId}`,
    data: {
      question,
      answer,
      statusFaq: Status,
    },
  })
    .then((data) => {
      $('.add-user-message').text(data.message);
      setTimeout(() => {
        window.location.reload(true);
      });
    })
    .fail((error) => {
      $('#edit_ques').addClass('issues_input');
      $('#edit_answer').addClass('issues_input');
      $('#select_ques_status').addClass('issues_input');
      $('.edit-answer-issue').text(error.responseJSON.issues.answer.message);
      $('.edit-ques-issue').text(error.responseJSON.issues.question.message);
      $('.edit-status-issue').text(error.responseJSON.issues.statusFaq.message);
      // $('.add-user-message').text(error.issues.message);
    });
});

$('#add_ques').click(() => {
  const ques = $('#ques').val();
  const answer = $('#answer').val();
  let issues = false;
  if (!ques) {
    issues = true;
    $('.ques_issue').text(' السؤال حقل ضروري');
    $('#ques').addClass('issues_input');
  } else if (!answer) {
    issues = true;
    $('.answer_issue').text(' الجواب حقل ضروري');
    $('#answer').addClass('issues_input');
  }

  if (issues) return;

  $.post({
    method: 'POST',
    url: '/api/admin/faq/add',
    data: {
      question: ques,
      answer,
    },
  })
    .then((data) => {
      $('.add-user-message').text(data.message);
      setTimeout(() => {
        window.location.reload(true);
      });
      //
    })
    .fail((error) => {
      $('#edit_ques').addClass('issues_input');
      $('#edit_answer').addClass('issues_input');
      $('.add-user-message').text(error.responseJSON.issues.all.message);
    });
});

const deleteQuesModal = document.getElementById('delete_item_ques_modal');

let deleteQuesAnsId;

function DeleteQuesAnswer(quesId) {
  deleteQuesModal.classList.add('is-shown');

  deleteQuesAnsId = quesId.getAttribute('data-id');
}

$('#delete_item_ques_modal_btn').click(() => {
  $.post({
    method: 'DELETE',
    url: `/api/admin/faq/delete/${deleteQuesAnsId}`,
  })
    .then(() => {
      setTimeout(() => {
        window.location.reload(true);
      });
      //
    })
    .fail((error) => {
      $('.add-user-message').text(error.responseJSON.issues.all.message);
    });
});
document
  .querySelector('#delete_item_ques_modal_close')
  .addEventListener('click', () => {
    deleteQuesModal.classList.remove('is-shown');
  });
document
  .querySelector('#delete_item_ques_modal_cancel')
  .addEventListener('click', () => {
    deleteQuesModal.classList.remove('is-shown');
  });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    deleteQuesModal.classList.remove('is-shown');
  }
});
