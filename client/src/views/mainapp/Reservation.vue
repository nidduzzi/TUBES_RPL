<template>
   <div class="reservation container">
      <router-view />
   </div>
</template>

<script>

export default {
   name: "Reservation",
   props: ["id", "event"],
   data() {
      return {
         formValues : {},
      }
   },
   methods: {
      updateFormValue(formvalue){
         this.formValues = formvalue;
      }
   }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
</style>