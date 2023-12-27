const faqsFirest = document.getElementById('faqs_0');
faqsFirest.classList.add('active');
const dataQues = JSON.parse(faqsFirest.getAttribute('data'));
document.getElementById('ques_answeq_section_answer').innerHTML = dataQues.answer;
document.getElementById('ques_answeq_section_ques').innerHTML =	dataQues.question;
function getAnwer(anwer) {
  const anwerQues = anwer.getAttribute('data-answer');
  const questionQues = anwer.getAttribute('data-question');
  document.getElementById('ques_answeq_section_answer').innerHTML = anwerQues;
  document.getElementById('ques_answeq_section_ques').innerHTML = questionQues;
}

function getAnwerSelect(anwerSelect) {
  const anwerSelectQues = JSON.parse(anwerSelect);

  document.getElementById('ques_answeq_section_answer').innerHTML = anwerSelectQues.answer;
  document.getElementById('ques_answeq_section_ques').innerHTML =	anwerSelectQues.question;
}
