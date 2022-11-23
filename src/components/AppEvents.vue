<template>
  <div class="app-events">
    <header class="header">
      <p class="title">יומן אירועים</p>
      <div class="icon">
        <div class="count" v-if="newMessages > 0">{{ newMessages }}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="27"
          viewBox="0 0 20 27"
        >
          <g fill="#1CD787">
            <path
              d="M19.407 20.464l-2.52-3.548V9.984c0-3.086-2-5.714-4.78-6.67V2.55c0-.13-.012-.257-.033-.38-.012-.068-.026-.135-.044-.201-.009-.034-.016-.069-.026-.102-.004-.012-.01-.024-.013-.036-.043-.13-.097-.257-.162-.376l-.017-.028c-.031-.055-.063-.11-.098-.161-.016-.024-.034-.045-.051-.068-.027-.037-.053-.074-.083-.11-.022-.027-.048-.052-.072-.079-.026-.028-.05-.057-.076-.084-.031-.03-.064-.058-.097-.087-.023-.02-.044-.042-.067-.061-.047-.038-.096-.074-.145-.108-.011-.008-.02-.017-.032-.024-.06-.04-.122-.078-.186-.113-.002 0-.003-.002-.004-.003-.063-.034-.128-.064-.194-.092l-.008-.004c-.062-.026-.126-.049-.19-.07l-.022-.007c-.064-.02-.129-.036-.195-.05l-.026-.007c-.054-.011-.11-.018-.166-.025-.021-.003-.042-.008-.063-.01-.044-.005-.089-.005-.133-.007C9.869.255 9.836.251 9.8.251c-1.275 0-2.308 1.028-2.308 2.297v.766c-2.78.956-4.78 3.585-4.78 6.67v6.932l-2.52 3.548c-.485.683.006 1.63.848 1.63h17.517c.184 0 .351-.044.495-.122.02-.011.041-.023.06-.036.06-.037.114-.08.163-.128.347-.332.45-.895.13-1.344zm-9.13-17.35l-.021.009-.028.012c-.011.005-.022.01-.033.013l-.017.007c-.033.012-.068.022-.102.031h-.001c-.035.01-.071.017-.107.022l-.05.007h-.006c-.011.002-.023.002-.034.003l-.022.002H9.83l-.029.002c-.607 0-1.1-.492-1.1-1.095 0-.604.493-1.095 1.1-1.095.607 0 1.1.49 1.1 1.095 0 .434-.255.81-.623.987zM6.872 23.337l-.003.094c0 1.609 1.315 2.917 2.931 2.917l.078-.002.072-.001.057-.005.092-.007.018-.002c.043-.005.086-.01.128-.017h.002c.096-.014.191-.034.284-.058h.004c.093-.025.183-.053.271-.085l.046-.018.087-.034.075-.034.056-.025c.982-.471 1.66-1.472 1.66-2.628 0-.032 0-.063-.002-.095H6.872z"
            />
          </g>
        </svg>
      </div>
    </header>

    <div
      class="timeline-container"
      ref="timelineContainer"
      :style="{ height: timelineHeight }"
    >
      <div class="timeline" v-infinite-scroll="loadMore">
        <div class="group" v-for="(group, id) of events" :key="id">
          <div class="group-header">
            <div class="title">
              <span>{{ group.date.format("DD") }}</span>
              {{ group.date.format("MMM, YYYY") }}
            </div>
            <div class="dot"></div>
          </div>

          <div class="events">
            <div
              class="event"
              :class="{
                'is-open': openEvents.indexOf(event.id) >= 0,
                'is-critical': event.critical,
              }"
              @click="toggleEvent(event.id)"
              v-for="event of group.events"
            >
              <div class="event-header">
                <div class="right">
                  <div class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="19"
                      viewBox="0 0 15 19"
                    >
                      <g fill="#C6D9F5" opacity=".4">
                        <path
                          d="M8.862 15.997H5.816c-.314 0-.551.313-.456.623.258.87 1.047 1.502 1.981 1.502.931 0 1.72-.632 1.982-1.502.09-.314-.142-.623-.46-.623zM14.248 12.617l-1.375-1.034V7.55c0-2.474-1.546-4.572-3.7-5.35v-.287C9.173.875 8.35.03 7.337.03c-1.012 0-1.835.844-1.835 1.882V2.2C3.348 2.978 1.8 5.076 1.8 7.55v4.033L.43 12.617c-.272.203-.431.526-.431.87 0 .597.47 1.078 1.051 1.078h12.576c.582 0 1.052-.481 1.052-1.078 0-.344-.16-.667-.431-.87z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div class="text">
                    <div class="title">{{ event.title }}</div>
                    <div class="subtitle">{{ event.shortContent }}</div>
                  </div>
                </div>

                <div class="left">
                  <div class="time">{{ event.date.format("HH:mm") }}</div>
                  <div class="down">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="5"
                      viewBox="0 0 11 5"
                    >
                      <path
                        fill="none"
                        fill-rule="evenodd"
                        stroke="#125c90"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M119 50L123.5 45 128 50"
                        transform="matrix(1 0 0 -1 -118 50)"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="body">
                {{ event.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";
import moment from "moment";

export default {
  name: "app-events",

  data() {
    return {
      timelineHeight: "100vh",
      events: {},
      openEvents: [],
      newMessages: 0,
      timer: null,
      ids: [],
      loading: false,
    };
  },

  created() {
    this.fetch();

    this.$nextTick(() => {
      const timelineTop = this.$refs.timelineContainer.offsetTop;
      this.timelineHeight = `calc(100vh - ${timelineTop + 15}px)`;
    });
  },

  methods: {
    toggleEvent(id) {
      if (this.openEvents.indexOf(id) >= 0) {
        this.openEvents.splice(this.openEvents.indexOf(id), 1);

        return;
      }

      this.openEvents.push(id);
    },

    getLastEventId() {
      const lastDate = (Object.values(this.events) || []).pop();

      if (!lastDate) {
        return false;
      }

      return (lastDate.events.pop() || {}).id || false;
    },

    async loadMore() {
      await this.fetch(false, true);
    },

    async fetch(refresh = false, nextPage = false) {
      if (this.loading) {
        return;
      }

      this.loading = true;

      if (this.timer && !nextPage) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      if (!refresh && !nextPage) {
        this.events = {};
        this.openEvents = [];
        this.newMessages = 0;
        this.ids = [];
      }

      let { newMessages, msgList } = await this.api.getMessages(
        nextPage ? this.getLastEventId() || 0 : 0
      );

      msgList = msgList.sort((a, b) =>
        moment(b.MsgStartDate).diff(moment(a.MsgStartDate))
      );

      for (let message of msgList) {
        const date = moment(message.MsgStartDate);
        const dateGroupKey = date.format("DD-MM-YYYY");

        if (!this.events[dateGroupKey]) {
          this.$set(this.events, dateGroupKey, {
            date: date.clone(),
            events: [],
          });
        }

        if (this.ids.indexOf(message.MsgId) >= 0) {
          continue;
        }

        this.events[dateGroupKey].events.push({
          id: message.MsgId,
          date: date.clone(),
          title: message.MsgTitle,
          critical: message.kpi > 1,
          content: message.MsgText,
          shortContent: message.MsgSubTitle,
        });

        this.ids.push(message.MsgId);

        this.events[dateGroupKey].events = this.events[
          dateGroupKey
        ].events.sort((a, b) => b.date.diff(a.date));
      }

      this.newMessages = newMessages;
      this.loading = false;

      if (!nextPage) {
        this.timer = setTimeout(() => {
          this.fetch(true);
        }, this.$config("events_refresh_interval"));
      }
    },
  },

  directives: { infiniteScroll },
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 26px;
  font-weight: bold;
  letter-spacing: -0.33px;
  color: #10cccb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
  margin-bottom: 55px;
  p{
    margin-right: 20px;
  }
  .icon {
    position: relative;

    .count {
      position: absolute;
      right: -6px;
      top: -3px;
      width: 16px;
      height: 16px;
      box-shadow: 0 5px 6px 0 rgba(21, 18, 48, 0.5);
      background-color: #ff3d3d;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      line-height: 0.8;
      font-size: 15.1px;
      letter-spacing: -0.19px;
      color: #ffffff;
      font-weight: normal;
    }

    svg {
      display: block;
    }
  }
}

.timeline-container {
  padding: 0 6px 0 10px;
  overflow: auto;
}

.timeline {
  padding: 20px 18px 20px 0;
  border-right: 1px dashed white;
  color: white;
  .group {
    + .group {
      margin-top: 20px;
    }

    .group-header {
      position: relative;
      margin-bottom: 10px;

      .title {
        font-size: 15px;
        color: #ffffff;
        line-height: 0.9;
        marg
        span {
          font-size: 30px;
          font-weight: bold;
          color: #ffffff;
          margin-left: 5px;
        }
      }

      .dot {
        position: absolute;
        width: 13px;
        height: 13px;
        background-color: #10cccb;
        border-radius: 100%;
        right: -18px;
        transform: translateX(50%) translateY(50%);
        top: 0;
      }
    }
  }
}

.event {
  border-radius: 3px;
  box-shadow: 0 2px 17px 0 rgba(0, 0, 0, 0.2);
  background-image: radial-gradient(circle at 10% 11%, #032b45, #042840 36%);
  padding: 11px;
  border-right: 4px solid #5f72ff;
  cursor: pointer;

  &.is-critical {
    border-right: 4px solid #de4e6c;
  }

  + .event {
    margin-top: 10px;
  }

  .event-header {
    display: flex;

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;

      .time {
        font-size: 14px;
        letter-spacing: -0.18px;
        color: #0f9ed2;
        line-height: 0.8;
      }

      .down {
        svg {
          display: block;
        }
      }
    }

    .right {
      flex-grow: 1;
      display: flex;

      .icon {
        svg {
          display: block;
        }
      }

      .text {
        margin-right: 10px;
        line-height: 0.8;

        .title {
          font-size: 21.5px;
          font-weight: bold;
          letter-spacing: -0.28px;
          color: #c6d9f5;
          margin-bottom: 5px;
        }

        .subtitle {
          font-size: 16px;
          letter-spacing: 0.22px;
          color: #dae8fc;
        }
      }
    }
  }

  .body {
    padding: 11px 28px 10px;
    font-size: 16px;
    letter-spacing: -0.21px;
    color: #c6d9f5;
    display: none;
  }

  &.is-open {
    border-right: 4px solid transparent;
    background-image: radial-gradient(circle at 10% 11%, #035c7c, #035c7c 36%);

    .body {
      display: block;
    }

    .left {
      .down {
        display: none;
      }
    }
  }
}
</style>
