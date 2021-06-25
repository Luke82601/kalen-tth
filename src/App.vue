<template>
  <h1>{{ title }}</h1>
  <h1 class="modal-title">{{ header }}</h1>
    <form @submit.prevent="addNew(this.client)">
      <label>Company</label>
      <input
        type="text"
        name="company"
        v-model="client.company"
      />
      <label>Address</label>
      <input
        type="text"
        name="address"
        v-model="client.address"
      />
      <label>Main Phone</label>
      <input
        type="text"
        name="main_phone"
        v-model="client.main_phone"
      />
      <div class="submit">
        <button class="submit" @click="addClient">Submit</button>
      </div>
    </form>
  <button @click="showClients">Refresh Clients List</button>

    <div v-if="clients">
      <li
        :to="{ name: 'Contacts' }"
        class="clients"
        v-for="client in clients"
        :key="client.id"
      >
      {{ client.id }} -- {{ client.company }} -- {{ client.address }} -- {{ client.main_phone }}
      <router-link to="/contacts">See Contacts</router-link>
      </li>
  </div>
  <div v-else>Loading Clients...</div>
  <div v-if="showModal">
    <Modal :header="header" :addNew="addNew" @close="toggleModal"/>
    <Contacts :header="client.company" :id="client.id"/>
  </div>
  <router-view/>
</template>

<script>
import axios from 'axios'
import Modal from './components/Modal'

export default {
  name: 'App',
  components: { Modal },
  data() {
    return {
      title: 'Kalen Marketing Solutions',
      header: "Manage all you clients from one easy page",
      addClient: 'addClient',
      showModal: false,
      clients: null,
      client: {
        id: '',
        company: '',
        address: '',
        main_phone: '',
      }
    }
  },

  methods: {
    async mounted() {
      try {
        showClients()
      } catch (err) {
        console.log(err)
      }
    },

    handleClick() {
      console.log(this.$refs.name)
      this.$refs.name.classList.add('active')
      this.$refs.name.focus()
    },

    toggleModal() {
      this.showModal = !this.showModal
    },

    async addNew(client) {
      try {
       const url = `http://localhost:3000/clients/${client.id}`
       const response = await axios.post(url, client)
       this.showClients()
       console.log(results)
      } catch (err) {
        console.log(err)
      }
    },

    async showClients() {
      try {
        const url = 'http://localhost:3000/clients'
        const response = await axios.get(url)
        const results = response.data
        this.clients = results;
        console.log(results)
      } catch (err) {
        console.log(err)
      }
    }


  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.clients {
  margin: 20px;
  border-radius: 10px;
  background: lightgrey;
  list-style-type: none;
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

  .submit {
    background: rgb(0, 149, 255);
    border: 0;
    padding-top: 5px;
    margin: 5px;
    color: white;
    border-radius: 20px;
    width: 95%;
    align-items: center;
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
    padding: 10px 10px;
    margin: 20px;
    color: white;
    border-radius: 20px;
    width: 20%;
  }

  .submit {
    text-align: center;
  }

  /* .contact {
    background: rgb(0, 149, 255);
    border: 0;
    color: white;
    border-radius: 20px;
  } */
</style>
