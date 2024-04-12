namespace Deshawn.Models.DTOs;

public class WalkerCitiesDTO
{
    public int Id { get; set; }
    public int CityId { get; set; }
    public int WalkerId { get; set; }
    public WalkersDTO Walkers { get; set; }
    public CitiesDTO Cities { get; set; }
}
