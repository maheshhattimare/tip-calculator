const calculateBtn=document.getElementById('calculate-btn');
const billInputBox=document.getElementById('bill-input-box');
const tipPercentBox=document.getElementById('tip-percent-box');
const tipPlusBtn=document.getElementById('tip-plus-btn');
const tipNegBtn=document.getElementById('tip-neg-btn');

function validateMaxLength(element) {
    if (element.value.length > 5) {
        element.value = element.value.slice(0, 12);
    }
}
window.addEventListener('DOMContentLoaded',function(){
    billInputBox.focus();
})

//**********tip logic*********** *********** */
let tipPercentAmount=0;
tipPlusBtn.addEventListener('click',()=>{
    // tipPercentAmount=tipPercentBox.value;
    tipPercentAmount++;
    tipPercentBox.value=tipPercentAmount

    if(tipPercentAmount >= 0){
        tipNegBtn.removeAttribute('disabled')
    }
    if(tipPercentAmount >= 50){
        tipPlusBtn.setAttribute('disabled',true);
    }
});
tipNegBtn.addEventListener('click',()=>{
    // tipPercentAmount=tipPercentBox.value;
    tipPercentAmount--;
    tipPercentBox.value=tipPercentAmount
    if(tipPercentAmount == 0){
        tipNegBtn.setAttribute('disabled', true);
    }
    if(tipPercentAmount <= 50){
        tipPlusBtn.removeAttribute('disabled');
    }
});
//*********************End of tip percent logic********************* */

//**************Total people logic********************** */
const totalPeopleBox=document.getElementById('total-people-box');
const peoplePlusBtn=document.getElementById('people-plus-btn');
const peopleNegBtn=document.getElementById('people-neg-btn');

let numberOfPeople=1;
peoplePlusBtn.addEventListener('click',()=>{
    // tipPercentAmount=tipPercentBox.value;
    numberOfPeople++;
    totalPeopleBox.value=numberOfPeople

    if(numberOfPeople > 1){
        peopleNegBtn.removeAttribute('disabled')
    }
    if(numberOfPeople >= 50){
        peoplePlusBtn.setAttribute('disabled',true);
    }
});
peopleNegBtn.addEventListener('click',()=>{
    // tipPercentAmount=tipPercentBox.value;
    numberOfPeople--;
    totalPeopleBox.value=numberOfPeople
    if(numberOfPeople == 1){
        peopleNegBtn.setAttribute('disabled', true);
    }
    if(numberOfPeople <= 50){
        peoplePlusBtn.removeAttribute('disabled');
    }
});
//*********End of people section logic *********** */

const totalAmountBox=document.getElementById('total-amount-box');
const tipPerPersonBox=document.getElementById('tip-per-person');
const totalPerPersonBox=document.getElementById('total-per-person');

calculateBtn.addEventListener('click',()=>{
    if(!billInputBox.value){
        billInputBox.classList.add('error');
        setTimeout(()=>{
            billInputBox.classList.remove('error')
        },3000);
    }else{
        calculateTip();
    }
});

function calculateTip(){
    
    const billAmount=parseFloat(billInputBox.value);
    const tipPercent=parseFloat(tipPercentBox.value);
    const totalPerson=parseFloat(totalPeopleBox.value);

    const tipAmount=billAmount * (tipPercent/100);

    const tipPerPerson=(tipAmount /totalPerson).toFixed(1);
    const totalAmount=(billAmount+tipAmount).toFixed(1);
    const totalPerPerson=(totalAmount/totalPerson).toFixed(1);
    
    totalAmountBox.innerHTML=totalAmount;
    tipPerPersonBox.innerHTML=tipPerPerson;
    totalPerPersonBox.innerHTML=totalPerPerson;
}

//************clear button logic *************** */
const clearBtn=document.getElementById('clear-btn');
clearBtn.addEventListener('click', ()=>{
    billInputBox.value="";
    tipPercentAmount=0;
    tipPercentBox.value=0;
    tipNegBtn.setAttribute('disabled', true);

    numberOfPeople=1;
    totalPeopleBox.value=1;
    peopleNegBtn.setAttribute('disabled', true);

    totalAmountBox.innerHTML=0;
    tipPerPersonBox.innerHTML=0;
    totalPerPersonBox.innerHTML=0
})
