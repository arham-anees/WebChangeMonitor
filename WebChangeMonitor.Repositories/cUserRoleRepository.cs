using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cUserRoleRepository :cRepository<cUserRole>, iUserRoleRepository{
		public cUserRoleRepository(AppDbContext context):base(context) {

		}
	}
}
