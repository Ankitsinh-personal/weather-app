console.log('this file is from client side js !!!');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    
    msg1.textContent = 'loading ...'
    msg2.textContent = ''

    // fetch('http://localhost:3000/weather?address='+location).then((response, error)=>{

    fetch('/weather?address='+location).then((response, error)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }
        else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast
            console.log(data.location);
            console.log(data.address);
            console.log(data.forecast);
        }
    })
})
})