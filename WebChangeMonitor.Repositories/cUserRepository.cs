using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cUserRepository : cRepository<cUser>, iUserRepository {
		public cUserRepository(AppDbContext context):base(context) {

		}
		public bool IsUsernameAvaiable(string username) {
			return !_Context.Users.Where(x => x.UserName == username).Any();
		}
		public bool IsEmailAvaiable(string email) {
			return !_Context.Users.Where(x => x.Email == email).Any();
		}
	}
}
