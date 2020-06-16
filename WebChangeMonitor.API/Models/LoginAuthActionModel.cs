using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChangeMonitor.API.Models {
	public class LoginAuthActionModel {
		public string Username { get; set; }
		public string HashedPassword { get; set; }

	}
}
