using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cVersionFileRepository :cRepository<cVersionFiles>,iVersionFileRepository{
		public cVersionFileRepository(AppDbContext context):base(context) {

		}
	}
}
