document.addEventListener('DOMContentLoaded', () => {

    if(document.querySelector('#login')){

        const form = document.querySelector('#login');

        form.addEventListener("submit", (e) => {
            e.preventDefault()
            sendFormAjax()
        })

        function sendFormAjax(){

            const divButtons = document.querySelector("#buttons")
            const divLoad = document.querySelector("#load")
            const msg = document.querySelector("#msg")

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
                    msg.innerHTML = `<p class="msgSuccess">${data.message}</p>`

                    //Set localStorage Token JWT
                    localStorage.setItem('_userTokenJwt', data._tokenJWT);

                    //Set localStorage DataUser
                    localStorage.setItem('_dataUser', data._dataUser)

                    //Set Sessions PHP
                    setSessionsPhp();

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

        function setSessionsPhp(){

            let dataUser = localStorage.getItem('_dataUser')
            let tokenJWT = localStorage.getItem('_userTokenJwt')

            const formData = new FormData();
            Object.entries(JSON.parse(dataUser)).forEach(([key, value]) => {
                 formData.append(key, value);
            });
            formData.append("_userTokenJwt", tokenJWT);

            fetch(`${process.env.URL_BASE}/setSession`, {
                method: 'POST',
                body: formData,
            }).then( (response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then( (data) => {

                if(data.status == "success"){

                    // Redireciona o usuário para a página do dashboard apos 1 segundo
                    setTimeout(function() {
                        window.location.href = `${data.redirect}`
                    }, 1000);

                }
                else if(data.status == "error"){

                    divLoad.style.display = "none"
                    divButtons.style.display = "block"
                    msg.style.display = "block"
                    msg.innerHTML = `<p class="msgError">${data.message}</p>`

                }

            }).catch( (error) => {
                divLoad.style.display = "none"
                divButtons.style.display = "block"
                msg.style.display = "block"
                msg.innerHTML = `${error}`

            });

        }

    }

});