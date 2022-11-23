import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      world: 'world',
      time: 'time',
      settings: 'settings',
      menuActive: 'mainMenuOpen',
      screen: 'screen',
      showTrend: 'showTrend',
      showDimotTrend: 'showDimotTrend',
      trendInline: 'trendInline',
      trend: 'trend',
      api: 'api',
      popup: 'popup',
    }),
  },
  methods: {
    getBlackWhiteIcon(iconName) {
      console.log('pre - ', this.iconName);
      let src = '';
      switch (iconName) {
        case 'nurse':
          src = 'mion-avatar.svg';
          break;
        case 'hourglass':
          src = 'hourglass-small.svg';
          break;
        case 'booking':
          src = 'booking.svg';
          break;
        case 'magnifying':
          src = 'magnifying-glass.svg';
          break;
        case 'wheel-bed':
          src = 'small-bed.svg';
          break;
        case 'ishpuz-bed':
          src = 'ishpuz-small-bed.svg';
          break;
        case 'bandages':
          src = 'small-bandages.svg';
          break;
        case 'checkList':
          src = 'small-checklist.svg';
          break;
        case 'bell':
          src = 'small-bell.svg';
          break;
        case 'ultrasound':
          src = 'small-ultrasound.svg';
          break;
          case 'ct':
            src='small-ct.svg';
            break;
        default:
          src = 'mion-avatar.svg';
          break;
      }
      console.log('src', src);
      return require(`../assets/icons/${src}`);
    },
  },
};
