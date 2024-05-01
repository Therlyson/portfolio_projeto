export class GeraTexto {
    constructor(textos, tempoEspera, elementoNomeId) {
        this.textos = textos;
        this.indiceTextoAtual = 0;
        this.tempoEspera = tempoEspera;
        this.elementoNome = document.getElementById(elementoNomeId);
        this.digitarTexto();
    }
    digitarTexto() {
        let textoAtual = "";
        let texto = this.textos[this.indiceTextoAtual];
        let i = 0;
        let intervalo = setInterval(() => {
            textoAtual += texto[i];
            if (this.elementoNome) {
                this.elementoNome.textContent = textoAtual;
                this.elementoNome.style.color = '#d80000e7';
            }
            i++;
            if (i >= texto.length) {
                clearInterval(intervalo);
                setTimeout(() => this.reescreverTexto(), 100);
            }
        }, this.tempoEspera);
    }
    reescreverTexto() {
        let texto = this.textos[this.indiceTextoAtual];
        let i = texto.length - 1;
        let intervalo = setInterval(() => {
            let textoAtual = texto.substring(0, i + 1);
            if (this.elementoNome) {
                this.elementoNome.textContent = textoAtual;
                this.elementoNome.style.color = '#d80000e7';
            }
            i--;
            if (i < 0) {
                clearInterval(intervalo);
                this.indiceTextoAtual = (this.indiceTextoAtual + 1) % this.textos.length;
                this.digitarTexto();
            }
        }, this.tempoEspera / 2);
    }
}
