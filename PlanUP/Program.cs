using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using PlanUP.Models;
using System.Text.Json.Serialization;
using PlanUP.DbContext;
using Microsoft.EntityFrameworkCore;
using PlanUP.Repositories;
using DigiFiler_API.Factory;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
{
    policy.AllowAnyHeader();
    policy.AllowAnyMethod();
    policy.AllowAnyOrigin();
}));

builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddControllers().AddJsonOptions(x =>
{
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("auth", new OpenApiSecurityScheme
    {
        Name = "auth",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        Description = "A one-time token. Example: Bearer s23sds4t5tdgfhtrtre"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "auth",
                    Type = ReferenceType.SecurityScheme
                }
            }, new List<string>()
        }
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IEmailRepository, EmailRepository>();
builder.Services.AddScoped<IUserClaimsPrincipalFactory<AppUser>, AppUserClaimsPrincipalFactory>();

builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireDigit = false;
    options.User.RequireUniqueEmail = true;
    options.Password.RequiredLength = 10;
}).AddRoles<IdentityRole>()
  .AddEntityFrameworkStores<DataContext>()
  .AddDefaultTokenProviders();

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
    .LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Debug));

var app = builder.Build();
app.UseCors("AllowAnyOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

/*
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var roles = new[] { "Student" };
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}
*/

app.Run();
