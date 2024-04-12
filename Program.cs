using Deshawn.Models;
using Deshawn.Models.DTOs;

List<Cities> cities = new List<Cities>
{
    new() { Id = 1, Name = "Montana" },
    new() { Id = 2, Name = "Amazon" },
    new() { Id = 3, Name = "Khanreia" },
    new() { Id = 4, Name = "Teyvat" },
};

List<Walkers> walkers = new List<Walkers>
{
    new() { Id = 1, Name = "Emily Sam" },
    new() { Id = 2, Name = "Adventurine" },
    new() { Id = 3, Name = "Blade" },
    new() { Id = 4, Name = "Jingyuan" },
};

List<Dogs> dogs = new List<Dogs>
{
    new()
    {
        Id = 1,
        Name = "Charlie",
        CityId = 1,
        WalkerId = 1,
    },
    new()
    {
        Id = 2,
        Name = "Furina",
        CityId = 1,
    },
    new()
    {
        Id = 3,
        Name = "Focalor",
        CityId = 2,
    },
    new()
    {
        Id = 4,
        Name = "Angel",
        CityId = 4,
        WalkerId = 2,
    },
    new()
    {
        Id = 5,
        Name = "Puppy",
        CityId = 3,
    },
    new()
    {
        Id = 6,
        Name = "Equinox",
        CityId = 4,
    },
    new()
    {
        Id = 7,
        Name = "Baboey",
        CityId = 2,
        WalkerId = 3,
    },
    new()
    {
        Id = 8,
        Name = "GnatInMyEye",
        CityId = 3,
    },
    new()
    {
        Id = 9,
        Name = "Uptotopto",
        CityId = 4,
    },
};

List<WalkerCities> walkerCities = new List<WalkerCities>
{
    new()
    {
        Id = 1,
        CityId = 3,
        WalkerId = 1
    },
    new()
    {
        Id = 2,
        CityId = 1,
        WalkerId = 3
    },
    new()
    {
        Id = 3,
        CityId = 4,
        WalkerId = 4
    },
    new()
    {
        Id = 4,
        CityId = 2,
        WalkerId = 4
    },
};

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet(
    "/api/hello",
    () =>
    {
        return new { Message = "Welcome to DeShawn's Dog Walking" };
    }
);

app.MapGet(
    "/api/cities",
    () =>
    {
        return cities.Select(cityObj => new CitiesDTO { Id = cityObj.Id, Name = cityObj.Name });
    }
);

app.MapGet(
    "/api/dogs",
    (int? Id, int? cityId) =>
    {
        if (Id == null && cityId == null)
        {
            return dogs.Select(dogObject => new DogsDTO
            {
                Id = dogObject.Id,
                Name = dogObject.Name,
                CityId = dogObject.CityId,
                WalkerId = dogObject.WalkerId
            });
        }
        else
        {
            if (cityId == null)
            {
                Walkers WalkerInfo = walkers.FirstOrDefault(walkerObject =>
                    walkerObject.Id == dogs.Find(dogObject => dogObject.Id == Id).WalkerId
                );
                return dogs.Where(dObj => dObj.Id == Id)
                    .Select(dogObj => new DogsDTO
                    {
                        Id = dogObj.Id,
                        Name = dogObj.Name,
                        CityId = dogObj.CityId,
                        WalkerId = dogObj.WalkerId,
                        Walkers =
                            WalkerInfo == null
                                ? null
                                : new WalkersDTO { Id = WalkerInfo.Id, Name = WalkerInfo.Name, }
                    });
            }
            else
            {
                return dogs.Where(dObj => dObj.CityId == cityId)
                    .Select(dogObj => new DogsDTO
                    {
                        Id = dogObj.Id,
                        Name = dogObj.Name,
                        CityId = dogObj.CityId,
                        WalkerId = dogObj.WalkerId,
                        Walkers =
                            walkerCities.FirstOrDefault(wcitObj =>
                                wcitObj.WalkerId == dogObj.WalkerId
                            ) == null
                                ? null
                                : new WalkersDTO
                                {
                                    Id = walkers
                                        .Find(walkerObject => walkerObject.Id == dogObj.WalkerId)
                                        .Id,
                                    Name = walkers
                                        .Find(walkerObject => walkerObject.Id == dogObj.WalkerId)
                                        .Name,
                                }
                    });
            }
        }
    }
);

app.MapPost(
    "/api/dogs",
    (Dogs newDog) =>
    {
        newDog.Id = dogs.Max(dogObj => dogObj.Id) + 1;
        dogs.Add(newDog);
    }
);

