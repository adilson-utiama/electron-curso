const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvaDados(curso, tempoEstudado){
        let arquivoDoCurso = __dirname + '/data/' + curso + '.json';
        if(fs.existsSync(arquivoDoCurso)){
            this.adicionatempoAoCurso(arquivoDoCurso, tempoEstudado);
        }else{
            this.criaArquivoDeCurso(arquivoDoCurso,{})
                .then(() => {
                    this.adicionatempoAoCurso(arquivoDoCurso, tempoEstudado);
                });
        }
    },
    adicionatempoAoCurso(arquivoDoCurso, tempoEstudado){
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        }
        jsonfile.writeFile(arquivoDoCurso, dados, {spaces: 2})
                .then(() => {
                    console.log('Arquivo salvo com sucesso!');
                }).catch((err) => {
                    console.log(err)
                });
    },
    criaArquivoDeCurso(nomeArquivo, conteudoArquivo){
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
                .then(() => {
                    console.log('Arquivo Criado');
                }).catch((err) => {
                    console.log(err);
                });
    },
    pegaDados(curso){
        let caminhoDoCurso = __dirname + '/data/' + curso + '.json';
        return jsonfile.readFile(caminhoDoCurso);
    }
}
