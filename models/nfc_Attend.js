
module.exports = (sequelize,DataTypes) =>{
    const newAttend = sequelize.define("nfc_attend",{
        
        nfc_uid:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
        student_name:{
            type: DataTypes.STRING(5),
            allowNull : true
        },
        joined_date: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        rate:{
            type: 'boolean',
            defaultValue: 0,
            allowNull: true
        }
    }, {
        timestamps: false
    })
    return newAttend
}