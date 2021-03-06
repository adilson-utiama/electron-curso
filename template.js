const data = require('./data');
const { ipcMain } = require('electron');

module.exports = {
    templateInicial: null,

    geraTrayTemplate(mainWindow, app){

        let template = [
          {label: 'Cursos'},
          {
              label: 'Sair',
              click: () => {
                  app.quit();
              }
          },
          {type: 'separator'}
        ];

        let cursos = data.pegaNomeDosCursos();
        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    mainWindow.send('curso-trocado', curso);
                }
            }
            template.push(menuItem);
        })
        this.templateInicial = template;
        return template;
    },
    adicionaCursoNoTray(curso, mainWindow) {
        this.templateInicial.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                mainWindow.send('curso-trocado', curso);
            }
        });

        return this.templateInicial;
    },
    geraMenuPrincipalTemplate(app){
        let templateMenu = [
            {
                label: 'Window',
                submenu: [
                    {
                      role: 'minimize',
                      accelerator: 'Shift+m',
                    },
                    {
                      role: 'close'
                    }
                ]
            },
            {
                label: 'View',
                submenu: [
                  {
                    role: 'reload'
                  },
                  {
                    role: 'toggledevtools'
                  }
                ]
            },
            {
                label: 'Sobre',
                submenu: [
                    {
                        label: 'Sobre o Alura Timer',
                        accelerator: 'CommandOrControl+i',
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre');
                        }
                    }]
            }
        ];
        if( process.platform == 'darwin'){
            templateMenu.unshift(
                  {
                    label: app.getName(),
                    submenu: [
                        {
                            label: 'Estou rodando no Mac!'
                        }
                    ]
                  })
         }
         return templateMenu;
    }
}
