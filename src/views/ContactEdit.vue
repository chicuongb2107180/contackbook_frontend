<template>
  <div v-if="contact" class="page">
    <h4>Hiêu chỉnh Liên hệ</h4>
    <ContactForm
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/Contact_service.js";
export default{
        components:{
                ContactForm
        },
        props:{
                id:{
                        type:String,
                        required:true
                }
        },
        data(){
                return{
                        contact: null,
                        message:""
                };
        },
        methods:{
                async getContact(id){
                        try{
                                this.contact=await ContactService.get(id);
                        }catch(error){
                                console.log(error);
                                this.$router.push({name:"notFound",params:{
                                        pathMatch:this.$route.path.split("/").slice(1)
                                },
                                query:this.$route.query,
                                hash:this.$route.hash,
                        });
                        }
                },
                async updateContact(data){
                        try{
                                await ContactService.update(this.contact._id,data);
                                alert("Liên hệ được cập nhật thành công");
                                this.$router.push({name:"contactbook"});
                        }catch(error){
                                console.log(error);
                        }
                },
                async deleteContact(){
                        const isDelete=confirm("Bạn có chắc chắn muốn xóa liên hệ này không?");
                        if(isDelete){
                                try{
                                        await ContactService.delete(this.contact._id);
                                        alert("Liên hệ đã được xóa thành công");
                                        this.$router.push({name:"contactbook"});
                                }catch(error){
                                        console.log(error);
                                }
                        }
                },

        },
        created(){
                this.getContact(this.id);
                this.message="";
                console.log(this.id);
        },
}
</script>
