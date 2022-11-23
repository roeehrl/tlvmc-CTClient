<template>
  <div
    class="main-menu"
    v-click-outside="close"
    :class="{ 'is-open': menuActive }"
  >
    <div class="title">
      <span>ראשי</span>

      <div
        class="button"
        :class="{ active: slideShow }"
        @click="toggleSlideShow"
      >
        <span v-if="!slideShow">מצב יחיד</span>
        <span v-else>מצב מרובה</span>
      </div>
    </div>

    <ul class="links slide-show-checkboxes" v-if="slideShow">
      <li
        class="link"
        v-for="world in worlds"
        :class="{ 'is-active': slideShowWorlds.indexOf(world) >= 0 }"
        @click="toggleSlideShowWorld(world)"
      >
        <a>
          <span class="checkbox">
            <span class="icon" v-html="$icon('check')"></span>
          </span>

          <span class="text">{{ world.title }}</span>
        </a>
      </li>
    </ul>

    <ul class="links" v-else>
      <router-link
        v-for="world in worlds"
        :to="{ name: world.route }"
        v-if="!world.hideInMenu"
        :key="world.route"
        v-slot="{ href, route, navigate, isActive, isExactActive }"
      >
        <li
          :class="{
            link: true,
            'is-active': isActive,
            'is-active-exact': isExactActive,
          }"
        >
          <a :href="href" @click="goToRoute(navigate, $event)">
            <span class="icon" v-html="$icon(world.menuIcon)"></span>
            <span class="text">{{ world.title }}</span>
          </a>
        </li>
      </router-link>
    </ul>

    <div class="spacer"></div>

    <div class="title">הגדרות</div>

    <div class="settings">
      <div
        class="item"
        v-for="toggle in settingsToggles"
        v-if="toggle.show"
        :class="{ 'is-active': settings[toggle.key] }"
        :key="toggle.key"
      >
        <label :for="'tootle_' + toggle.key" class="item-label">
          <span class="icon" v-html="toggle.icon"></span>
          <span class="text">{{ toggle.label }}</span>
        </label>

        <label class="input-toggle">
          <input
            :id="'tootle_' + toggle.key"
            type="checkbox"
            @change="toggleSetting(toggle.key)"
            :checked="settings[toggle.key]"
          />
          <span></span>
        </label>
      </div>

      <div
        class="item"
        v-if="$config('SERVICE_EVENTS')"
        :class="{ 'is-disabled': !settings.events }"
      >
        <div class="item-row">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                fill="#DAE8FC"
                stroke="#DAE8FC"
                stroke-width=".5"
                d="M18.997 14.834c-.044-.667-.553-.911-1.043-1.15-.087-.041-.177-.085-.269-.14-.89-.485-1.459-1.402-1.5-2.415v-4.01C16.185 3.745 13.41 1 10 1 6.59 1 3.815 3.745 3.815 7.12v4.009c-.038 1.014-.606 1.934-1.496 2.422-.081.042-.163.082-.244.121-.481.23-1.025.493-1.072 1.162-.027.39.11.772.377 1.055.267.284.64.445 1.03.445h4.652C7.21 17.847 8.482 19 10 19c1.519 0 2.79-1.153 2.938-2.666h4.653c.389-.001.76-.162 1.026-.445.269-.283.406-.666.38-1.055zM10 18.444c-1.21-.001-2.229-.907-2.371-2.11h4.743c-.143 1.203-1.161 2.109-2.372 2.11h0zm8.207-2.94c-.159.171-.382.268-.616.267H2.41c-.234 0-.457-.096-.617-.267-.16-.17-.242-.4-.226-.633.02-.325.28-.469.75-.692.086-.041.173-.083.259-.127 1.08-.582 1.767-1.697 1.802-2.923v-4.01C4.377 4.055 6.9 1.563 10 1.563c3.101 0 5.623 2.492 5.623 5.556v4.01c.035 1.226.722 2.34 1.8 2.923.096.05.192.096.282.14.475.23.703.355.727.68.015.233-.066.461-.225.632z"
              />
            </svg>
          </div>
          <div class="action">
            <p class="label">יומן אירועים מיקום</p>
            <div class="control">
              <label class="radio">
                <input
                  type="radio"
                  value="left"
                  @change="$store.dispatch('saveSettings')"
                  v-model="settings.eventsPosition"
                />
                <span class="graphics"></span>
                <span class="label">שמאל</span>
              </label>
              <label class="radio">
                <input
                  type="radio"
                  value="right"
                  @change="$store.dispatch('saveSettings')"
                  v-model="settings.eventsPosition"
                />
                <span class="graphics"></span>
                <span class="label">ימין</span>
              </label>
              <label class="radio">
                <input
                  type="radio"
                  value="none"
                  @change="$store.dispatch('saveSettings')"
                  v-model="settings.eventsPosition"
                />
                <span class="graphics"></span>
                <span class="label">הסתר</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import worlds from "../worlds";

