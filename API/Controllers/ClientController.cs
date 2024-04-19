using CRUD.API.Data.Repository;
using CRUD.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ClientController : ControllerBase
    {

        private readonly ILogger<ClientController> _logger;
        private readonly IClientRepository _clientRepository;

        public ClientController(
            ILogger<ClientController> logger,
            IClientRepository clientRepository
            )
        {
            _logger = logger;
            _clientRepository = clientRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Client>> GetAll() => await _clientRepository.GetAllAsync();

        [HttpDelete]
        [Route("{id}")]
        public async Task Delete(int id)
        {
            var client = await _clientRepository.GetByIdAsync(id);
            await _clientRepository.DeleteAsync(client);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<Client> Get(int id) => await _clientRepository.GetByIdAsync(id);

        [HttpPut]
        public async Task Update(Client client)
        {
            await _clientRepository.UpdateAsync(client);
        }

        [HttpPost]
        public async Task Insert(Client client)
        {
            await _clientRepository.AddAsync(client);
        }

    }
}
