<template>
  <div>
    <Ultrasound v-if="this.$route.params.unitId == 'ultrasound'" />
    <DimotEmergencyTable v-else />
  </div>
</template>
<script>
import Ultrasound from './Ultrasound.vue';
import DimotEmergencyTable from './DimotEmergencyTable.vue';
export default {
  components: { Ultrasound, DimotEmergencyTable },
};
</script>
