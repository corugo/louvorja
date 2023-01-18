import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import {merge as deepAssign} from 'lodash/merge';
import store from './store/index.js'

import './plugins/vue-sessionstorage.js'
import './plugins/vue-json-component.js';
import './plugins/vue-flag-icon.js';
import './plugins/vue-fullscreen.js';
import './plugins/vue-shortkey.js'

import './assets/dist/css/custom.css';

import computed from './computed';
import watch from './watch';

Vue.config.productionTip = false

const DevTools = require("./helpers/DevTools");
const Locale = require("./helpers/Locale");
const Data = require("./helpers/Data");

new Vue({
  i18n,
  router,
  vuetify,
  store,
  render: function (h) { return h(App) },
  data() {
    return this.$store.state;
  },
  computed,
  watch,
  mounted() {
    this.debug = DevTools.debug();

    this.def = JSON.parse(JSON.stringify(this.data));
    //this.def = Object.assign({}, this.data);
    var self = this;

    if (this.desktop) {

      // É UMA APLICAÇÃO DESKTOP - INICIA COMUNICAÇÃO COM A MÁQUINA
      DevTools.write("Aplicação DESKTOP")

      ipcRenderer.on('displays', function (event, data) {
        self.displays = data;
      });
      ipcRenderer.on('ip', (event, data) => {
        self.ip = data;
      });
      ipcRenderer.on('platform', (event, data) => {
        self.platform = data;
      });
      ipcRenderer.on('path', (event, data) => {
        self.path = data;
      });
      ipcRenderer.on('maximize', (event, data) => {
        self.maximize = data;
      });
      //ipcRenderer.on('server', (event, data) => {
      //  self.server = data;
      //});

      // OBTEM CONFIGURAÇÕES SALVAS NA MAQUINA
      ipcRenderer.on('data', function (event, data) {
        deepAssign(self.data, data)
        self.db_port = self.data.db.port;
        DevTools.write('Obteve dados locais. Inicia conexão com o banco de dados')
        ipcRenderer.send('start_db', self.data.db.port);
      });

      ipcRenderer.on('start_db', function (event, status, port, message) {
        self.db_port = port;
        if (status == "true" || status == true) {
          DevTools.write('Conectou ao Banco de Dados. Obtém dados da web')
          ipcRenderer.send('config_web');
        } else {
          self.dialog.show = true;
          self.dialog.title = "Erro ao conectar no Banco de Dados!";
          self.dialog.text = `<span class='error--text'>${message}</span><br><br>Seu programa não irá funcionar corretamente. Tente reiniciar o programa.`;
          self.dialog.buttons = [{ text: "Fechar", color: "error", value: "cancel" }];
          self.dialog.value = '';
        }

      })

      ipcRenderer.on('save_data', function (event) {
        self.save_data = false;
        DevTools.write('Dados salvos!')
      });

      ipcRenderer.on('config_web', async function (event, data) {
        self.config_web = data;

        //checa conexão com o banco de dados
        let s = await self.getDBData();
        if (s) {
          //obtem configurações da web
          let d = await self.getApiData('config');
          if (d) {
            self.config_web = d;
            ipcRenderer.send('save_json', 'config', d, 'filedir');

            //inicia o processo de download e atualização do banco de dados
            DevTools.write('%cAtualizando Banco de Dados', 'color:blue')
            await self.downloadDB();
            DevTools.write('%cBanco de Dados atualizado!', 'color:blue')
          }
          await self.checkDownloads();
        }


        /*self.getApiData('config', function (d) {
          self.config_web = d;
          ipcRenderer.send('save_json', 'config', d, 'filedir');
          DevTools.write("rotina de downloadddd")
          self.downloadDB();
        });*/
      });

      ipcRenderer.send('config');


    } else {

      // NÃO É UMA APLICAÇÃO DESKTOP
      DevTools.write("Não é aplicação DESKTOP")

      if (localStorage.data !== undefined) {
        var c = JSON.parse(localStorage.data);
        if (c !== '' && c !== null && c !== undefined) {
          DevTools.write("JSON", c)
          deepAssign(this.data, c)
        } else {
          Data.save();
        }
      } else {
        Data.save();
      }

    }

    // CARREGA IDIOMA
    this.lang = Locale.change(self.data.lang);

    //SALVAR CONFIG
    setInterval(function () {
      if (self.save_data) {
        Data.save();
      }
    }, 1000);

    setTimeout(function () {
      document.getElementById("preload").style.display = 'none'
    }, 1000);

  }
}).$mount('#app')


//process.env.VUE_APP_VERSION = require('./package.json').version