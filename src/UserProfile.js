var UserProfile = (function() {
    var user_email = "";
  
    var getUserEmail = function() {
      return user_email; 
    };
  
    var setUserEmail = function(email) {
      user_email = email;
    };
  
    return {
      getUserEmail: getUserEmail,
      setUserEmail: setUserEmail
    }
  
  })();
  
  export default UserProfile;