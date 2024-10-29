import createApiClient from "./api_service";
class ContactService {
        constructor(baseUrl = "/api/contacts") {
                this.api = createApiClient(baseUrl);
        }
        async getAll() {
                return (await this.api.get("/")).data;
        }
        async get(id) {
                return (await this.api.get(`/${id}`)).data;
        }
        async create(data) {
                return (await this.api.post("/", data)).data;
        }
        async delete(id) {
                return (await this.api.delete(`/${id}`)).data;
        }
        async deleteAll() {
                return (await this.api.delete("/")).data;
        }
        async update(id, data) {
                return (await this.api.put(`/${id}`, data)).data;
        }

}
export default new ContactService();