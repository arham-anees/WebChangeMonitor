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

			app.UseAuthentication();//we were missing this


			//app.UseMvc();



			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints => {
				endpoints.MapControllers();
			});
		}
	}
}