app.MapGet(
    "/api/walkers",
    (int? Id) =>
    {
        if (Id == null)
        {
            return walkers.Select(allWalkersObj => new WalkersDTO
            {
                Id = allWalkersObj.Id,
                Name = allWalkersObj.Name,
                WalkerCities =
                    walkerCities.FirstOrDefault(walkerCitiesObj =>
                        walkerCitiesObj.WalkerId == allWalkersObj.Id
                    ) == null
                        ? null
                        : new WalkerCitiesDTO
                        {
                            Id = walkerCities
                                .Find(wlkCitObj => wlkCitObj.WalkerId == allWalkersObj.Id)
                                .Id,
                            WalkerId = walkerCities
                                .Find(wlkCitObj => wlkCitObj.WalkerId == allWalkersObj.Id)
                                .WalkerId,
                            CityId = walkerCities
                                .Find(wlkCitObj => wlkCitObj.WalkerId == allWalkersObj.Id)
                                .CityId,
                        },
            });
        }
        else
        {
            return walkers
                .Where(walkerObj => walkerObj.Id == Id)
                .Select(allWalkersObj => new WalkersDTO
                {
                    Id = allWalkersObj.Id,
                    Name = allWalkersObj.Name,
                    WalkerCities =
                        walkerCities.FirstOrDefault(walkerCitiesObj =>
                            walkerCitiesObj.WalkerId == allWalkersObj.Id
                        ) == null
                            ? null
                            : new WalkerCitiesDTO
                            {
                                Id = walkerCities
                                    .Find(wlkCitObj => wlkCitObj.WalkerId == allWalkersObj.Id)
                                    .Id,
                                WalkerId = walkerCities
                                    .Find(wlkCitObj => wlkCitObj.WalkerId == allWalkersObj.Id)
                                    .WalkerId,
                                CityId = walkerCities
                                    .Find(wlkCitObj => wlkCitObj.WalkerId == allWalkersObj.Id)
                                    .CityId,
                            },
                });
        }
    }
);

app.MapPost(
    "/api/dogs/{dogId}/{walkerId}/setwalker",
    (int dogId, int walkerId) =>
    {
        Dogs updatedDog = dogs.FirstOrDefault(dogObject => dogObject.Id == dogId);
        updatedDog.WalkerId = walkerId;
    }
);
app.MapPost(
    "/api/cities",
    (Cities newCity) =>
    {
        newCity.Id = cities.Max(cityObj => cityObj.Id) + 1;
        cities.Add(newCity);
    }
);

app.MapGet(
    "/api/walkercities",
    (int? Id) =>
    {
        if (Id == null)
        {
            return walkerCities.Select(walkerCitiesObject => new WalkerCitiesDTO
            {
                Id = walkerCitiesObject.Id,
                WalkerId = walkerCitiesObject.WalkerId,
                CityId = walkerCitiesObject.CityId,
            });
        }
        else
        {
            return walkerCities
                .Where(walkCitObj => walkCitObj.WalkerId == Id)
                .Select(walkerCitiesObject => new WalkerCitiesDTO
                {
                    Id = walkerCitiesObject.Id,
                    WalkerId = walkerCitiesObject.WalkerId,
                    CityId = walkerCitiesObject.CityId,
                    Walkers = new WalkersDTO
                    {
                        Id = walkers
                            .Find(walkerObj => walkerObj.Id == walkerCitiesObject.WalkerId)
                            .Id,
                        Name = walkers
                            .Find(walkerObj => walkerObj.Id == walkerCitiesObject.WalkerId)
                            .Name,
                    },
                    Cities = new CitiesDTO
                    {
                        Id = cities.Find(cityObj => cityObj.Id == walkerCitiesObject.CityId).Id,
                        Name = cities.Find(cityObj => cityObj.Id == walkerCitiesObject.CityId).Name,
                    }
                });
        }
    }
);

app.MapDelete(
    "/api/walkercities/{Id}",
    (int Id) =>
    {
        WalkerCities walkerCity = walkerCities.FirstOrDefault(walkCityObj => walkCityObj.Id == Id);
        if (walkerCity != null)
        {
            // walkerCities = walkerCities.Where(walkCityObj => walkCityObj.Id != walkerCity.Id).ToList();
            walkerCities.Remove(walkerCity);
        }
        // else { }
    }
);

app.MapDelete(
    "/api/dogs/{Id}",
    (int Id) =>
    {
        Dogs singularDog = dogs.FirstOrDefault(dogObj => dogObj.Id == Id);

        if (singularDog != null)
        {
            dogs.Remove(singularDog);
        }
    }
);

app.MapDelete(
    "/api/walkers/{Id}/deleteall",
    (int Id) =>
    {
        Walkers deleteWalker = walkers.FirstOrDefault(walkObj => walkObj.Id == Id);
        if (deleteWalker == null)
        {
            return Results.NotFound();
        }
        else
        {
            walkers.Remove(deleteWalker);
            foreach (Dogs singularDog in dogs)
            {
                if (singularDog.WalkerId == deleteWalker.Id)
                {
                    singularDog.WalkerId = 0;
                }
            }

            return Results.Ok();
        }
    }
);

app.Run();
