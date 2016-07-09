const Sequelize = require("sequelize");
const sequelize = require("../db");
const crypto = require("crypto");
const SECRET = "rabblerabble";

const attributes = {

  firstName: {
    type: Sequelize.STRING,
    field: "firstName",
    allowNull: false,
    validate: {
      notEmpty: {msg: "First name cannot be empty."},
      isAlpha: {msg: "First name can only contain letters."}
    }
  },

  lastName: {
    type: Sequelize.STRING,
    field: "lastName",
    allowNull: false,
    validate: {
      notEmpty: {msg: "Last name cannot be empty."},
      isAlpha: {msg: "First name can only contain letters."}
    }
  },

  emailAddress: {
    type: Sequelize.STRING,
    field: "emailAddress",
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {msg: "Email provided is not valid."}
    },
    set: function(val) {
      this.setDataValue("emailAddress", val.toLowerCase());
    }
  },

  passwordHash: {
    type: Sequelize.STRING,
    field: "passwordHash",
    allowNull: false
  },

  passwordSalt: {
    type: Sequelize.STRING(256),
    field: "passwordSalt",
    allowNull: false
  },

  password: {
    type: Sequelize.VIRTUAL,
    set: function(password) {
      const salt = crypto.randomBytes(64).toString("hex");
      const hash = hashPassword(password, salt, SECRET);

      this.setDataValue("password", password);
      this.setDataValue("passwordSalt", salt);
      this.setDataValue("passwordHash", hash);
    }
  },

  confirmedEmail: {
    type: Sequelize.BOOLEAN,
    field: "confirmedEmail",
    defaultValue: false,
    allowNull: false
  },

  confirmationToken: {
    type: Sequelize.STRING,
    field: "confirmationToken"
  },

  passwordResetToken: {
    type: Sequelize.STRING,
    field: "passwordResetToken"
  }
};

const options = {
  freezeTableName: true,
  classMethods: {},
  instanceMethods: {
    validatePassword: validatePassword
  }
};

const User = sequelize.define("User", attributes, options);

User.hook("beforeValidate", function(user) {
  user.confirmationToken = crypto.randomBytes(24).toString("hex");
});

module.exports = User;

function validatePassword(password) {
  const salt = this.passwordSalt;
  const hashedPassword = this.passwordHash;
  const challenge = hashPassword(password, salt, SECRET);
  return challenge === hashedPassword;
}

/**
 * Encrypt password, prepended with salt, use SHA256 encryption.
 *
 * @param {string} password - User supplied unencrypted password.
 * @param {string|*} salt
 * @param {string} secret
 * @returns {string}
 */
function hashPassword(password, salt, secret) {
  return crypto.createHmac("sha256", secret)
    .update(salt + password)
    .digest("hex");
}

/*
 User.sync({force: true}).then(function() {
 return User.create({
 firstName: "Robert",
 lastName: "Stires",
 emailAddress: "rjstires@gmail.com",
 password: "Password1!"
 });
 }).then(function(user) {
 console.log(user.dataValues);
 console.log('Is password valid? ', user.validatePassword("Password1!"));
 }).catch(function(response) {
 console.log("error", response);
 });
 */
