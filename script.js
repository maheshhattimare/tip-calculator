const calculateBtn=document.getElementById('calculate-btn');
const clearBtn=document.getElementById('clear-btn');

const billInputBox=document.getElementById('bill-input-box');

const tipPercentBox=document.getElementById('tip-percent-box');
const tipSlider=document.getElementById('tip-slider');

const peopleSlider=document.getElementById('people-slider');
const totalPeopleBox=document.getElementById('total-people-box');

tipSlider.addEventListener('input',function(){
    tipPercentBox.innerHTML=tipSlider.value;
});

peopleSlider.addEventListener('input',function(){
    totalPeopleBox.innerHTML=peopleSlider.value;
});

function validateMaxLength(element) {
    if (element.value.length > 5) {
        element.value = element.value.slice(0, 12);
    }
}
window.addEventListener('DOMContentLoaded',function(){
    billInputBox.focus();
});

//variables 
const tipAmountBox=document.getElementById('tip-amount-box');
const totalToPayBox=document.getElementById('total-to-pay-box');
const totalPerPersonBox=document.getElementById('total-per-person-box');

// calculate button logic
calculateBtn.addEventListener('click',()=>{
    if(!billInputBox.value){
        billInputBox.classList.add('error');
        setTimeout(()=>{
            billInputBox.classList.remove('error');
        },3000);
    }
    else{
        calculateTip();
    }
});

function calculateTip(){
    const billAmount=parseFloat(billInputBox.value);
    const tipPercent=parseFloat(tipPercentBox.innerHTML);
    const totalPeople=parseFloat(totalPeopleBox.innerHTML);

    const tipAmount=billAmount * (tipPercent/100);
    tipAmountBox.value=(tipAmount).toFixed(2);

    const totalToPay=(billAmount+tipAmount);
    totalToPayBox.value=(totalToPay).toFixed(2);

    const totalPerPerson=(totalToPay/totalPeople).toFixed(2);
    totalPerPersonBox.value=totalPerPerson;
    
}

// clear button logic
clearBtn.addEventListener('click',function(){
    billInputBox.value=" ";
    billInputBox.focus();

    tipSlider.value=10;
    tipPercentBox.innerHTML=10;

    peopleSlider.value=1;
    totalPeopleBox.innerHTML=1;

    tipAmountBox.value=0;
    totalToPayBox.value=0;
    totalPerPersonBox.value=0;
});