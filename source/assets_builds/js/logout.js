document.addEventListener('DOMContentLoaded', () => {

    if(document.querySelector('#buttonLogout')){

        let buttomLogout = document.querySelector('#buttonLogout');
        buttomLogout.addEventListener("click", (e) => {

            e.preventDefault()

            if (localStorage.getItem('_userTokenJwt') !== null) {
                localStorage.removeItem("_userTokenJwt")
            }

            if (localStorage.getItem('_dataUser') !== null) {
                localStorage.removeItem("_dataUser")
            }

            window.location.href = `${buttomLogout.getAttribute("href")}`

        })

    }

});