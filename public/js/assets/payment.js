let paymentMethodData;
let paymentMethodId;
let paymentMethodMin;
let paymentMethodMax;
let paymentMethodDiscount;
let paymentMethodDiscountAfter;
$('#method_custom').on('change', function() {
 // alert($(this).find(":selected").attr('discount'));
  paymentMethodData = $(this).find(":selected")
  paymentMethodId = paymentMethodData.attr('id');
  paymentMethodMin = paymentMethodData.attr('min');
  paymentMethodMax = paymentMethodData.attr('max');
 // console.log(isNaN(Number(paymentMethodData.attr('discount'))))
  paymentMethodDiscount = isNaN(Number(paymentMethodData.attr('discount')))?0:Number(paymentMethodData.attr('discount'));
  document.getElementById('payment_min').innerHTML = `min : ${paymentMethodMin}`;
  document.getElementById('payment_max').innerHTML = `max : ${paymentMethodMax}`;
});

function paymentMethods(dataPayment) {
  console.log(dataPayment)
  return
  paymentMethodData = JSON.parse(dataPayment);

  console.log(paymentMethodData);
  paymentMethodId = paymentMethodData._id;
  paymentMethodMin = paymentMethodData.min;
  paymentMethodMax = paymentMethodData.max;
  console.log(Number(paymentMethodData.discount))
  paymentMethodDiscount = isNaN(Number(paymentMethodData.discount))?0:Number(paymentMethodData.discount);
  
  document.getElementById('payment_min').innerHTML = `min : ${paymentMethodMin}`;
  document.getElementById('payment_max').innerHTML = `max : ${paymentMethodMax}`;
}

function calcPayment(amount) {
  //alert(amount)
  amount = parseFloat(amount);
  console.log(Number(paymentMethodDiscount))
  paymentMethodDiscountAfter = isNaN(parseFloat(Number(paymentMethodDiscount)))?0:parseFloat(Number(paymentMethodDiscount));
  paymentMethodDiscountAfter = (paymentMethodDiscountAfter * amount / 100);
  //console.log(isNaN(paymentMethodDiscount))
  let lastAmount;
  lastAmount = paymentMethodDiscountAfter + amount;
  //console.log(amount)
  //console.log(paymentMethodDiscount)
  document.getElementById('fundbonus_custom').value = lastAmount;
  //console.log(document.getElementById('fundbonus_custom').value);
  //console.log(document.getElementById('fundbonus_custom'));
  //console.log(lastAmount);
}
$('#submit_payment').click((e) => {
  e.preventDefault();

  const price = Number($('#amount_custom').val());
  let issues = false;
  if (!price || isNaN(price)) {
    issues = true;
    $('.amount-custom').text('حقل ضروري');
    $('#amount_custom').addClass('issues_input');
  } else if(price < paymentMethodData.attr('min')){
    $('.amount-custom').text('المبلغ المدخل صغير');
    $('#amount_custom').removeClass('issues_input');
    issues = true;
  } else if(price > paymentMethodData.attr('max')) {
    $('.amount-custom').text('المبلغ المدخل كبير');
    $('#amount_custom').removeClass('issues_input');
    issues = true;
  } else {
    $('.amount-custom').text('');
    $('#amount_custom').removeClass('issues_input');
  }

  if (issues) return;
  $.post({
    method: 'POST',
    url: '/api/stripe/invoice/create',
    data: {
      price,
      paymentMethodId,
    },
  })
    .then((data) => {
      window.open(data.link);
      //console.log(data.link);
      //return
    })
    .fail((error) => {
      console.log(error);
    });
  console.log(data);
});
