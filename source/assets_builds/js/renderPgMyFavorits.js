document.addEventListener('DOMContentLoaded', () => {

    if(document.querySelector('.pgFavorite')) {
        /************************************************************************
         RENDER HTML
         ************************************************************************/
        function renderHTML() {

            let bearer = 'Bearer ' + localStorage.getItem('_userTokenJwt')
            let dataUser = JSON.parse(localStorage.getItem('_dataUser'))
            let urlGET = `${process.env.URL_BASE}/proxy/favorits__list__${dataUser['hash']}`

            const divListCards = document.querySelector("#cards")
            fetch(urlGET, {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then((data) => {

                if (data.status == "success") {
                    data.results.forEach((item) => {

                        let imageCover = `${process.env.URL_BASE}/assets/images/image-not-found.jpg`

                        if (item.poster_path !== "null") {
                            imageCover = `${process.env.API_TMDB_PATH_IMAGES}${item.poster_path}`
                        }

                        let html = `
                    <article class="container-middle border-favorite">
                        <img class="article-img imageCover-middle" src="${imageCover}" alt=" ">
                        <h1 class="article-title">${item.title}</h1>
                        <div class='middle'>
                            <div class='text'>
                                <button class='btnFavorite' alt='Favoritar' data-favorite='${item.id}'>
                                    <img class="article-img icon-middle iconBtnFavorite" src="${process.env.URL_BASE}/assets/images/trash-bin.svg" alt=" ">
                                </button>
                            </div>
                        </div>
                    </article>
                  `
                        divListCards.insertAdjacentHTML('beforeend', `${html}`)
                    })
                    addEventClickFavorite()
                } else if (data.status == "error") {
                    let divOpssFavorits = document.querySelector("#oops")
                    let html = `
                         ${data.message}
                      `
                    divOpssFavorits.insertAdjacentHTML('beforeend', `${html}`)
                }

            }).catch((error) => {

                let divOpssFavorits = document.querySelector("#oops")
                let html = `
                        <h2>Oooops, </h2>
                        <p>Erro na comunicação: ${error}</p>
                      `
                divOpssFavorits.insertAdjacentHTML('beforeend', `${html}`)

            });

        }

        /************************************************************************
         FAVORITES
         ************************************************************************/
        function addEventClickFavorite() {
            const btnsFavorits = document.querySelectorAll('.btnFavorite')
            btnsFavorits.forEach((e) => {
                e.addEventListener('click', (event) => {
                    updateDb(e)
                })
            })
        }

        function updateDb(element) {

            let id_movie = element.getAttribute("data-favorite")
            //Prepare data for Send
            let bearer = 'Bearer ' + localStorage.getItem('_userTokenJwt')
            let urlDELETE = `${process.env.URL_BASE}/proxy/favorits__delete__${id_movie}`

            fetch(urlDELETE, {
                method: 'DELETE',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then((data) => {

                if (data.status == "success") {
                    element.closest("article").remove()
                    toast(data.message, "success", 3000)
                } else if (data.status == "error") {
                    toast(data.message, "error", 3000)
                }

            }).catch((error) => {
                toast(`Oooops, Erro na comunicação: ${error}`, "error", 3000)
            });

        }

        renderHTML()
    }

});