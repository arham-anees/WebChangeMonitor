using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
			services.AddMvc(o => o.EnableEndpointRouting = false).AddJsonOptions(o => {
				if (o.JsonSerializerOptions != null) { }
			});
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
			//services.AddTransient<IFormFile, FormFile>();

			#endregion

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
				app.UseCors("Localhost");
			}

			app.UseHttpsRedirection();

			//app.UseAuthorization();

			app.UseMvc();



			//app.UseRouting();

			//app.UseEndpoints(endpoints => {
			//    endpoints.MapControllers();
			//});
		}
	}
}
