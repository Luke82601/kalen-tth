<template>
  <div class="backdrop" @click.self="closeModal">
  <div class="modal">
    <h1 class="modal-title">{{ header }}</h1>
    <form @submit.prevent="handleSubmit">
      <label>Company</label>
      <input
        type="text"
        name="company"
        v-model="company"
      />
      <label>Address</label>
      <input
        type="text"
        name="company"
        v-model="address"
      />
      <label>Main Phone</label>
      <input
        type="text"
        name="mainPhone"
        v-model="mainPhone"
      />
      <div class="submit">
        <button>Submit</button>
      </div>
    </form>
  </div>
  </div>

</template>

<script>
  export default {
    props: [ 'header', 'text', 'addNew' ],
    data() {
      return {
        client: {
          company: '',
          address: '',
          mainPhone: '',
        }

      }
    },

    methods: {
      closeModal() {
        this.$emit('close')
      },

      handleSubmit() {
        console.log('hello there')
        addNew(this.client)
      }
    }
  }
</script>

// <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal {
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 20px;
  }

  .backdrop {
    top: 0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
  }

  .modal-title {
    color: rgb(0, 149, 255);
    border: none;
    padding: 0;
  }

  form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 15px;
  }

  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }

  input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
    border-radius: 10px;
  }

  button {
    background: rgb(0, 149, 255);
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
    width: 100%;
  }

  .submit {
    text-align: center;
  }
</style>
