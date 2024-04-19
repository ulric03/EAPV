using CRUD.API.Data.Context;
using CRUD.API.Data.Repository;
using CRUD.API.Models;

namespace CRUD.API.Data
{
    public class ClientRepository : RepositoryBase<Client>, IClientRepository
    {
        public ClientRepository(AppDbContext appContext) : base(appContext)
        {
        }
    }
}
