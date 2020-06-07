using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cFileStatusRepository :cRepository<cFileStatus>,iFileStatusRepository{

		public cFileStatusRepository(AppDbContext context):base(context) {

		}
	}
}
