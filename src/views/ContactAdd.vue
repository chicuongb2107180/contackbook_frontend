<template>
        <div class="page">
                <h4>Thêm liên hệ</h4>
                <ContactForm  @submit:contact="createContact" :contact="contact" />
                <p>{{ message }}</p>        
        </div>
</template>
<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact_service.js";
export default{
        components:{
                ContactForm
        },
        data(){
                return{
                        contact:null,
                        message:""
                };
        },
        methods:{
                async createContact(data){
                        try{    
                                await ContactService.create(data);
                                this.message="Liên hệ đã được thêm thành công";
                                this.$router.push({name:"contactbook"});
                        }catch(error){
                                console.log(error);
                        }
                }
        },
        created(){
                this.contact={
                        name:"",
                        email:"",
                        address:"",
                        phone:"",
                        favorite:false,
                };
                this.message="";
        }
};
</script>