namespace API.Models
{
    public class Product
    {
        public int Id {get; set;}
        public string Name { get; set; } = null!;
        public string? Description {get; set;}
        public double Prices {get; set;}
        public bool IsInStore {get; set;}
    }
}