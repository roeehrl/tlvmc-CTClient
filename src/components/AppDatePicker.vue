<template>
  <div
    class="datepicker"
    :class="{ 'is-disabled': disabled }"
    v-click-outside="closePopup"
  >
    <div class="trigger" @click="togglePopup">
      <div class="tag" :class="{ 'is-live': time.live }">
        {{ time.live ? "זמן אמת" : "יומי" }}
      </div>
      <div class="date">{{ time.time.format("DD.MM.YYYY") }}</div>
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="5"
          viewBox="0 0 11 5"
        >
          <path
            fill="none"
            fill-rule="evenodd"
            stroke="#FFF"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M119 50L123.5 45 128 50"
            transform="matrix(1 0 0 -1 -118 50)"
          />
        </svg>
      </div>
    </div>

    <div class="alert-not-live" v-if="!time.live">
      <span class="alert-icon"></span>
      <div class="alert-message">
        <strong>שים לב!</strong>
        <p>
          אינך צופה בנתוני אמת, כדי לחזור לנתוני אמת יש לבטל את בחירת התאריכים
        </p>
      </div>
    </div>

    <div class="popup" v-if="popupActive">
      <div class="actions">
        <ul>
          <li
            :class="{ 'is-active': time.live }"
            @click="changeDate(null, true)"
          >
            זמן אמת
          </li>
          <li
            v-for="action in actions"
            :class="{ 'is-active': action.isActive }"
            @click="changeDate(action.date)"
          >
            {{ action.title }}
          </li>
        </ul>
      </div>

      <div class="controls">
        <div class="calendar" :class="{ 'is-live': time.live }">
          <datepicker
            v-model="date"
            :language="he"
            :disabled-dates="{ from: tomorrow }"
            inline
          >
          </datepicker>
        </div>

        <div class="time-picker">
          <div class="control">
            <label for="datepicker-time">
              <span>שעה:</span>
              <span>{{ activeDateLabel }}</span>
            </label>
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="5"
                viewBox="0 0 11 5"
              >
                <path
                  fill="none"
                  fill-rule="evenodd"
                  stroke="#FFF"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M119 50L123.5 45 128 50"
                  transform="matrix(1 0 0 -1 -118 50)"
                ></path>
              </svg>
            </div>
            <select
              v-model="selectedTime"
              id="datepicker-time"
              @change="onTimeChange"
            >
              <option value="">זמן אמת</option>
              <option v-for="option in timeOptions" :value="option.key">{{
                option.label
              }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import DatepickerHe from "vuejs-datepicker/src/locale/translations/he";

export default {
  name: "app-datepicker",

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      tomorrow: moment()
        .add(1, "day")
        .startOf("day")
        .toDate(),
      popupActive: false,
      he: DatepickerHe,
      selectedTime: "",
    };
  },

  created() {
    this.selectedTime = this.time.live
      ? ""
      : moment(this.time.time).format("HH");
  },

  methods: {
    closePopup() {
      this.popupActive = false;
    },

    togglePopup() {
      if (this.disabled) {
        return;
      }

      this.popupActive = !this.popupActive;
    },

    changeDate(date, live = false) {
      if (moment(date).isSame(this.time.time)) {
        date = moment();
        live = true;
      }

      this.$store.dispatch("changeViewDate", { date, live });
      this.selectedTime = live ? "" : moment(date).format("HH");
    },

    onTimeChange() {
      if (!this.selectedTime) {
        this.changeDate(moment(), true);
      }

      this.changeDate(this.momentDate.hour(parseInt(this.selectedTime)));
    },
  },

  computed: {
    date: {
      get() {
        return this.time.time.toDate();
      },
      set(value) {
        this.changeDate(value);
      },
    },

    momentDate() {
      return moment(this.date);
    },

    actions() {
      const globalTest = (date, unit = "day") =>
        !this.time.live && this.momentDate.isSame(date, unit);

      return [
        (date) => {
          date = date.startOf("hour");

          return {
            title: "היום",
            date,
            isActive: globalTest(date),
          };
        },
        (date) => {
          date = date.startOf("hour").subtract(1, "hour");

          return {
            title: "לפני שעה",
            date,
            isActive: globalTest(date, "hour"),
          };
        },
        (date) => {
          date = date.subtract(1, "day").startOf("hour");

          return {
            title: "אתמול",
            date,
            isActive: globalTest(date),
          };
        },
        (date) => {
          date = date.subtract(2, "day").startOf("hour");

          return {
            title: "שלשום",
            date,
            isActive: globalTest(date),
          };
        },
        (date) => {
          date = date.subtract(1, "week").startOf("hour");

          return {
            title: "שבוע שעבר",
            date,
            isActive: globalTest(date),
          };
        },
        (date) => {
          date = date.subtract(2, "week").startOf("hour");

          return {
            title: "לפניי שבועיים",
            date,
            isActive: globalTest(date),
          };
        },
        (date) => {
          date = date.subtract(1, "month").startOf("hour");

          return {
            title: "לפני חודש",
            date,
            isActive: globalTest(date),
          };
        },
        (date) => {
          date = date.subtract(1, "year").startOf("hour");

          return {
            title: "שנה שעברה",
            date,
            isActive: globalTest(date),
          };
        },
      ].map((action) => action(moment()));
    },

    timeOptions() {
      let options = [];
      let date = this.momentDate.clone().startOf("day");

      while (
        date.isSame(this.momentDate, "day") &&
        date.isSameOrBefore(moment(), "hour")
      ) {
        options.push({
          key: date.format("HH"),
          label: `בין ${date.format("HH:mm")} ל ${date
            .clone()
            .add(1, "hour")
            .format("HH:mm")}`,
        });
        date.add(1, "hour");
      }

      return options;
    },
    activeDateLabel() {
      if (!this.selectedTime) {
        return "זמן אמת";
      }

      return (
        (this.timeOptions.find((t) => t.key === this.selectedTime) || {})[
          "label"
        ] || "זמן אמת"
      );
    },
  },

  components: {
    Datepicker,
  },

  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
