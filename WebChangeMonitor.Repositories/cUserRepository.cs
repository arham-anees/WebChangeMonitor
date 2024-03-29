﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.Repositories
{
    public class cUserRepository : cRepository<cUser>, iUserRepository {
		public cUserRepository(AppDbContext context) : base(context) { }

		private IEnumerable<cUser> _Get()
        {
			return _Context.Users.Where(x => x.IsActive);
        }
		/// <summary>
		/// this method check if username is available or taken
		/// </summary>
		/// <param name="username">desired username of user</param>
		/// <returns>true of username is not yet taken else false</returns>
		public bool IsUsernameAvaiable(string username) {
			Console.WriteLine(username);
			var result=!_Get().Where(x => x.UserName == username).Any();
			Console.WriteLine(result.ToString());
			return result;
		}


		/// <summary>
		/// this method check if email is used or not
		/// </summary>
		/// <param name="username">new email of user</param>
		/// <returns>true of email is not yet used else false</returns>
		public bool IsEmailAvaiable(string email) {
			return !_Get().Where(x => x.Email == email).Any();
		}

		/// <summary>
		/// this method return true if <paramref name="email"/> is available for provide <paramref name="username"/> or not
		/// </summary>
		/// <param name="email">new email of user</param>
		/// <param name="username">username of user</param>
		/// <returns>true if <paramref name="email"/> is avaialble for given <paramref name="username"/> else false</returns>
		public bool IsEmailAvaiable(string email, string username) {
			return !_Get().Where(x => x.Email == email && x.UserName!=username).Any();
		}

		/// <summary>
		/// this method authenticates user using unique <paramref name="username"/> and hashed <paramref name="hashedPassword"/>
		/// </summary>
		/// <param name="username">username provided by user</param>
		/// <param name="hashedPassword">hash of password user provided</param>
		/// <returns>user if provided credentials are correct else null</returns>
		public cUser Authorize(string username, string hashedPassword) {
			var user= _Get().Where(x => x.IsActive && x.UserName == username).SingleOrDefault();
			if (user.HashedPassword == hashedPassword)
				return user;
			return null;
		}

		/// <summary>
		/// this method searches user using username
		/// </summary>
		/// <param name="username">username of required user</param>
		/// <returns>user of given username</returns>
		public cUser Get(string username) {
			return _Get().Where(x =>  x.UserName == username && x.IsActive).SingleOrDefault();
		}


		public IEnumerable<cUserRole> GetDomainUsers(int domainId) {
			return _Context.UserRoles.Where(x => x.User.DomainId == domainId && x.User.IsActive)
				.Include(x => x.User).Include(x => x.Role).ToList();
		}
  }
}