export default {
  name: "main-menu",

  data() {
    return {
      worlds,

      slideShow: false,
      slideShowWorlds: [],
      slideShowTimer: null,

      settingsToggles: [
        {
          key: "logo",
          label: "לוגו",
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="17" viewBox="0 0 23 17"><g fill="none" fill-rule="evenodd" stroke="#DAE8FC" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.008" transform="translate(1 1)"><rect width="21.168" height="3.528" rx="1.764"/><rect width="21.168" height="3.528" y="5.544" rx="1.764"/><rect width="21.168" height="3.528" y="11.088" rx="1.764"/></g></svg>',
          show: true,
        },
        {
          key: "date",
          label: "תאריך ראשי",
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21"><g fill="none" fill-rule="evenodd" stroke="#DAE8FC" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.098" transform="translate(1 1)"><path d="M0 7.527L16.936 7.527"/><rect width="16.936" height="16.936" y="1.882" rx="1.882"/><path d="M12.232 0L12.232 3.764M4.704 0L4.704 3.764"/></g></svg>',
          show: true,
        },
        {
          key: "time",
          label: "שעון ראשי",
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd" stroke="#7A92AB" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.008" transform="translate(1 1)"><circle cx="10.08" cy="10.08" r="10.08"/><path d="M9.72 3.96L9.72 10.08 16.2 10.08"/></g></svg>',
          show: true,
        },
        {
          key: "weather",
          label: "מזג אוויר",
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" viewBox="0 0 25 19"><g fill="#7A92AB" stroke="#7A92AB" stroke-width=".5"><path d="M16.515 2.524c.134 0 .242-.108.242-.242V.242c0-.134-.108-.242-.242-.242s-.242.108-.242.242v2.04c0 .133.108.242.242.242zM9.61 4.37l1.746 1.007c.038.022.08.032.121.032.084 0 .165-.043.21-.12.067-.117.028-.266-.089-.332L9.853 3.95c-.116-.068-.264-.028-.331.088-.067.116-.027.264.088.332zM21.553 5.409c.041 0 .083-.01.121-.032l1.745-1.006c.117-.068.156-.216.09-.332-.067-.116-.216-.155-.331-.088l-1.746 1.006c-.116.066-.155.215-.089.331.045.077.126.121.21.121zM23.42 11.773l-1.746-1.007c-.116-.067-.264-.027-.33.09-.068.116-.028.264.088.33l1.746 1.007c.038.022.08.033.12.033.084 0 .166-.044.21-.121.067-.117.027-.265-.089-.332z" transform="translate(1)"/><path d="M19.445 11.681c1.095-.888 1.722-2.194 1.722-3.61 0-2.564-2.087-4.65-4.652-4.65-2.162 0-4.041 1.514-4.528 3.585-1.03-.852-2.34-1.338-3.731-1.338-3.232 0-5.861 2.629-5.861 5.86 0 .07 0 .141.004.217C1.017 12.047 0 13.29 0 14.726c0 1.683 1.369 3.052 3.052 3.052H19.23c1.683 0 3.052-1.37 3.052-3.052 0-1.61-1.254-2.934-2.837-3.045zm-2.93-7.777c2.298 0 4.168 1.87 4.168 4.167 0 1.184-.49 2.282-1.352 3.07-.474-1.76-2.094-3.052-3.976-3.052-.709 0-1.4.181-2.014.526-.261-.455-.576-.867-.936-1.229.33-1.99 2.08-3.482 4.11-3.482zm2.715 13.389H3.051c-1.415 0-2.567-1.152-2.567-2.567 0-1.271.948-2.363 2.203-2.541.126-.019.217-.131.208-.258-.012-.152-.017-.279-.017-.398 0-2.965 2.413-5.377 5.377-5.377 2.02 0 3.851 1.116 4.78 2.914.03.06.086.105.152.122.067.018.137.007.194-.03.59-.382 1.272-.584 1.974-.584 1.891 0 3.482 1.476 3.621 3.36.01.127.115.225.242.225h.012c1.416 0 2.567 1.151 2.567 2.567 0 1.415-1.15 2.567-2.567 2.567z" transform="translate(1)"/></g></svg>',
          show: true,
        },
        {
          key: "events",
          label: "יומן אירועים",
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#DAE8FC" stroke="#DAE8FC" stroke-width=".5" d="M18.997 14.834c-.044-.667-.553-.911-1.043-1.15-.087-.041-.177-.085-.269-.14-.89-.485-1.459-1.402-1.5-2.415v-4.01C16.185 3.745 13.41 1 10 1 6.59 1 3.815 3.745 3.815 7.12v4.009c-.038 1.014-.606 1.934-1.496 2.422-.081.042-.163.082-.244.121-.481.23-1.025.493-1.072 1.162-.027.39.11.772.377 1.055.267.284.64.445 1.03.445h4.652C7.21 17.847 8.482 19 10 19c1.519 0 2.79-1.153 2.938-2.666h4.653c.389-.001.76-.162 1.026-.445.269-.283.406-.666.38-1.055zM10 18.444c-1.21-.001-2.229-.907-2.371-2.11h4.743c-.143 1.203-1.161 2.109-2.372 2.11h0zm8.207-2.94c-.159.171-.382.268-.616.267H2.41c-.234 0-.457-.096-.617-.267-.16-.17-.242-.4-.226-.633.02-.325.28-.469.75-.692.086-.041.173-.083.259-.127 1.08-.582 1.767-1.697 1.802-2.923v-4.01C4.377 4.055 6.9 1.563 10 1.563c3.101 0 5.623 2.492 5.623 5.556v4.01c.035 1.226.722 2.34 1.8 2.923.096.05.192.096.282.14.475.23.703.355.727.68.015.233-.066.461-.225.632z"/></svg>',
          show: this.$config("SERVICE_EVENTS"),
        },
      ],
    };
  },

  created() {},

  methods: {
    goToRoute(navigate, e) {
      navigate(e);
      this.close(e);
    },

    close(e) {
      const trigger = document.getElementById("main-menu-toggle");

      if (e.target === trigger || trigger.contains(e.target)) {
        return;
      }

      if (this.menuActive) {
        this.$store.commit("setMainMenuState", false);
      }
    },

    toggleSetting(key) {
      this.$store.dispatch("setSetting", {
        key,
        value: !this.settings[key],
      });
    },

    toggleSlideShow() {
      this.slideShow = !this.slideShow;

      if (this.slideShow) {
        this.slideShowWorlds = [this.$store.state.currentWorld];
        this.startSlideShow();
      } else {
        this.slideShowWorlds = [];
        this.stopSlideShow();
      }
    },

    startSlideShow() {
      if (this.slideShowTimer) {
        this.stopSlideShow();
      }

      this.slideShowTimer = setTimeout(() => {
        const index = this.slideShowWorlds.indexOf(
          this.$store.state.currentWorld
        );
        let nextIndex = index + 1;

        if (nextIndex >= this.slideShowWorlds.length) {
          nextIndex = 0;
        }

        const nextWorld = this.slideShowWorlds[nextIndex];

        if (!nextWorld || nextWorld === this.$store.state.currentWorld) {
          this.startSlideShow();

          return;
        }

        this.$router.replace({ name: nextWorld.route });

        this.startSlideShow();
      }, 60000);
    },

    stopSlideShow() {
      if (this.slideShowTimer) {
        clearTimeout(this.slideShowTimer);
        this.slideShowTimer = null;
      }
    },

    toggleSlideShowWorld(world) {
      const index = this.slideShowWorlds.indexOf(world);

      if (index >= 0) {
        this.slideShowWorlds.splice(index, 1);
      } else {
        this.slideShowWorlds.push(world);
      }
    },
  },

  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
$padding: 32px;

.main-menu {
  padding: 32px 0 10px;
  position: absolute;
  z-index: 100;
  right: 0;
  top: 92px;
  bottom: 0;
  width: 344px;
  box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(circle at 10% 11%, #01253c, #012339 49%);
  transform: translateX(100%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 92px);
  overflow: auto;

  &.is-open {
    transform: translateX(0);
    opacity: 1;
    pointer-events: all;
  }
}

.spacer {
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 25px;
}

.title {
  padding: 0 $padding;
  font-size: 16px;
  letter-spacing: -0.21px;
  color: #c6d9f5;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .button {
    padding: 6px 12px;
    border-radius: 50px;
    background-color: rgba(7, 50, 79, 0.7);
    cursor: pointer;
    display: none;

    span {
      display: none;
    }
    &:hover {
      background-color: rgba(7, 50, 79, 0.3);
      color: rgba(198, 217, 245, 1);
    }

    &.active {
      background-color: rgba(7, 50, 79, 0.7);
      color: #10cccb;
    }
  }
}

.links {
  .link {
    display: block;

    a {
      display: flex;
      align-items: center;
      padding: 0 $padding;
      text-decoration: none;
      font-weight: normal;
      position: relative;
    }

    .icon {
      display: flex;
      width: 42px;
      height: 42px;
      align-items: center;
      justify-content: center;
      margin-left: 19px;
      flex-grow: 0;
      flex-shrink: 0;

      ::v-deep svg {
        display: block;

        g {
          fill: #7b92ab;
        }
      }
    }

    .text {
      display: flex;
      flex-grow: 1;
      flex-shrink: 1;
      font-size: 25px;
      letter-spacing: -0.32px;
      color: rgba(198, 217, 245, 0.6);
      padding: 14px 20px;
      border-radius: 11px;
      background-color: rgba(7, 50, 79, 0);
      transition: background-color 0.2s ease-in-out, color 0.3s ease-in-out;

      &:hover {
        background-color: rgba(7, 50, 79, 0.3);
        color: rgba(198, 217, 245, 1);
      }
    }

    &.is-active {
      a:before {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background-color: #10cccb;
      }

      .text {
        background-color: rgba(7, 50, 79, 0.7);
        color: #10cccb;
      }

      .icon {
        ::v-deep svg {
          display: block;

          g {
            fill: #10cccb;
          }
        }
      }
    }

    + .link {
      margin-top: 25px;
    }
  }
}

.settings {
  .item {
    display: flex;
    padding: 0 $padding;
    align-items: center;
    color: rgba(198, 217, 245, 1);

    &.is-disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .item-label {
      flex-grow: 1;
      font-size: 20px;
      letter-spacing: -0.26px;
      color: rgba(198, 217, 245, 0.5);
      display: flex;
      align-items: center;

      .icon {
        margin-left: 20px;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 100%;
          height: 100%;
          display: block;

          g {
            stroke: rgba(198, 217, 245, 0.5);
          }
        }
      }
    }

    &.is-active {
      .item-label {
        color: rgba(198, 217, 245, 1);

        .icon svg g {
          stroke: rgba(198, 217, 245, 1);
        }
      }
    }

    + .item {
      margin-top: 40px;
    }

    .item-row {
      flex-grow: 1;
      font-size: 20px;
      letter-spacing: -0.26px;
      display: flex;
      align-items: flex-start;

      .icon {
        margin-left: 20px;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .action > .label {
        margin-bottom: 9px;
        line-height: 0.8;
      }

      .control {
        display: flex;
      }
    }
  }
}

.slide-show-checkboxes {
  .link {
    cursor: pointer;

    a {
      padding: 0 16px 0 32px;

      &:before {
        display: none;
      }
    }

    .checkbox {
      width: 22px;
      height: 22px;
      background-color: rgba(7, 50, 79, 0.7);
      border-radius: 1px;
      margin-left: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .icon {
        width: 18px;
        height: 18px;
        margin: 0;
        opacity: 0;

        ::v-deep svg {
          width: 100%;
          height: 100%;

          path {
            fill: rgba(198, 217, 245, 1);
          }
        }
      }
    }

    &.is-active {
      .checkbox {
        .icon {
          opacity: 1;
        }
      }

      .text {
        background-color: transparent;
        color: #10cccb;
      }
    }
  }
}
</style>
