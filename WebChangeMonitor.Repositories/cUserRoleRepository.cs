using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cUserRoleRepository :cRepository<cUserRole>, iUserRoleRepository{
		public cUserRoleRepository(AppDbContext context):base(context) {}

		public cUserRole Get(cUser user) {
			return _Context.UserRoles.Include(x=>x.Role).Where(x => x.User.Id == user.Id).SingleOrDefault();
		}
	}
}
