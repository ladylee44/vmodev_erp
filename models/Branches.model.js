var Sequelize = require("sequelize");
const sequelize = require("../configdb/configdb");

var Branches = sequelize.define(
  "branches",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        max: 50
      }
    },
    address: {
      type: Sequelize.STRING,
      validate: {
        max: 50
      }
    },
    hotline: {
      type: Sequelize.STRING,
      validate: {
        len: [10, 10]
      }
    },

    bossName: {
      type: Sequelize.STRING,
      validate: {
        max: 50
      }
    },

    bossEmail: {
      type: Sequelize.STRING,

      validate: {
        isEmail: true,
        max: 50
      }
    },
    bossPhone: {
      type: Sequelize.STRING,
      validate: {
        len: [10, 20]
      }
    },
    staffName: {
      type: Sequelize.STRING,
      validate: {
        max: 50
      }
    },
    staffEmail: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
        max: 50
      }
    },
    staffPhone: {
      type: Sequelize.STRING,
      validate: {
        len: [10, 20]
      }
    },
    receptionName: {
      type: Sequelize.STRING,
      validate: {
        max: 50
      }
    },
    receptionEmail: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
        max: 50
      }
    },

    receptionPhone: {
      type: Sequelize.STRING,
      validate: {
        len: [10, 20]
      }
    },

    createdBy: {
      type: Sequelize.STRING,
      validate: {
        max: 50
      }
    },

    editedBy: {
      type: Sequelize.STRING,
      validate: {
        max: 50
      }
    },

    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },

    editedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },

    status: {
      type: Sequelize.INTEGER,
      validate: {
        max: 1
      }
    }
  },

  {
    timestamps: false
  }
);

module.exports = Branches;
