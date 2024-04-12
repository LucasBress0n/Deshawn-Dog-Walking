namespace Deshawn.Models.DTOs;

public class DogsDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int CityId { get; set; }
    public int WalkerId { get; set; }
    public WalkersDTO Walkers { get; set; }
}
