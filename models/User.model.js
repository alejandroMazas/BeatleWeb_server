const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Por favor introduce un nombre de usuario'],
            minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres']
        },
        email: {
            type: String,
            unique: [true, 'El email es obligatorio.']
        },
        password: {
            type: String
        },
        role: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: 'USER'
        },

        //para despues de mvp

        // favChapter: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'Chapter'
        // }]

    },
    { timestamps: true }

)

const User = model('User', userSchema)

module.exports = User