.datepicker {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 10;
}

.alert-not-live {
  position: relative;
  margin-right: 10px;
  z-index: 500;

  &:hover {
    .alert-message {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
  }

  .alert-message {
    position: absolute;
    left: 50%;
    top: 45px;
    padding: 20px;
    transform: translateX(-50%) translateY(-25px);
    width: 196px;
    height: 124px;
    box-shadow: 0 2px 23px 0 #000000;
    background-color: #022f4d;
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.1s ease-in-out;

    &:before {
      position: absolute;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #022f4d;
      content: "";
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
    }

    strong {
      font-size: 15px;
      font-weight: bold;
      line-height: 1.13;
      color: #ffffff;
      margin-bottom: 7px;
    }

    p {
      font-size: 14px;
      line-height: 1.21;
      color: #ffffff;
    }
  }

  .alert-icon {
    cursor: pointer;
    display: block;
    background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='26' viewBox='0 0 28 26'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23213848' d='M25.068 18.497L16.025 1.874c-1.453-2.446-4.995-2.45-6.45 0L.532 18.497c-1.485 2.5.313 5.665 3.224 5.665h18.087c2.909 0 4.71-3.162 3.225-5.665zM12.8 21.162c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm1.5-6c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5v-7.5c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5v7.5z' transform='translate(1 1)'/%3E%3Cpath stroke='%23979797' stroke-opacity='.332' d='M25.068 18.497L16.025 1.874c-1.453-2.446-4.995-2.45-6.45 0L.532 18.497c-1.485 2.5.313 5.665 3.224 5.665h18.087c2.909 0 4.71-3.162 3.225-5.665z' transform='translate(1 1)'/%3E%3C/g%3E%3C/svg%3E%0A");
    width: 26px;
    height: 25px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.trigger {
  height: 34px;
  border-radius: 22px;
  border: solid 1px rgba(151, 151, 151, 0.33);
  background-color: #213848;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 5px;
  cursor: pointer;

  .tag {
    width: 77px;
    height: 25px;
    border-radius: 12.5px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(112deg, #ff416c -1%, #ff4b2b 101%);
    text-align: center;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;

    &.is-live {
      background-image: linear-gradient(
        112deg,
        #1fd487 -1%,
        #38bee2 52%,
        #4779da 101%
      );
    }
  }

  .date {
    font-size: 14px;
    margin-left: 10px;
  }

  .icon {
    max-width: 12px;

    svg {
      display: block;
    }
  }
}

.is-disabled {
  .trigger {
    opacity: 0.5;
    cursor: default;
  }
}

.popup {
  top: calc(100% + 15px);
  right: 0;
  position: absolute;
  width: 551px;
  border-radius: 6px;
  box-shadow: 0 2px 23px 0 #000000;
  background-color: #022f4d;
  padding: 34px 22px;
  display: flex;
  z-index: 1050;

  .actions {
    width: 180px;
    margin-left: 20px;
    flex-grow: 0;
    flex-shrink: 0;

    li {
      font-size: 15px;
      line-height: 2.27;
      letter-spacing: 0.59px;
      color: #dae8fc;
      cursor: pointer;

      &:hover {
        color: rgba(16, 204, 203, 0.5);
      }

      &.is-active {
        color: #10cccb;
      }
    }
  }
}

.calendar {
  flex-grow: 1;
  flex-shrink: 1;

  ::v-deep .vdp-datepicker {
    margin: 0;

    .vdp-datepicker__calendar {
      margin: 0;
      width: 100%;
      border: 0;
      background-color: transparent;
      color: white;
    }

    header {
      display: flex;
      align-items: center;

      span {
        flex-grow: 0;
      }

      span:not(.next):not(.prev) {
        order: 3;
        flex-grow: 1;
        text-align: left;
        font-size: 15px;
        font-weight: bold;
        letter-spacing: 0.59px;
        color: #ffffff;

        &:hover {
          background: transparent;
        }
      }

      .disabled {
        opacity: 0.3;
      }

      .next {
        order: 1;
        margin-left: 10px;
      }

      .prev {
        order: 2;
        transform: rotate(180deg);
      }

      .prev,
      .next {
        background-image: url(../assets/calendar-next-icon.svg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 22px;
        height: 22px;

        &:hover {
          background: url(../assets/calendar-next-icon.svg);
        }

        &:after {
          display: none;
        }
      }
    }

    .day-header {
      font-size: 15.7px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: center;
      color: rgba(255, 255, 255, 0.54);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cell.day {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 43.84px;
      line-height: 1;
      color: #7c86a2;

      &:not(.selected):not(.disabled):hover {
        color: #34a9ff;
        border: 0;
      }

      &.selected {
        background: #34a9ff;
        border-radius: 100%;
        color: white;
      }

      &.disabled {
        opacity: 0.3;
      }
    }
  }

  &.is-live {
    ::v-deep .vdp-datepicker {
      .cell.day {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 43.84px;
        line-height: 1;
        color: #7c86a2;

        &:hover,
        &.selected:hover {
          color: #34a9ff;
          border: 0;
        }

        &.selected {
          background-color: transparent;
          color: #7c86a2;
        }

        &.disabled {
          opacity: 0.3;
        }
      }
    }
  }
}

.time-picker {
  margin-top: 20px;
  padding: 0 10px;

  .control {
    padding: 8px 10px;
    border-radius: 22px;
    border: solid 1px rgba(151, 151, 151, 0.33);
    background-color: #213848;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    cursor: pointer;

    svg {
      display: block;
    }

    label {
      color: white;
      margin: 0 0 0 10px;
      display: flex;
      align-items: center;

      span + span {
        margin-right: 5px;
      }
    }

    select {
      position: absolute;
      left: 10px;
      right: 10px;
      bottom: -5px;
      top: 0;
      width: calc(100% - 20px);
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>
