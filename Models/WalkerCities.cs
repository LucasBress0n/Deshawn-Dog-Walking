namespace Deshawn.Models;

public class WalkerCities
{
    public int Id { get; set; }
    public int CityId { get; set; }
    public int WalkerId { get; set; }
    public Walkers Walkers { get; set; }
    public Cities Cities { get; set; }
}
