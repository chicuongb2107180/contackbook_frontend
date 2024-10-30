<template>
  <div class="pape row">
    <div class="col-md-10">
      <InputSearch v-model:modelValue="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không tìm thấy kết quả nào</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>

        <button class="btn btn-sm btn-success" @click="gotoAddContact">
          <i class="fas fa-plus"></i> Thêm liên hệ
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa liên hệ
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <ContactCart :contact="activeContact" />
        <router-link
          :to="{ name: 'contact.edit', params: { id: activeContact._id } }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ContactCart from "@/components/contactCart.vue";
import ContactList from "@/components/contactList.vue";
import InputSearch from "@/components/inputSearch.vue";
import ContactService from "@/services/contact_service";
export default {
  components: {
    ContactCart,
    ContactList,
    InputSearch,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    contactsString() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) =>
        this.contactsString[index]
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.error(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async removeAllContacts() {
      if (confirm("Bạn có chắc chắn muốn xóa tất cả liên hệ không?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.error(error);
        }
      }
      else {
        return false;
      }
    },
    async gotoAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  max-width: 750px;
  text-align: left;
}
</style>
