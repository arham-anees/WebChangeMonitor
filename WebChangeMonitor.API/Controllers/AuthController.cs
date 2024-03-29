﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using WebChangeMonitor.API.Models;
using WebChangeMonitor.Domain;
using WebChangeMonitor.UnitOfWork;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebChangeMonitor.API.Controllers
{
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly IConfiguration _Configuration;
    private readonly iUnitOfWork _UnitOfWork;

    public AuthController(IConfiguration configuration, iUnitOfWork unitOfWork)
    {
      _Configuration = configuration;
      this._UnitOfWork = unitOfWork;
    }


    #region SIGN UP

    [Route("CeoStatus")]
    [HttpGet]
    public IActionResult CheckCeoStatus()
    {
      try
      {
        return Ok(true);
      }
      catch (Exception e)
      {
        throw e;
      }
    }

    [Route("Register")]
    [HttpPost]
    public IActionResult SignUp([FromBody] SignUpAuthActionModel actionModel)
    {
      try
      {
        cUser user = new cUser()
        {
          Email = actionModel.Email,
          UserName = actionModel.UserName,
          HashedPassword = actionModel.Password,
          DomainId = Convert.ToInt32(actionModel.Domain)
        };

        cUserRole userRole = new cUserRole()
        {
          User = user,
          IsActive = true,
          Role = _UnitOfWork.RoleRepository.Get(actionModel.Role)
        };


        using (_UnitOfWork)
        {
          var domain = _UnitOfWork.DomainRepository.Get(Convert.ToInt32(actionModel.Domain));
          userRole.User.DomainId = domain == null ? 0 : domain.Id;
          _UnitOfWork.UserRoleRepository.Set(userRole);
          _UnitOfWork.Complete();
        }
        return StatusCode(200, user);
      }
      catch (Exception exception)
      {
        Log.WriteLine(exception);
        return StatusCode(500);
      }
    }

    [Route("RegisterCeo")]
    [HttpPost]
    public IActionResult SignUpCeo([FromBody] SignUpAuthActionModel actionModel)
    {
      try
      {
        // check if email is available
        if (!_UnitOfWork.UserRepository.IsUsernameAvaiable(actionModel.UserName))
          throw new Exception("Username is already in use");
        if (!_UnitOfWork.UserRepository.IsEmailAvaiable(actionModel.Email))
          throw new Exception("Email is already in use");
        cDomain domain = new cDomain()
        {
          HomeUrl = actionModel.ControlPanelUrl,
          Password = actionModel.ServerPassword,
          Username = actionModel.ServerUsername,
          ServerIp = actionModel.ControlPanelUrl,
          TargetServerDirectory = actionModel.TargetDirectory
        };
        cUser user = new cUser()
        {
          Email = actionModel.Email,
          UserName = actionModel.UserName,
          HashedPassword = actionModel.Password,
          Domain = domain
        };

        cUserRole userRole = new cUserRole()
        {
          User = user,
          IsActive = true,
          Role = _UnitOfWork.RoleRepository.Get(actionModel.Role)
        };


        using (_UnitOfWork)
        {
          _UnitOfWork.UserRoleRepository.Set(userRole);
          _UnitOfWork.Complete();
        }

        return Created("", user);
      }
      catch (Exception exception)
      {
        Log.WriteLine(exception);
        return StatusCode(500);
      }
    }

    [Route("IsUsernameAvailable")]
    [HttpGet]
    public IActionResult IsUsernameAvailable(string username)
    {
      try
      {
        Log.Information($"username availability checking {DateTime.Now}");
        if (username == null)
          return StatusCode(400, "null username is not allowed");
        return StatusCode(200, _UnitOfWork.UserRepository.IsUsernameAvaiable(username));
      }
      catch (Exception exception)
      {
        Log.WriteLine(exception, "IsUsernameAvailable", "Auth");
        return StatusCode(500);
      }
    }

    [Route("IsEmailAvailable")]
    [HttpGet]
    public IActionResult IsEmailAvailable(string email)
    {
      try
      {
        Log.Information($"email availability checking {DateTime.Now}");
        if (email == null)
          return StatusCode(400, "null username is not allowed");
        return StatusCode(200, _UnitOfWork.UserRepository.IsEmailAvaiable(email));
      }
      catch (Exception exception)
      {
        Log.WriteLine(exception, "IsUsernameAvailable", "Auth");
        return StatusCode(500);
      }
    }
    [Route("IsEmailAvailableForUpdate")]
    [HttpGet]
    public IActionResult IsEmailAvailable(string email, string username)
    {
      try
      {
        Log.Information($"email availability checking {DateTime.Now}");
        if (email == null)
          return StatusCode(400, "null username is not allowed");
        return StatusCode(200, _UnitOfWork.UserRepository.IsEmailAvaiable(email, username));
      }
      catch (Exception exception)
      {
        Log.WriteLine(exception, "IsUsernameAvailable", "Auth");
        return StatusCode(500);
      }
    }
    #endregion


    #region LOGIN

    [HttpGet]
    [Route("authenticate")]
    [AllowAnonymous]
    public IActionResult Login(LoginAuthActionModel actionModel)
    {
      try
      {
        Log.Information($"Authenticating user {actionModel.Username} {actionModel.HashedPassword}");
        if (actionModel.Username == null && actionModel.HashedPassword == null)
          return StatusCode(400, "Null values are not available");
        var user = _UnitOfWork.UserRepository.Authorize(actionModel.Username, actionModel.HashedPassword);
        if (user == null)
          return StatusCode(401, "Incorrect username or password");

        //apply jwt authentication

        IActionResult response = Unauthorized();//set our reponse to unauthorize

        var tokenStr = GenerateJsonWebToken(user);
        response = Ok(new { token = tokenStr, Role = _UnitOfWork.UserRoleRepository.Get(user).Role.Id, Domain = user.DomainId, userName = user.UserName });

        return response;

      }
      catch (Exception exception)
      {
        Log.WriteLine(exception);
        return StatusCode(500);
      }
    }
    //method to generate web token
    private String GenerateJsonWebToken(cUser user)
    {
      var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Configuration["jwt:Key"]));
      var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
      Log.Information(user.UserName);
      var claims = new[]{
          new Claim(ClaimTypes.NameIdentifier, user.UserName),
          new Claim(ClaimTypes.Role,_UnitOfWork.UserRoleRepository.Get(user).Role.Id.ToString()  ),
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
