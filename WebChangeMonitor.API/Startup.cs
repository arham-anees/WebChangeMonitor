using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using WebChangeMonitor.Data;
using WebChangeMonitor.Repositories;
using WebChangeMonitor.Repositories.Interfaces;
using WebChangeMonitor.UnitOfWork;
using Microsoft.OpenApi.Models;

namespace WebChangeMonitor.API {
	public class Startup {
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) {
			services.AddMvc(o => o.EnableEndpointRouting = false)
									.AddNewtonsoftJson(options =>
					options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
			);

			services.AddDbContext<AppDbContext>(o =>
					o.UseSqlServer(
							Configuration.GetConnectionString("DefaultConnection")));


			services.AddCors(o =>
					o.AddPolicy("Localhost", options => {
						options.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
					}));

			// Register the Swagger generator, defining 1 or more Swagger documents
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
				c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
					In = ParameterLocation.Header,
					Description = "Please insert JWT with Bearer into field",
					Name = "Authorization",
					Type = SecuritySchemeType.ApiKey
				});
				c.AddSecurityRequirement(new OpenApiSecurityRequirement {
	 {
		 new OpenApiSecurityScheme
		 {
			 Reference = new OpenApiReference
			 {
				 Type = ReferenceType.SecurityScheme,
				 Id = "Bearer"
			 }
			},
			new string[] { }
		}
	});
			});

			#region DEPENDENCY INJECTION

			services.AddScoped(typeof(AppDbContext));
			services.AddTransient<iUnitOfWork, cUnitOfWork>();
			services.AddTransient<iFileRepository, cFileRepository>();
			services.AddTransient<iVersionRepository, cVersionRepository>();
			services.AddTransient<iFileStatusRepository, cFileStatusRepository>();
			services.AddTransient<iVersionFileRepository, cVersionFileRepository>();
			services.AddTransient<iUserRepository, cUserRepository>();
			services.AddTransient<iUserRoleRepository, cUserRoleRepository>();
			services.AddTransient<iRoleRepository, cRoleRepository>();
			services.AddTransient<iAcceptanceStatusRepository, cAcceptanceStatusRepository>();
			//services.AddTransient<IFormFile, FormFile>();

			#endregion

			#region AUTHENTICATION JWT
			
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option => {

				option.RequireHttpsMetadata = false;
				option.SaveToken = true;
				option.TokenValidationParameters = new TokenValidationParameters() {
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = Configuration["jwt:Issuer"],
					ValidAudience = Configuration["jwt:Issuer"],
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["jwt:Key"]))
				};
				
			});

			//services.AddAuthorization(config =>
			//{
			//	config.AddPolicy(cPolicies.Admin, cPolicies.AdminPolicy());
			//	config.AddPolicy(cPolicies.User, cPolicies.UserPolicy());
			//});
			#endregion

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
				app.UseCors("Localhost");

			}

			app.UseHttpsRedirection();

			app.UseAuthentication();
			

			app.UseSwagger();

			// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
			// specifying the Swagger JSON endpoint.
			app.UseSwaggerUI(c => {
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
			});

			app.UseRouting();

			app.UseAuthorization();
			//app.UseMvc();
	
			app.UseEndpoints(endpoints => {
				endpoints.MapControllers();
			});
		}
	}
}
