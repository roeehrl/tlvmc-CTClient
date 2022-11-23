import Axios from 'axios';
import config from './config';
import moment from 'moment';

export default class Api {
  constructor(worldName) {
    this.world = worldName;
    this.serverUrl = config('API_SERVER');
    this.base = `${this.serverUrl}/`;

    this.client = Axios.create({
      baseURL: this.base,
    });
  }

  async fetchUnit(id = null, date = null, overrideWorld = null, group = null) {
    let fetchUrl = '';
    if (id) {
      fetchUrl = `${
        overrideWorld ? overrideWorld : this.world
      }/GetUnitData/${id}`;
    } else {
      fetchUrl = `${overrideWorld ? overrideWorld : this.world}/GetUnitData`;
    }
    if (group != null) {
      let queryStering = '';
      for (let i = 0; i < group.length; i++) {
        queryStering += `${i > 0 ? '&' : '?'}${group[i].key}=${group[i].value}`;
      }
      fetchUrl += queryStering;
    }
    return await this.response(
      await this.client.get(fetchUrl, {
        ...(await this.buildGlobalConfig(date)),
      })
    );
  }

  async fetchUnitPatients(id, date = null) {
    return await this.response(
      await this.client.get(`${this.world}/GetPatients/${id}`, {
        ...(await this.buildGlobalConfig(date)),
      })
    );
  }

  async fetchPatient(id, date = null) {
    return await this.response(
      await this.client.get(`${this.world}/GetPateintData/${id}`, {
        ...(await this.buildGlobalConfig(date)),
      })
    );
  }

  async fetchTrend(screenId, trendId, range = 'H', date = null) {
    return await this.response(
      await this.client.get(
        `${this.world}/GetTrend/${screenId}${
          trendId ? '/' + trendId : ''
        }/${range}`,
        {
          ...(await this.buildGlobalConfig(date)),
        }
      )
    );
  }

  async fetchWinterTrend(type, trendId = null, range = 'H', date = null) {
    return await this.response(
      await this.client.get(`Winter/${type}/${range}`, {
        ...(await this.buildGlobalConfig(date)),
      })
    );
  }

  async getMessages(lastId = 0, take = 20, all = false) {
    return await this.response(
      await this.client.get(`messages/getmessages/${lastId}`, {
        params: {
          all: all ? 1 : 0,
          take,
        },
      })
    );
  }

  async getAmbulances(overrideWorld = false, id) {
    return await this.response(
      await this.client.get(
        `${overrideWorld ? overrideWorld : this.world}/getAmbulances/${id}`,
        {}
      )
    );
  }

  async getBloodTestsData(id) {
    return await this.response(
      await this.client.get(`${this.world}/GetBloodTestsData/${id}`, {})
    );
  }

  async buildGlobalConfig(date, params = {}) {
    const config = {
      params: {},
    };

    if (date) {
      date = moment(date);
      config.params.date = date.format('MM-DD-YYYYTHH:mm');
    }

    config.params = {
      ...params,
      ...config.params,
    };

    return config;
  }

  async response({ data }) {
    return this.walk(data, (value, key) => {
      if (!key || typeof key !== 'string') {
        return value;
      }

      if (
        typeof value !== 'string' ||
        ['color', 'statuscolor', 'kpicolor'].indexOf(key.toLowerCase()) < 0 ||
        !value.trim()
      ) {
        return value;
      }

      if (
        !value.startsWith('#') &&
        !value.toLowerCase().startsWith('rgb') &&
        !value.toLowerCase().startsWith('rgba')
      ) {
        return '#' + value;
      }

      return value;
    });
  }

  walk(data, callback, key = null) {
    let isArray = Array.isArray(data);
    let isObject = !isArray && typeof data === 'object';

    if (!data || (!isObject && !isArray)) {
      return callback(data, key);
    }

    if (isObject) {
      let keys = Object.keys(data);

      for (let key of keys) {
        data[key] = this.walk(data[key], callback, key);
      }
    }

    if (isArray) {
      data = data.map((value, key) => {
        return this.walk(value, callback, key);
      });
    }

    return data;
  }
}
