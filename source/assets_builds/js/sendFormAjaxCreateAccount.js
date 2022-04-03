document.addEventListener('DOMContentLoaded', () => {

    if(document.querySelector('#createAccount')){

        const form = document.querySelector('#createAccount');

        form.addEventListener("submit", (e) => {
            e.preventDefault()
            sendFormAjax()
        })

        function sendFormAjax(){

            const divButtons = document.querySelector("#buttons")
            const divLoad = document.querySelector("#load")
            const msg = document.querySelector("#msg")
            const btnLogin = document.querySelector("#fazerLogin")

            divButtons.style.display = "none"
            divLoad.style.display = "block"
            msg.style.display = "none"

            fetch(form.getAttribute("action"), {
                method: 'POST',
                body: new FormData(form),
            }).then( (response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then( (data) => {

                if(data.status == "success"){
                    form.reset()
                    divLoad.style.display = "none"
                    msg.style.display = "block"
                    btnLogin.style.display = "block"
                    msg.innerHTML = `<p class="msgSuccess">${data.message}</p>`

                }
                else if(data.status == "error"){

                    divLoad.style.display = "none"
                    divButtons.style.display = "block"
                    msg.style.display = "block"
                    msg.innerHTML = `<p class="msgError">${data.message}</p>`

                }

            }).catch( (error) => {

                msg.innerHTML = `${error}`

            });

        }

    }

});