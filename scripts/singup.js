
    //declaring elements to be used on the account creation/sign up
    const form = document.getElementById('form')
    const phoneNumber = document.getElementById('phoneNumber');
    let emailInput = document.getElementById('emailInput');
    

    // function to limit phone number to only 11 digits(Nigeria's format), can edit maxentry to manipulate the max entry.
    phoneNumber.addEventListener("input", function (){
        let maxentry = 11;
        if(this.value.length > maxentry){
            this.value = this.value.slice(0, maxentry);
        }
        })
    
    // Validation process before  
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        console.log('submitted');

        let digits = document.getElementById('digits');
        let confirmDigits = document.getElementById('confirmDigits');
        
        //confirmation that both passwords are the same
        if(digits.value != confirmDigits.value){
            alert('Passowords do not match')
        }

        //fool profing password so minimum value entry(8) and string combination(alphabet and numbers) are setup up.
        let alp = /[a-zA-Z]/.test(digits.value);
        let num = /[0-9]/.test(digits.value);
        let PasswordMinimum = 8

        if(digits.value.length < PasswordMinimum){
            alert('Password has to be a minimum of 8 vlaues');
            return
        }

        if(!alp || !num){
            alert("your password must contain both numbers and alphabets");
            return
        }

        //If all entries are valid, all inputs to be displayed via alert
        let data = new FormData(form);
        let display = Object.fromEntries(data.entries());
        
        alert(JSON.stringify(display, null, 2))

    })
        

 