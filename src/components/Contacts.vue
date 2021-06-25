<template>
  <h1>{{ title }}</h1>
  <h1 class="modal-title">{{ header }}</h1>
    <form @submit.prevent="addContact(this.contact)">
      <label>First Name</label>
      <input
        type="text"
        name="first_name"
        v-model="contact.first_name"
      />
      <label>Last Name</label>
      <input
        type="text"
        name="last_name"
        v-model="contact.last_name"
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        v-model="contact.email"
      />
      <label>Phone</label>
      <input
        type="text"
        name="phone"
        v-model="contact.phone"
      />
      <label>Position</label>
      <input
        type="text"
        name="position"
        v-model="contact.position"
      />
      <div class="submit">
        <button class="submit" @click="addContact">Submit</button>
      </div>
    </form>
  <button @click="showContacts()">Refresh Contacts List</button>

    <div v-if="conrtact">
      <li
        class="contacts"
        v-for="contact in contacts"
        :key="contact.id"
      >
      {{ contact.id }} -- {{ contact.first_name }} -- {{ contact.last_name }} -- {{ contact.email }} -- {{ contact.phone }} -- {{ contact.position }}
      <div @click="updateContact"></div>
      </li>
  </div>
  <div v-else>Loading Contacts...</div>
  <div v-if="showModal">
    <Modal :header="header" :addNew="addNew" @close="toggleModal"/>
  </div>
  <router-view/>
</template>

<script>
  export default {
    props: [ 'header', 'text', 'addClient', 'id' ],
    data() {
      return {
        contact: {
          company: '',
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          position: '',
        }

      }
    },

    methods: {
      closeModal() {
        this.$emit('close')
      },

      handleSubmit() {
        console.log('hello there')
      }
    },

    async showContacts(id) {
      try {
        const url = `http://localhost:3000/contacts/${id}`
        const response = await axios.get(url)
        const results = response.data
        this.contacts = results;
        console.log(results)
      } catch (err) {
        console.log(err)
      }
    },

    async addContacts(contact) {
      try {
        const url = `http://localhost:3000/contacts/`
        const response = await axios.post(url, contact)
        this.showContacts(client.id)
        console.log(results)
      } catch (err) {
        console.log(err)
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