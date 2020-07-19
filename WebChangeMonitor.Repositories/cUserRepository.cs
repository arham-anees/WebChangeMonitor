using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories {
	public class cUserRepository : cRepository<cUser>, iUserRepository {
		public cUserRepository(AppDbContext context):base(context) {}

		/// <summary>
		/// this method check if username is available or taken
		/// </summary>
		/// <param name="username">desired username of user</param>
		/// <returns>true of username is not yet taken else false</returns>
		public bool IsUsernameAvaiable(string username) {
			Console.WriteLine(username);
			var result=!_Context.Users.Where(x => x.UserName == username).Any();
			Console.WriteLine(result.ToString());
			return result;
		}


		/// <summary>
		/// this method check if email is used or not
		/// </summary>
		/// <param name="username">new email of user</param>
		/// <returns>true of email is not yet used else false</returns>
		public bool IsEmailAvaiable(string email) {
			return !_Context.Users.Where(x => x.Email == email).Any();
		}

		/// <summary>
		/// this method return true if <paramref name="email"/> is available for provide <paramref name="username"/> or not
		/// </summary>
		/// <param name="email">new email of user</param>
		/// <param name="username">username of user</param>
		/// <returns>true if <paramref name="email"/> is avaialble for given <paramref name="username"/> else false</returns>
		public bool IsEmailAvaiable(string email, string username) {
			return !_Context.Users.Where(x => x.Email == email && x.UserName!=username).Any();
		}

		/// <summary>
		/// this method authenticates user using unique <paramref name="username"/> and hashed <paramref name="hashedPassword"/>
		/// </summary>
		/// <param name="username">username provided by user</param>
		/// <param name="hashedPassword">hash of password user provided</param>
		/// <returns>user if provided credentials are correct else null</returns>
		public cUser Authorize(string username, string hashedPassword) {
			return _Context.Users.Where(x => x.IsActive && x.UserName == username 
			&& x.HashedPassword == hashedPassword).SingleOrDefault();
		}

		/// <summary>
		/// this method searches user using username
		/// </summary>
		/// <param name="username">username of required user</param>
		/// <returns>user of given username</returns>
		public cUser Get(string username) {
			return _Context.Users.Where(x =>  x.UserName == username && x.IsActive).SingleOrDefault();
		}


		public IEnumerable<cUserRole> GetDomainUsers(int domainId) {
			return _Context.UserRoles.Where(x => x.User.DomainId == domainId && x.User.IsActive)
				.Include(x => x.User).Include(x => x.Role).ToList();
		}

	}
}
