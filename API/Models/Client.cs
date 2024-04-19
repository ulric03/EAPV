namespace CRUD.API.Models
{
    public class Client : Entity
    {
        public string Name { get; set; } = string.Empty;
        public DateTime DateBirth { get; set; }
        public decimal SaleValue { get; set; }
        public string CPF { get; set; } = string.Empty;

    }
}
