const base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdownSelects = document.querySelectorAll(".drop-down select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".select-from select");
const toCurr=document.querySelector(".select-to select");
const msg=document.querySelector("#msg");

for (let select of dropdownSelects) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode == "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}
const updateFlag = (element) => {
   let currCode=element.value;
   let countryCode=countryList[currCode];
   let newSrclink=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newSrclink;
};
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault;
    let amount=document.querySelector("#input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value='1';
    }
    console.log(fromCurr.value,toCurr.value)
    const URL=`${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    // console.log(data);
    // console.log(rate)
    let finalAmt=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}= ${finalAmt} ${toCurr.value}`;
})
