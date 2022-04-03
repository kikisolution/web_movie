document.addEventListener('DOMContentLoaded', () => {

    if(document.querySelector('#dateCurrent')){

        const interval = setInterval(() => {

            const zeroFill = n => {
                return ('0' + n).slice(-2);
            }

            dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")
            monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")
            const now = new Date
            document.getElementById('dateCurrent').innerHTML = "Hoje é " + dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName [now.getMonth() ] + " de " + now.getFullYear () + ", " + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds())

        }, 1000);

    }

});