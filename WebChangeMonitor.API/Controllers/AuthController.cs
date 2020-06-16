﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers {
	[Route("api/[controller]")]
	public class AuthController : Controller {
		IConfiguration _Configuration;
		private readonly iUnitOfWork _UnitOfWork;

		public AuthController(IConfiguration configuration, iUnitOfWork unitOfWork) {
			_Configuration = configuration;
			this._UnitOfWork = unitOfWork;
		}


		#region SIGN UP

		[Route("Register")]
		[HttpPost]
		public IActionResult SignUp([FromBody]SignUpAuthActionModel actionModel) {
			try {
				cUser user = new cUser() {
					Email = actionModel.Email,
					UserName = actionModel.UserName,
					HashedPassword = actionModel.Password
				};
				using (_UnitOfWork) {
					_UnitOfWork.UserRepository.Set(user);
					_UnitOfWork.Complete();
				}
				return StatusCode(200,user);
			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}

		[Route("IsUsernameAvailable")]
		[HttpPost]
		public IActionResult IsUsernameAvailable([FromForm]string username) {
			try {
				Log.Information($"username availability checking {DateTime.Now}");
				if (username == null)
					return StatusCode(400, "null username is not allowed");
				return StatusCode(200, _UnitOfWork.UserRepository.IsUsernameAvaiable(username));
			}
			catch (Exception exception) {
				Log.WriteLine(exception, "IsUsernameAvailable", "Auth");
				return StatusCode(500);
			}
		}

		[Route("IsEmailAvailable")]
		[HttpPost]
		public IActionResult IsEmailAvailable([FromForm]string email) {
			try {
				Log.Information($"email availability checking {DateTime.Now}");
				if (email == null)
					return StatusCode(400, "null username is not allowed");
				return StatusCode(200, _UnitOfWork.UserRepository.IsEmailAvaiable(email));
			}
			catch (Exception exception) {
				Log.WriteLine(exception, "IsUsernameAvailable", "Auth");
				return StatusCode(500);
			}
		}
		#endregion


		#region LOGIN

		[HttpPost]
		[Route("authenticate")]
		public IActionResult Login([FromBody]LoginAuthActionModel actionModel) {
			try {
				if (actionModel.Username == null && actionModel.HashedPassword == null)
					return StatusCode(400, "Null values are not available");
				var user = _UnitOfWork.UserRepository.Authorize(actionModel.Username, actionModel.HashedPassword);
				if (user == null)
					return StatusCode(401, "Incorrect username or password");

				//apply jwt authentication

				IActionResult response = Unauthorized();//set our reponse to unauthorize
			
					var tokenStr = GenerateJsonWebToken(user);
					response = Ok(new { token = tokenStr });
				
				return response;

			}
			catch (Exception exception) {
				Log.WriteLine(exception);
				return StatusCode(500);
			}
		}
		//method to generate web token
		private String GenerateJsonWebToken(cUser user) {
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Configuration["jwt:Key"]));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
			var claims = new[]{
					new Claim(ClaimTypes.NameIdentifier, user.UserName),
					new Claim(ClaimTypes.Email, user.HashedPassword ),
				};
			var token = new JwtSecurityToken(
				issuer: _Configuration["jwt:Issuer"],
				audience: _Configuration["jwt:Issuer"],
				claims,
				expires: DateTime.Now.AddDays(1),
				signingCredentials: credentials);
			var encodeToken = new JwtSecurityTokenHandler().WriteToken(token);
			return encodeToken;
		}
		#endregion

	}

}
