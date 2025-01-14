export default {
  is_dev: false,
  is_dark: false,
  is_popup: false,
  is_mobile: false,
  is_desktop: false,
  is_online: false,
  popup: null,
  popup_module: null,
  modules: {
    //Módulos Principais
    dev: {
      show: false,
      title: "modules.dev.title",
      icon: "mdi-code-braces",
      component: "Dev",
    },
    theme: {
      show: false,
      title: "modules.theme.title",
      icon: "mdi-palette",
      component: "Theme",
    },
    musics: {
      show: false,
      title: "modules.musics.title",
      icon: "mdi-music",
      component: "Musics",
    },
    hymnal: {
      show: false,
      title: "modules.hymnal.title",
      icon: "mdi-music-clef-treble",
      component: "Hymnal",
    },
    hymnal_1996: {
      show: false,
      language: "pt",
      title: "modules.hymnal_1996.title",
      icon: "mdi-music-clef-treble",
      component: "Hymnal1996",
    },
    collections: {
      show: false,
      title: "modules.collections.title",
      icon: "mdi-music-box-multiple",
      component: "Collections",
    },
    bible: {
      show: false,
      title: "modules.bible.title",
      icon: "mdi-book-cross",
      component: "Bible",
    },
    biblical_research: {
      show: false,
      title: "modules.biblical-research.title",
      icon: "mdi-book-search ",
      component: "BiblicalResearch",
    },

    //Módulos Dependentes
    media: {
      show: false,
      component: "Media",
      minimized: false,
      loading: false,
      id_music: null,
      id_album: null,
      data: {},
      config: {
        title: "",
        subtitle: "",
        track: 0,
        image: "",
        slide_index: 0,
        last_slide: 0,
        audio: "",
        mode: "",
        volume: 100,
        lazy: false,
        current_time: 0,
        duration: 0,
        progress: 0,
        slide_progress: 0,
        buffered: 0,
        is_paused: true,
        fullscreen: false,
      },
      times: [],
    },
    lyric: {
      show: false,
      component: "Lyric",
      loading: false,
      id_music: null,
      id_album: null,
      data: {},
      config: {
        title: "",
        subtitle: "",
        track: 0,
        image: "",
      },
    },
    album: {
      show: false,
      component: "Album",
      loading: false,
      id_album: null,
      data: {},
    },
  },
  module_group: {
    musics: {
      title: "module_group.musics.title",
      modules: ["musics", "hymnal", "hymnal_1996", "collections"],
    },
    /*bible: {
      title: "module_group.bible.title",
      modules: ["bible", "biblical_research"],
    },
    utilities: {
      title: "module_group.utilities.title",
      modules: [
        "musics",
        "hymnal",
        "collections",
        "bible",
        "biblical_research",
      ],
    },*/
  },
  menu: {
    show: false,
    modules: ["theme"],
  },
  tray_area: {
    modules: [],
  },
  languages: {
    pt: { name: "Português", flag: "br" },
    es: { name: "Español", flag: "es" },
  },
  alert: {
    show: false,
    title: "",
    text: "",
    error: "",
    color: "",
    buttons: [],
    value: "",
    translate: false,
  },
  user_data: {
    theme: "",
    language: "",
    modules: {
      musics: {
        search: {
          name: true,
          lyric: false,
          album: false,
        },
        filter: {
          instrumental_music: false,
        },
      },
      media: {
        lazy_load: true,
      },
    },
  },
};
