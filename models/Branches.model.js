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
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter name of branch'
        }
      }
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter address'
        }
      }
    },
    hotline: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter hotline'
        }
      }
    },
    
    bossName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter boss name'
        }
      }
    },
    
    bossEmail: {
      type: Sequelize.STRING,
      
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: {
          msg: 'Please enter boss email'
        }
      }
    },
    bossPhone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter boss phone'
        }
      }
    },
    staffName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter staff name'
        }
      }
    },
    staffEmail: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: {
          msg: 'Please enter staff email'
        }
      }
    },
    staffPhone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter staff phone'
        }
      }
    },
    receptionName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter reception name'
        }
      }
    },
    receptionEmail: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: {
          msg: 'Please enter reception email '
        }
      }
    },
    
    receptionPhone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter reception phone'
        }
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
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter branch status'
        }
      }
    }
  },
  
  {
    timestamps: false
  }
  );
  
  module.exports = Branches;
  