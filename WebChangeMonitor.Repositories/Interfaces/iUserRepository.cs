using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Repositories.Interfaces {
	public interface iUserRepository : iRepository<cUser>{
		bool IsUsernameAvaiable(string username);
		bool IsEmailAvaiable(string email);
		cUser Authorize(string username, string password);
		cUser Get(string username);
	}
}
