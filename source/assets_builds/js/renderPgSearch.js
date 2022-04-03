document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('#searchMovies')) {
        const arrSearchEncodeUrl = []

        //Exec Search Submit
        /************************************************************************
         START SEARCH AFTER SUBMIT
         ************************************************************************/
        const form = document.querySelector('#searchMovies');
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            clearSearch()
            arrSearchEncodeUrl.push(encodeURI(document.querySelector("#search").value))
            getSearchResult()
            renderHTML("1")
        })

        function getSearchResult() {

            let urlApi = `${process.env.API_TMDB_ENDPOINT}${arrSearchEncodeUrl['0']}`

            fetch(urlApi, {
                method: 'GET',
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then((data) => {

                if (data.total_results >= 1) {

                    generatsPagination(data.total_pages, data.total_results)

                } else {
                    let divOpssFavorits = document.querySelector("#oops")
                    let html = `
                     <h2>Oooops, </h2>
                     <p>Não encontramos resultados!</p>
                  `

                    divOpssFavorits.insertAdjacentHTML('beforeend', `${html}`)
                }

            }).catch((error) => {

                let divOpssFavorits = document.querySelector("#oops")
                let html = `
                        <h2>Oooops, </h2>
                        <p>Erro na comunicação: ${error}</p>
                      `
                clearSearch()
                divOpssFavorits.insertAdjacentHTML('beforeend', `${html}`)

            });

        }

        /************************************************************************
         GENERATS PAGINATION
         ************************************************************************/
        function generatsPagination(totalPages, totalResults) {

            const summaryList = document.querySelector("#summaryList")
            const ulList = document.querySelector("#ulList")

            for (let i = 1; i <= totalPages; i++) {

                let htmlSummary = `<input class="itemPagination" type="radio" name="item" id="${i}" title="Página ${i}">`
                let htmlUList = `<li><label for="${i}">Página ${i}</label></li>`
                summaryList.insertAdjacentHTML('beforeend', `${htmlSummary}`)
                ulList.insertAdjacentHTML('beforeend', `${htmlUList}`)

            }

            document.querySelector("#custom-pagination").style.display = 'block';

            let divResult = document.querySelector("#result")
            divResult.style.display = 'block';
            divResult.innerHTML = `${totalResults} resultados`
            addEventClickPagination()

        }

        function addEventClickPagination() {
            const listItemPagination = document.querySelectorAll(".itemPagination")
            listItemPagination.forEach((e) => {
                e.addEventListener('click', (element) => {
                    document.querySelector("#cards").innerHTML = '';
                    renderHTML(e.getAttribute('id'))
                })
            })
        }

        /************************************************************************
         RENDER HTML
         ************************************************************************/
        function renderHTML(pageParam) {

            let urlApi = `${process.env.API_TMDB_ENDPOINT}${arrSearchEncodeUrl['0']}`
            let urlImagesPatch = `${process.env.API_TMDB_PATH_IMAGES}`
            const divListCards = document.querySelector("#cards")

            fetch(`${urlApi}&page=${pageParam}`, {
                method: 'GET',
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then((data) => {

                data.results.forEach((item) => {

                    let imageCover
                    if (item.poster_path != null) {
                        imageCover = `${process.env.API_TMDB_PATH_IMAGES}${item.poster_path}`
                    } else {
                        imageCover = `${process.env.URL_BASE}/assets/images/image-not-found.jpg`
                    }

                    let html = `
                    <article class="container-middle">
                        <img class="article-img imageCover-middle" src="${imageCover}" alt=" ">
                        <h1 class="article-title">${item.title}</h1>
                        <div class='middle'>
                            <div class='text'>
                                <button class='btnFavorite' alt='Favoritar' data-favorite='${JSON.stringify(item).replaceAll("'", "")}'>
                                    <img class="article-img icon-middle iconBtnFavorite" src="${process.env.URL_BASE}/assets/images/favorite-bin.svg" alt=" ">
                                </button>
                            </div>
                        </div>
                    </article>
                  `
                    divListCards.insertAdjacentHTML('beforeend', `${html}`)
                })
                addEventClickFavorite()

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
                    insertDb(e)
                })
            })
        }

        function favoriteSetBorder(element, message) {
            let article = element.closest("article");
            if (article.classList.contains("border-favorite")) {
                article.classList.remove('border-favorite')
                toast("Removido dos favoritos!", "info", 3000)
            } else {
                article.classList.add('border-favorite')
                toast(message, "success", 3000)
            }
        }

        /************************************************************************
         INSERT DB
         ************************************************************************/
        function insertDb(element) {

            //Prepare data for Send
            let bearer = 'Bearer ' + localStorage.getItem('_userTokenJwt')
            let dataUser = localStorage.getItem('_dataUser')
            let urlPOST = `${process.env.URL_BASE}/proxy/favorits__add`
            const formData = new FormData();
            Object.entries(JSON.parse(element.getAttribute("data-favorite"))).forEach(([key, value]) => {
                if (key != "genre_ids")
                    formData.append(key, value);
            });
            formData.append("user_hash", JSON.parse(dataUser)['hash']);

            fetch(urlPOST, {
                body: formData,
                method: 'POST',
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
                    favoriteSetBorder(element, data.message)
                } else if (data.status == "error") {
                    toast(data.message, "error", 3000)
                }

            }).catch((error) => {
                toast(`Oooops, Erro na comunicação: ${error}`, "error", 3000)
            });

        }

        /************************************************************************
         CLEAR PAGE AND SEARCH
         ************************************************************************/
        const btnClear = document.querySelector("#btnClear")
        btnClear.addEventListener("click", clearSearch)

        function clearSearch() {
            document.querySelector("#result").style.display = 'none';
            document.querySelector("#custom-pagination").style.display = 'none';
            const summaryList = document.querySelector("#summaryList").innerHTML = '<input type="radio" name="item" id="default" title="Paginaçao..." checked>';
            const ulList = document.querySelector("#ulList").innerHTML = '';
            document.querySelector("#cards").innerHTML = '';
            document.querySelector("#oops").innerHTML = '';
            arrSearchEncodeUrl.pop()
        }
    }

});